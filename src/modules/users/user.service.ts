import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Kyc } from './entities/kyc.entity';
import { Profile } from './entities/profile.entity';
import { usersQueryDto, UserUpdateDto } from './dtos/userRequests.dto';
import { UsersQueryResponseDto } from './dtos/userResponses.dto';
import { log } from 'console';
import { USER_TYPE } from './dtos/enums';
import { BAD_REQUEST_400, NOT_FOUND_404 } from 'src/helpers/exceptions/auth';
import { TokenBlacklist } from '../auth/entities/blacklist.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Kyc)
    private kycRepository: Repository<Kyc>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(TokenBlacklist)
    private blacklistRepository: Repository<TokenBlacklist>,
  ) {}

  async list(page: number, limit: number, search: string): Promise<UsersQueryResponseDto> {
    if (!page) page = 1;
    if (!limit) limit = 10;
    const offset = (page - 1) * limit
    try{
      const [users, totalCount] = await this.userRepository.findAndCount({
        relations: ['profile', 'profile.notifications', 'kyc'],
        where:{
          role: USER_TYPE.CLIENT,
          profile: {
            is_active: true,
          }
        },        
        skip: offset,
        take: limit
      }) 

      for (const user of users) delete user.password;

      return {
        users,
        totalCount,
        page,
      }
    } catch (error) {
      throw error
    }
  }

  async retrieve(id: string): Promise<User> {
    try{
      const userObj = await this.userRepository.findOne({
        where: {id},
        relations: ['profile', 'profile.notifications', 'kyc'],
      })

      if (!userObj) {
        throw new NOT_FOUND_404("User not found");
      } else if (userObj && !userObj.profile.is_active) {
        throw new BAD_REQUEST_400("User has been deactivated");
      }

      delete userObj.password;

      return userObj

    } catch (error) {
      throw error 
    }
  }
  
  async update(id: string, payload: UserUpdateDto): Promise<User> {
    try{
      const user = await this.userRepository.findOne({
        where: {id},
      })

      if (!user) {
        throw new NOT_FOUND_404("User not found");
      } else if (user && !user.profile.is_active) {
        throw new BAD_REQUEST_400("User has been deactivated");
      }

      if (payload.profile) {
        const profile = await this.profileRepository.findOne({
          where: {user_id: id},
        })

        if (profile) {
          await this.profileRepository.update( profile.id, {
            ...payload.profile
          })
        }

        delete payload.profile
      }
      
      if (payload.kyc) {
        const kyc = await this.kycRepository.findOne({
          where: {user_id: id},
        })

        if (kyc) {
          await this.kycRepository.update( kyc.id, {
            ...payload.kyc
          })
        }

        delete payload.kyc
      }
      
      await this.userRepository.update( id, {
        ...payload
      })
      
      
      const updatedUserObj = await this.userRepository.findOne({
        where: {id},
        relations: ['profile', 'profile.notifications', 'kyc'],
      })

      delete updatedUserObj.password

      return updatedUserObj;

    } catch (error) {
      console.log(error)
    }
  }

  async delete(user_id: string) {
    try{
      const profileObj = await this.profileRepository.findOne({
        where: {user_id},
      })

      if (!profileObj) {
        throw new NOT_FOUND_404("User not found");
      } else if (profileObj && !profileObj.is_active) {
        throw new BAD_REQUEST_400("User has been deactivated already");
      }

      profileObj.is_active = false;
      await this.profileRepository.save(profileObj);

    } catch (error) {
      throw error 
    }
  }

  async checkBlacklist(token: string): Promise<Boolean> {
    try{
      const blackToken = await this.blacklistRepository.findOne({
        where: {token}
      });

      if (!blackToken) {
        return false;
      };

      return true;
    } catch (error) {
      throw error;
    }

  };
}

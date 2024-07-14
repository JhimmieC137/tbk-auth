import { Injectable, Body } from '@nestjs/common';
import {
  ChangePasswordDto,
  ConfirmEmailDto,
  PasswordResetDto,
  RegisterDto,
  SignInDto,
  VerifyEmailDto,
} from '../auth/dtos/authRequests.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/modules/users/entities/user.entity';
import { BAD_REQUEST_400, DUPLICATE_USER_409, INTERNAL_SERVER_ERROR_500, NOT_FOUND_404 } from 'src/helpers/exceptions/auth';
import { RegisterResponseDto } from '../auth/dtos/authResponses.dto';
import { JwtService } from '@nestjs/jwt';
import { Profile } from '../users/entities/profile.entity';
import { error } from 'console';
import { hashedPassword, isMatch } from 'src/helpers/crypt';
import dataSource from 'src/settings/dataSource.config';
import { Kyc } from '../users/entities/kyc.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Kyc)
    private kycRepository: Repository<Kyc>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async registerUser(@Body() registerDto: RegisterDto): Promise<RegisterResponseDto> {
    try{
      const userObj = await this.userRepository.find({
        where: [
          {email: registerDto.email},
          {username: registerDto.username}
        ]
      })

      if (userObj[0]) {
        throw new DUPLICATE_USER_409()
      }
    } catch (error) {
      throw error;
    }

    registerDto.password = await hashedPassword(registerDto.password);
    
    try {
            
      const newUser = this.userRepository.create(registerDto);
      await this.userRepository.save(newUser);

      const newUserProfile = this.profileRepository.create({user_id: newUser.id});
      await this.profileRepository.save(newUserProfile);
      
      const newKyc = this.kycRepository.create({user_id: newUser.id})
      await this.kycRepository.save(newKyc);
      
      newUser.profile = newUserProfile;      
      newUser.kyc = newKyc;
      await this.userRepository.save(newUser);
      
      const newUserObj = await this.userRepository.findOne({
        where: {id: newUser.id},
        relations: {
          profile: true,
          kyc: true,
        },
      })

      // const emailToken = await this.jwtService.signAsync({
      //   id: newUser.id,
      // })
      
      delete newUserObj.password;
      
      return {
        ...newUserObj,
        token: {
          access: await this.jwtService.signAsync({
            id: newUser.id,
            username: newUser.username,
            role: newUser.role,
            type: 'access'
          }),
          refresh: await this.jwtService.signAsync({
            id: newUser.id,
            username: newUser.username,
            role: newUser.role,
            type: 'refresh'
          }),
        }
      };
    } catch (error) {
      console.log(error)
      // throw new INTERNAL_SERVER_ERROR_500("Something went wrong, could not register user.");
    }
  }

  async signIn(@Body() signInDto: SignInDto) {
    try{
      const userObj = await this.userRepository.findOne({
        where: {
          email: signInDto.email 
        },
        relations: {
          profile: true,
          kyc: true
        }
      })

      if (!userObj) {
        throw new NOT_FOUND_404("User not found");
      } else if (userObj && !userObj.profile.is_active) {
        throw new BAD_REQUEST_400("User has been deactivated");
      }
      
      const passwordMatch = await isMatch(signInDto.password, userObj.password);
      if (userObj && !passwordMatch) {
        throw new BAD_REQUEST_400("Invalid credentials")
      }
      
      delete userObj.password;
      
      return {
        ...userObj,
        token: {
          access: await this.jwtService.signAsync({
            id: userObj.id,
            username: userObj.username,
            role: userObj.role,
            type: 'access'
          }),
          refresh: await this.jwtService.signAsync({
            id: userObj.id,
            username: userObj.username,
            role: userObj.role,
            type: 'refresh'
          }),
        }
      };

    } catch (error) {
      throw error
    } 

  }

  signOut() {
    return 'Signed out!';
  }

  async requestPasswordReset(@Body() passwordReset: PasswordResetDto) {
    try{
      const userObj = await this.userRepository.findOne({
        where: {
          email: passwordReset.email 
        },
        relations: {
          profile: true
        }
      })

      if (!userObj) {
        throw new NOT_FOUND_404("User not found");
      } else if (userObj && !userObj.profile.is_active) {
        throw new BAD_REQUEST_400("User has been deactivated");
      }
      
      const token = await this.jwtService.signAsync(
        {id: userObj.id}
      )

      return {
        token
      }
    } catch (error) {
      throw error
    } 
  }

  async passwordReset(@Body() changePasswordDto: ChangePasswordDto) {
    
    try{
      const payload = await this.jwtService.verifyAsync(changePasswordDto.token)
      const userObj = await this.userRepository.findOne({
        where: {
          id: payload.id 
        },
        relations: {
          profile: true
        }
      })

      
      if (!userObj) {
        throw new NOT_FOUND_404("User not found");
      } else if (userObj && !userObj.profile.is_active) {
        throw new BAD_REQUEST_400("User has been deactivated");
      }

      userObj.password = await hashedPassword(changePasswordDto.password)
      await this.userRepository.save(userObj);

      delete userObj.password;


      return {
        ...userObj,
        token: {
          access: await this.jwtService.signAsync({
            id: userObj.id,
            username: userObj.username,
            role: userObj.role,
            type: 'access'
          }),
          refresh: await this.jwtService.signAsync({
            id: userObj.id,
            username: userObj.username,
            role: userObj.role,
            type: 'refresh'
          }),
        }
      };

    } catch (error) {
      throw new BAD_REQUEST_400('invalid token')
    }
  }

  async verifyUsermail(@Body() verifyEmailDto: VerifyEmailDto) {
    try{
      const payload = await this.jwtService.verifyAsync(verifyEmailDto.token)
      const userObj = await this.userRepository.findOne({
        where: {
          id: payload.id
        },
        relations: {
          profile: true,
          kyc: true,
        }
      })

      
      if (!userObj) {
        throw new NOT_FOUND_404("User not found");
      } else if (userObj && !userObj.profile.is_active) {
        throw new BAD_REQUEST_400("User has been deactivated");
      }

      userObj.kyc.is_email_verified = true;
      await this.userRepository.save(userObj);

      if (!userObj) {
        throw new NOT_FOUND_404("User not found");
      } else if (userObj && !userObj.profile.is_active) {
        throw new BAD_REQUEST_400("User has been deactivated");
      }

      return {
        ...userObj,
        token: {
          access: await this.jwtService.signAsync({
            id: userObj.id,
            username: userObj.username,
            role: userObj.role,
            type: 'access'
          }),
          refresh: await this.jwtService.signAsync({
            id: userObj.id,
            username: userObj.username,
            role: userObj.role,
            type: 'refresh'
          }),
        }
      };

    } catch (error) {
      throw new BAD_REQUEST_400('invalid token')
    }
  }

  async confirmUserEmail(@Body() confirmEmail: ConfirmEmailDto) {
    try{
      const id = confirmEmail.id
      const userObj = await this.userRepository.findOne({
        where: {id},
        relations: {
          profile: true,
          kyc: true,
        }
      })


      if (!userObj) {
        throw new NOT_FOUND_404("User not found");
      } else if (userObj && !userObj.profile.is_active) {
        throw new BAD_REQUEST_400("User has been deactivated");
      }

      userObj.kyc.is_email_verified = true;
      await this.userRepository.save(userObj);

      
      return {
        ...userObj,
        token: {
          access: await this.jwtService.signAsync({
            id: userObj.id,
            username: userObj.username,
            role: userObj.role,
            type: 'access'
          }),
          refresh: await this.jwtService.signAsync({
            id: userObj.id,
            username: userObj.username,
            role: userObj.role,
            type: 'refresh'
          }),
        }
      };

    } catch (error) {
      console.log(error)
    }
  }
}

import {
  Controller,
  Get,
  Body,
  Post,
  Delete,
  Param,
  Query,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CustomInfoResDto,
  CustomListResDto,
  CustomResDto,
} from '../../helpers/schemas.dto';
import { ApiTags } from '@nestjs/swagger';
import { paginationDto, usersQueryDto, UserUpdateDto } from './dtos/userRequests.dto';
import { UsersQueryResponseDto } from './dtos/userResponses.dto';
import { UUID } from 'crypto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly customResDto: CustomResDto,
    private readonly customInfoResDto: CustomInfoResDto,
    private readonly customListResDto: CustomListResDto,
  ) {}

  @Get()
  async getUsers(@Query() usersQueryDto: usersQueryDto ): Promise<CustomListResDto> {
    const page = Number(usersQueryDto?.page) ?? 1;
    const limit = Number(usersQueryDto?.limit) ?? 10;
    
    const users =  await this.userService.list(page, limit, usersQueryDto.search);
    
    const response = this.customListResDto;
    response.results = users.users;
    response.total_count = users.totalCount;
    response.count = response.results.length;
    response.page = users.page
    response.message = 'Users retrieved successfully'
    response.next_page = users.page + 1
    return response;
  }
  
  @Get('/:id')
  async getUser(@Param('id') id: UUID ): Promise<CustomResDto> {
    const users =  await this.userService.retrieve(id);
    
    const response = this.customResDto;
    response.results = users;
    response.message = 'User retrieved successfully'
    return response;
  }
  
  @Patch('/:id')
  async udateUser(@Param('id') id: UUID, @Body() userUpdateDto: UserUpdateDto ): Promise<CustomResDto> {
    const user =  await this.userService.update(id, userUpdateDto);
    
    const response = this.customResDto;
    response.results = user;
    response.message = 'User updated successfully'
    return response;
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<CustomInfoResDto> {
    await this.userService.delete(id);
    const response = this.customInfoResDto;
    response.info = 'Deactivation successful';
    return response;
  }
}
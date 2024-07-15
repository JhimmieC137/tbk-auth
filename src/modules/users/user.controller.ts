import {
  Controller,
  Get,
  Body,
  Post,
  Delete,
  Param,
  Query,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CustomInfoResDto,
  CustomListResDto,
  CustomResDto,
} from '../../helpers/schemas.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { paginationDto, usersQueryDto, UserUpdateDto } from './dtos/userRequests.dto';
import { UsersQueryResponseDto } from './dtos/userResponses.dto';
import { UUID } from 'crypto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly customResDto: CustomResDto,
    private readonly customInfoResDto: CustomInfoResDto,
    private readonly customListResDto: CustomListResDto,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getUsers(@Request() req, @Query() usersQueryDto: usersQueryDto ): Promise<CustomListResDto> {
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
  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getUser(@Request() req, @Param('id') id: UUID ): Promise<CustomResDto> {
    const users =  await this.userService.retrieve(id);
    
    const response = this.customResDto;
    response.results = users;
    response.message = 'User retrieved successfully'
    return response;
  }
  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async udateUser(@Request() req, @Param('id') id: UUID, @Body() userUpdateDto: UserUpdateDto ): Promise<CustomResDto> {
    const user =  await this.userService.update(id, userUpdateDto);
    
    const response = this.customResDto;
    response.results = user;
    response.message = 'User updated successfully'
    return response;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteUser(@Request() req, @Param('id') id: string): Promise<CustomInfoResDto> {
    await this.userService.delete(id);
    const response = this.customInfoResDto;
    response.info = 'Deactivation successful';
    return response;
  }
}
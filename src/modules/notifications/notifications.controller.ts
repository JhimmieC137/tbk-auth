import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto, NotificationQueryDto, UpdateNotificationDto } from './dto/resquests.dto';
import { CustomInfoResDto, CustomListResDto, CustomResDto } from 'src/helpers/schemas.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Notification')
@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly customResDto: CustomResDto,
    private readonly customInfoResDto: CustomInfoResDto,
    private readonly customListResDto: CustomListResDto,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() createNotificationDto: CreateNotificationDto): Promise<CustomResDto> {
    const response = this.customResDto;
    response.results = await this.notificationsService.create(createNotificationDto);
    response.message = "Notification created successfully"

    return response;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req, @Query() notificationQueryDto: NotificationQueryDto): Promise<CustomListResDto> {
    const page = Number(notificationQueryDto?.page) ?? 1;
    const limit = Number(notificationQueryDto?.limit) ?? 10;

    const notifications =  await this.notificationsService.findAll(page, limit, notificationQueryDto.search);
    
    const response = this.customListResDto;
    response.results = notifications.notifications;
    response.total_count = notifications.totalCount;
    response.count = response.results.length;
    response.page = notifications.page
    response.message = 'Notifications retrieved successfully'
    response.next_page = notifications.page + 1
    return response;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string): Promise<CustomResDto> {
    const notifications =  await this.notificationsService.findOne(id);
    
    const response = this.customResDto;
    response.results = notifications;
    response.message = 'Notification retrieved successfully'
    return response;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Request() req, @Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto): Promise<CustomResDto> {
    const notification =  await this.notificationsService.update(id, updateNotificationDto);
    
    const response = this.customResDto;
    response.results = notification;
    response.message = 'Notification updated successfully'
    return response;
  }

  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string): Promise<CustomInfoResDto> {
    await this.notificationsService.remove(id);
    const response = this.customInfoResDto;
    response.info = 'Deleted successfully';
    return response;
  }
}

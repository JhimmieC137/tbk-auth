import { ApiProperty } from "@nestjs/swagger";
import { Notification } from "../entities/notification.entity";

export class QueryResponseDto {
    @ApiProperty()
    totalCount: number = null;
    
    @ApiProperty()
    page: number = null;
}


export class NotificationQueryResponseDto extends QueryResponseDto {
    @ApiProperty()
    notifications: Notification[] = [];
}
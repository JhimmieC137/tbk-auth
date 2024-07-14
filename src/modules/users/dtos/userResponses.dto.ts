import { ApiProperty } from "@nestjs/swagger";
import { User } from "../entities/user.entity";

export class RegisterResponseDto {
    @ApiProperty()
    first_name: string;
    
    @ApiProperty()
    last_name: string;
    
    @ApiProperty()
    username: string = null;
    
    @ApiProperty()
    email: string = null;
    
    @ApiProperty()
    token: string = null;
}

export class QueryResponseDto {
    @ApiProperty()
    totalCount: number = null;
    
    @ApiProperty()
    page: number = null;
}


export class UsersQueryResponseDto extends QueryResponseDto {
    @ApiProperty()
    users: User[] = [];
}
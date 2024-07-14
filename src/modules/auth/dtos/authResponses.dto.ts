import { ApiProperty } from "@nestjs/swagger";

export class TokenDto {
    @ApiProperty()
    access: string = null;
    
    @ApiProperty()
    refresh: string = null;
}


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
    token: TokenDto = null;
}
  
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthDto {
  @ApiProperty({ example: 'test@test.com', description: 'required' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @ApiProperty({ example: '123456', description: 'required' })
  @IsNotEmpty()
  @IsString()
  @Length(3, 20, { message: 'Password should be between 3 and 20 chars' })
  public password: string;
}

// create-user.dto.ts

import { IsString, IsEmail, IsOptional, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8)
  password: string;
}

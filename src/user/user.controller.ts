/* eslint-disable prettier/prettier */
// user.controller.ts
import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/model/dto/create-user.dto';
import { Response } from 'express';

@Controller('/')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    try {
      await this.userService.createUser(createUserDto);

      return res.status(HttpStatus.CREATED).json({message:"Successfully created user!"});
    } catch (error) {
      // Handle registration errors here and return an appropriate response
      return res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
    }
  }

 
}

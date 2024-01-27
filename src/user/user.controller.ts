/* eslint-disable prettier/prettier */
// user.controller.ts
import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/model/dto/create-user.dto';
import { Response } from 'express';
import { LoginDto } from 'src/model/dto/login.dto';

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

  @Post('login')
  async loginUser(
    @Body() loginDto: LoginDto,
    @Res() res: Response,
  ) {
    try {
      // Call the authentication logic from AuthService to check login
      const token = await this.userService.login(loginDto.email, loginDto.password);

      if (token) {
        return res.status(HttpStatus.OK).json({ token });
      } else {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Authentication failed' });
      }
    } catch (error) {
      // Handle login errors here and return an appropriate response
      return res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
    }
  }
 
}

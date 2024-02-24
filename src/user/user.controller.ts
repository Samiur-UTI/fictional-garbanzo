/* eslint-disable prettier/prettier */
// user.controller.ts
import { Controller, Post, Body, HttpStatus, Res, UseGuards, Get, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/model/dto/create-user.dto';
import { Response } from 'express';
import { LoginDto } from 'src/model/dto/login.dto';
import { AuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetUserResponseDto, LoginResponseDto, RegisterResponseDto } from 'src/model/dto/response.dto';
@Controller('/')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 200, description: 'Successfully created user!' , type:RegisterResponseDto})
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
  @ApiOperation({ summary: 'Login with a user' })
  @ApiResponse({ status: 200, description: 'Returns a jwt token', type:LoginResponseDto })
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

  @UseGuards(AuthGuard)
  @Get('get-user')
  @ApiOperation({ summary: 'Retrieve user information' })
  @ApiResponse({ status: 200, description: 'Returns user information', type:GetUserResponseDto })
  async getUser(@Request() req, @Res() res: Response) {
    try {
      const userEmail = req.user.email; 
      const userDetails = await this.userService.getUserDetails(userEmail);

      return res.status(HttpStatus.OK).json(userDetails);
    } catch (error) {
      // Handle errors here and return an appropriate response
      return res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
    }
  }
 
}

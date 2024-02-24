/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Res,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AccountService } from './account.service';
// import { CreateAccountDto } from './dto/create-account.dto';
import { Response } from 'express';

import { RegisterResponseDto } from 'src/model/dto/response.dto';
import { Platform } from '../model/entity/platform.entity';
import { AuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
  // Run this once after installing application
  //   @Get('seed-platforms')
  //   async seedPlatforms(@Res() res: Response) {
  //     try {
  //       // Define the platforms to seed
  //       const platformsToSeed: Partial<Platform>[] = [
  //         { platformName: 'YouTube' },
  //         { platformName: 'Facebook' },
  //         { platformName: 'Instagram' },
  //         { platformName: 'TikTok' },
  //       ];

  //       // Create platforms in the database
  //       await Promise.all(
  //         platformsToSeed.map((platform) =>
  //           this.accountService.createPlatform(platform),
  //         ),
  //       );

  //       return res
  //         .status(HttpStatus.CREATED)
  //         .json({ message: 'Platforms seeded successfully' });
  //     } catch (error) {
  //         console.log(error)
  //       return res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
  //     }
  //   }

  @UseGuards(AuthGuard)
  @Post('add-account')
  async createAccount(
    @Body() createAccountDto: CreateAccountDto,
    @Res() res: Response,
  ) {
    try {
      await this.accountService.createAccount(createAccountDto);
      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'Successfully created account' });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
    }
  }
}

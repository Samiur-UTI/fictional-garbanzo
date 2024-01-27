/* eslint-disable prettier/prettier */
// user.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/model/entity/user.entity';
import { Repository } from 'typeorm';
import { Profile } from 'src/model/entity/profile.entity';
import { CreateUserDto } from 'src/model/dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly authService: AuthService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await this.authService.hashPassword(
      createUserDto.password,
    );

    const user = this.userRepository.create({
      email: createUserDto.email,
      password: hashedPassword,
    });

    // Create the profile for the user
    const profile = this.userRepository.manager.create(Profile, {
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      phoneNumber: createUserDto.phoneNumber,
    });

    // Associate the profile with the user
    user.profile = profile;

    // Save both the user and profile in the database
    await this.userRepository.save(user);

    return user;
  }


}

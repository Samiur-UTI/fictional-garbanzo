/* eslint-disable prettier/prettier */
// user.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  async login(email: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.authService.comparePasswords(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // Generate and return a JWT token if authentication is successful
    const payload = { email: user.email };
    return this.authService.jwtSign(payload);
  }

  async getUserDetails(email: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['profile'],
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Extracting the necessary details
    const userDetails = {
      firstName: user.profile.firstName,
      lastName: user.profile.lastName,
      email: user.email,
      phoneNumber: user.profile.phoneNumber,
    };

    return userDetails;
  }
}

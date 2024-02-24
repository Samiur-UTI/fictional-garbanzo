import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Platform } from '../model/entity/platform.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 function from uuid library

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Platform)
    private readonly platformRepository: Repository<Platform>,
  ) {}

  async createPlatform(platformData: Partial<Platform>): Promise<void> {
    // Generate a unique alphanumeric platform ID using uuidv4
    const platformId = uuidv4().replace(/-/g, '').slice(0, 10);

    // Merge the generated platform ID with the platform data
    const platformWithId = { ...platformData, platformId };

    // Create a new platform entity
    const platform = this.platformRepository.create(platformWithId);

    // Save the platform entity to the database
    await this.platformRepository.save(platform);
  }
}

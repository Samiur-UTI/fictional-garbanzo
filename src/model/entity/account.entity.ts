import { Entity, Column, ManyToOne, OneToOne } from 'typeorm';
import { Profile } from './profile.entity';
import { Platform } from './platform.entity';
import { BaseEntity } from './base.entity';

export enum AccountType {
  REGULAR = 'regular',
  BUSINESS = 'business',
}

@Entity()
export class Account extends BaseEntity {
  @ManyToOne(() => Platform)
  platform: Platform;

  @OneToOne(() => Profile)
  profile: Profile;

  @Column({ type: 'enum', enum: AccountType })
  accountType: string;
}

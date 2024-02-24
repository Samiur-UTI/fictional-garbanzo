import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Account } from './account.entity';
import { Platform } from './platform.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class AccountCredentials extends BaseEntity {
  @ManyToOne(() => Platform)
  platform: Platform;

  @OneToOne(() => Account)
  @JoinColumn()
  account: Account;

  @Column()
  credentialFilePath: string;

  @Column()
  accessToken: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ nullable: true })
  tokenExpirationTime: Date;

  // Other columns if any
}

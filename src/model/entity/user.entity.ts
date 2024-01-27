// src/model/entity/user.entity.ts

import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { Profile } from './profile.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Profile, (profile) => profile.user, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  profile: Profile;
}

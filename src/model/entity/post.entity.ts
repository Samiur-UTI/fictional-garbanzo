import { Entity, Column, ManyToOne } from 'typeorm';
import { Account } from './account.entity';
import { BaseEntity } from './base.entity';

export enum PostType {
  GENERIC = 'generic',
  REELS = 'reels',
  PHOTO = 'photo',
}

@Entity()
export class Post extends BaseEntity {
  @ManyToOne(() => Account)
  account: Account;

  @Column()
  description: string;

  @Column({ nullable: true })
  metaTags: string;

  @Column({ nullable: true })
  videoPath: string;

  @Column({ nullable: true })
  photoPath: string;

  @Column({ type: 'enum', enum: PostType, default: PostType.GENERIC })
  postType: string;

  @Column()
  postCategory: string;
}

import { Entity, Column, ManyToOne } from 'typeorm';
import { Post } from './post.entity';
import { BaseEntity } from './base.entity';

export enum ScheduleStatus {
  PENDING = 'pending',
  FAILED = 'failed',
  SUCCESS = 'success',
}

@Entity()
export class ScheduleService extends BaseEntity {
  @ManyToOne(() => Post)
  post: Post;

  @Column()
  scheduledTime: Date;

  @Column({ type: 'enum', enum: ScheduleStatus })
  status: string;
}

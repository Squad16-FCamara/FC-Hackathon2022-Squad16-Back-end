import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user';

@Entity('feedbacks')
class Feedback {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne((type) => User, (user) => user.feedbacksGiven)
  user: User;

  @ManyToOne((type) => User, (user) => user.feedbacks)
  owner: User;

  @Column('text')
  content: string;

  @Column('integer')
  stars: number;

  @CreateDateColumn({ type: 'time with time zone', name: 'created_at' })
  createdAt: Date;
}

export default Feedback;

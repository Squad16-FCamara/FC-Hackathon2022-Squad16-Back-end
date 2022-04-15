import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user';

@Entity('messages')
class Message {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne((type) => User, (user) => user.messages)
  user: User;

  @ManyToOne((type) => User, (user) => user.receivedMessages)
  mentor: User;

  @Column('integer')
  senderId: number;

  @Column()
  content: string;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt: Date;
}

export default Message;

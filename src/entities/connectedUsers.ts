import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user';

@Entity('connected_users')
class ConnectedUsers {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne((type) => User, (user) => user.connectedUsers)
  user: User;

  @ManyToOne((type) => User, (user) => user.connectedMentors)
  mentor: User;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt: Date;
}

export default ConnectedUsers;

import {
  Column,
  CreateDateColumn,
  Entity,
  IsNull,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import ConnectedUsers from './connectedUsers';
import Feedback from './feedback';
import Message from './message';

export enum LangLevel {
  desconhecido = 0,
  estudante = 1,
  junior = 2,
  pleno = 3,
  senior = 4,
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  jobTitle: string;

  @Column('text')
  about: string;

  @Column({ type: 'varchar', nullable: true })
  profileImgUrl: string;

  @Column('varchar')
  password: string;

  @Column({ type: 'boolean', default: false })
  mentor: boolean;

  @OneToMany((type) => Feedback, (feedback) => feedback.owner)
  feedbacks: Array<Feedback>;

  @OneToMany((type) => Feedback, (feedback) => feedback.user)
  feedbacksGiven: Array<Feedback>;

  @Column({ type: 'integer', name: 'feedback_count', default: 0 })
  feedbackCount: number;

  @OneToMany((type) => ConnectedUsers, (connectedUsers) => connectedUsers.user)
  connectedUsers: Array<ConnectedUsers>;

  @OneToMany(
    (type) => ConnectedUsers,
    (connectedUsers) => connectedUsers.mentor
  )
  connectedMentors: Array<ConnectedUsers>;

  @Column({ type: 'float', default: 5 })
  stars: number;

  @OneToMany((type) => Message, (message) => message.user)
  messages: Array<Message>;

  @OneToMany((type) => Message, (message) => message.mentor)
  receivedMessages: Array<Message>;

  @Column({ type: 'enum', enum: LangLevel, default: LangLevel.desconhecido })
  c: LangLevel;

  @Column({ type: 'enum', enum: LangLevel, default: LangLevel.desconhecido })
  cpp: LangLevel;

  @Column({ type: 'enum', enum: LangLevel, default: LangLevel.desconhecido })
  css: LangLevel;

  @Column({ type: 'enum', enum: LangLevel, default: LangLevel.desconhecido })
  html: LangLevel;

  @Column({ type: 'enum', enum: LangLevel, default: LangLevel.desconhecido })
  java: LangLevel;

  @Column({ type: 'enum', enum: LangLevel, default: LangLevel.desconhecido })
  javascript: LangLevel;

  @Column({ type: 'enum', enum: LangLevel, default: LangLevel.desconhecido })
  julia: LangLevel;

  @Column({ type: 'enum', enum: LangLevel, default: LangLevel.desconhecido })
  python: LangLevel;

  @Column({ type: 'enum', enum: LangLevel, default: LangLevel.desconhecido })
  r: LangLevel;

  @Column({ type: 'enum', enum: LangLevel, default: LangLevel.desconhecido })
  ruby: LangLevel;

  @Column({ type: 'enum', enum: LangLevel, default: LangLevel.desconhecido })
  typescript: LangLevel;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'time with time zone' })
  updatedAt: Date;
}

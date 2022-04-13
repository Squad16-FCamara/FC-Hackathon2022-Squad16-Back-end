import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum LangLevel {
  unknown = 0,
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

  @Column('text')
  about: string;

  @Column('varchar')
  password: string;

  @Column({ type: 'boolean', default: false })
  mentor: boolean;

  @Column({ type: 'enum', enum: LangLevel, default: LangLevel.unknown })
  c: LangLevel;

  @Column({ type: 'enum', enum: LangLevel, default: LangLevel.unknown })
  cpp: LangLevel;

  @Column({ type: 'enum', enum: LangLevel, default: LangLevel.unknown })
  css: LangLevel;

  @Column({ type: 'enum', enum: LangLevel, default: LangLevel.unknown })
  html: LangLevel;

  @Column({ type: 'enum', enum: LangLevel, default: LangLevel.unknown })
  java: LangLevel;

  @Column({ type: 'enum', enum: LangLevel, default: LangLevel.unknown })
  javascript: LangLevel;

  @Column({ type: 'enum', enum: LangLevel, default: LangLevel.unknown })
  julia: LangLevel;

  @Column({ type: 'enum', enum: LangLevel, default: LangLevel.unknown })
  python: LangLevel;

  @Column({ type: 'enum', enum: LangLevel, default: LangLevel.unknown })
  r: LangLevel;

  @Column({ type: 'enum', enum: LangLevel, default: LangLevel.unknown })
  ruby: LangLevel;

  @Column({ type: 'enum', enum: LangLevel, default: LangLevel.unknown })
  typescript: LangLevel;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'time with time zone' })
  updatedAt: Date;
}

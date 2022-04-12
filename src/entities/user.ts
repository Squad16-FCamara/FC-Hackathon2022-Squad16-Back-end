import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum LangLevel {
  estudante = 'Estudante',
  junior = 'Junior',
  pleno = 'Pleno',
  senior = 'Senior',
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

  @Column({ type: 'enum', enum: LangLevel, default: LangLevel.estudante })
  c: LangLevel;

  @Column({ type: 'enum', enum: LangLevel, default: LangLevel.estudante })
  cpp: LangLevel;

  @Column({ type: 'enum', enum: LangLevel, default: LangLevel.estudante })
  css: LangLevel;

  @Column({ type: 'enum', enum: LangLevel, default: LangLevel.estudante })
  html: LangLevel;

  @Column({ type: 'enum', enum: LangLevel, default: LangLevel.estudante })
  java: LangLevel;

  @Column({ type: 'enum', enum: LangLevel, default: LangLevel.estudante })
  javascript: LangLevel;

  @Column({ type: 'enum', enum: LangLevel, default: LangLevel.estudante })
  julia: LangLevel;

  @Column({ type: 'enum', enum: LangLevel, default: LangLevel.estudante })
  python: LangLevel;

  @Column({ type: 'enum', enum: LangLevel, default: LangLevel.estudante })
  r: LangLevel;

  @Column({ type: 'enum', enum: LangLevel, default: LangLevel.estudante })
  ruby: LangLevel;

  @Column({ type: 'enum', enum: LangLevel, default: LangLevel.estudante })
  typescript: LangLevel;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'time with time zone' })
  updatedAt: Date;
}

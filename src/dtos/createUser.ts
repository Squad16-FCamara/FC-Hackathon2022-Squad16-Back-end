import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { LangLevel } from '../entities/user';

class CreateUserDTO {
  @Length(2, 255)
  name: string;

  @IsEmail()
  email: string;

  @Length(8)
  password: string;

  @IsString()
  about: string;

  @IsEnum(LangLevel)
  c: LangLevel;

  @IsEnum(LangLevel)
  cpp: LangLevel;

  @IsEnum(LangLevel)
  css: LangLevel;

  @IsEnum(LangLevel)
  html: LangLevel;

  @IsEnum(LangLevel)
  java: LangLevel;

  @IsEnum(LangLevel)
  javascript: LangLevel;

  @IsEnum(LangLevel)
  julia: LangLevel;

  @IsEnum(LangLevel)
  python: LangLevel;

  @IsEnum(LangLevel)
  r: LangLevel;

  @IsEnum(LangLevel)
  ruby: LangLevel;

  @IsEnum(LangLevel)
  typescript: LangLevel;

  constructor(userDto: CreateUserDTO) {
    this.name = userDto.name;
    this.email = userDto.email;
    this.password = userDto.password;
    this.about = userDto.about || '';

    this.c = userDto.c || LangLevel.estudante;
    this.cpp = userDto.cpp || LangLevel.estudante;
    this.css = userDto.css || LangLevel.estudante;
    this.html = userDto.html || LangLevel.estudante;
    this.java = userDto.java || LangLevel.estudante;
    this.javascript = userDto.javascript || LangLevel.estudante;
    this.julia = userDto.julia || LangLevel.estudante;
    this.python = userDto.python || LangLevel.estudante;
    this.r = userDto.r || LangLevel.estudante;
    this.ruby = userDto.ruby || LangLevel.estudante;
    this.typescript = userDto.typescript || LangLevel.estudante;
  }
}

export default CreateUserDTO;

import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { LangLevel } from '../entities/user';

class CreateUserDTO {
  @Length(2, 255)
  name: string;

  @IsEmail()
  email: string;

  @Length(8)
  password: string;

  @Length(2, 100)
  jobTitle: string;

  @IsString()
  about: string;

  @IsOptional()
  @IsBoolean()
  mentor: boolean;

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
    this.mentor = userDto.mentor;

    this.c = userDto.c || LangLevel.unknown;
    this.cpp = userDto.cpp || LangLevel.unknown;
    this.css = userDto.css || LangLevel.unknown;
    this.html = userDto.html || LangLevel.unknown;
    this.java = userDto.java || LangLevel.unknown;
    this.javascript = userDto.javascript || LangLevel.unknown;
    this.julia = userDto.julia || LangLevel.unknown;
    this.python = userDto.python || LangLevel.unknown;
    this.r = userDto.r || LangLevel.unknown;
    this.ruby = userDto.ruby || LangLevel.unknown;
    this.typescript = userDto.typescript || LangLevel.unknown;
  }
}

export default CreateUserDTO;

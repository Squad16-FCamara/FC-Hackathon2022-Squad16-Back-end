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
    this.about = userDto.about;

    this.c = userDto.c;
    this.cpp = userDto.cpp;
    this.css = userDto.css;
    this.html = userDto.html;
    this.java = userDto.java;
    this.javascript = userDto.javascript;
    this.julia = userDto.julia;
    this.python = userDto.python;
    this.r = userDto.r;
    this.ruby = userDto.ruby;
    this.typescript = userDto.typescript;
  }
}

export default CreateUserDTO;

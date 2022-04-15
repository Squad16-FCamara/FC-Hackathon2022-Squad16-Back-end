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

  @IsOptional()
  @Length(2,100)
  profileImgUrl: string;

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
    this.jobTitle = userDto.jobTitle;
    this.mentor = userDto.mentor;
    this.profileImgUrl = userDto.profileImgUrl || '../../images/perfil.png';

    this.c = userDto.c || LangLevel.desconhecido;
    this.cpp = userDto.cpp || LangLevel.desconhecido;
    this.css = userDto.css || LangLevel.desconhecido;
    this.html = userDto.html || LangLevel.desconhecido;
    this.java = userDto.java || LangLevel.desconhecido;
    this.javascript = userDto.javascript || LangLevel.desconhecido;
    this.julia = userDto.julia || LangLevel.desconhecido;
    this.python = userDto.python || LangLevel.desconhecido;
    this.r = userDto.r || LangLevel.desconhecido;
    this.ruby = userDto.ruby || LangLevel.desconhecido;
    this.typescript = userDto.typescript || LangLevel.desconhecido;
  }
}

export default CreateUserDTO;

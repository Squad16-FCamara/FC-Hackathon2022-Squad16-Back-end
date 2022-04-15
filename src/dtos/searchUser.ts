import { IsEnum, IsOptional, IsString } from 'class-validator';
import { LangLevel } from '../entities/user';

class SearchUserDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(LangLevel)
  c: LangLevel;

  @IsOptional()
  @IsEnum(LangLevel)
  cpp: LangLevel;

  @IsOptional()
  @IsEnum(LangLevel)
  css: LangLevel;

  @IsOptional()
  @IsEnum(LangLevel)
  html: LangLevel;

  @IsOptional()
  @IsEnum(LangLevel)
  java: LangLevel;

  @IsOptional()
  @IsEnum(LangLevel)
  javascript: LangLevel;

  @IsOptional()
  @IsEnum(LangLevel)
  julia: LangLevel;

  @IsOptional()
  @IsEnum(LangLevel)
  python: LangLevel;

  @IsOptional()
  @IsEnum(LangLevel)
  r: LangLevel;

  @IsOptional()
  @IsEnum(LangLevel)
  ruby: LangLevel;

  @IsOptional()
  @IsEnum(LangLevel)
  typescript: LangLevel;

  constructor(userDto: SearchUserDto) {
    this.name = userDto.name || '';
    this.c = Number(userDto.c || LangLevel.desconhecido);
    this.cpp = Number(userDto.cpp || LangLevel.desconhecido);
    this.css = Number(userDto.css || LangLevel.desconhecido);
    this.html = Number(userDto.html || LangLevel.desconhecido);
    this.java = Number(userDto.java || LangLevel.desconhecido);
    this.javascript = Number(userDto.javascript || LangLevel.desconhecido);
    this.julia = Number(userDto.julia || LangLevel.desconhecido);
    this.python = Number(userDto.python || LangLevel.desconhecido);
    this.r = Number(userDto.r || LangLevel.desconhecido);
    this.ruby = Number(userDto.ruby || LangLevel.desconhecido);
    this.typescript = Number(userDto.typescript || LangLevel.desconhecido);
  }
}

export default SearchUserDto;

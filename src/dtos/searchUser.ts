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
    this.name = userDto.name;
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

export default SearchUserDto;

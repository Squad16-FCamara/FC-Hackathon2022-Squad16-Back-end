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
    this.c = Number(userDto.c || LangLevel.unknown);
    this.cpp = Number(userDto.cpp || LangLevel.unknown);
    this.css = Number(userDto.css || LangLevel.unknown);
    this.html = Number(userDto.html || LangLevel.unknown);
    this.java = Number(userDto.java || LangLevel.unknown);
    this.javascript = Number(userDto.javascript || LangLevel.unknown);
    this.julia = Number(userDto.julia || LangLevel.unknown);
    this.python = Number(userDto.python || LangLevel.unknown);
    this.r = Number(userDto.r || LangLevel.unknown);
    this.ruby = Number(userDto.ruby || LangLevel.unknown);
    this.typescript = Number(userDto.typescript || LangLevel.unknown);
  }
}

export default SearchUserDto;

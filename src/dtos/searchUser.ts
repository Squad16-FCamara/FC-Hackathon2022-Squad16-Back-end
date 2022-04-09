import { IsEnum, IsOptional, IsString } from 'class-validator';
import { LangLevel } from '../entities/user';

class SearchUserDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(LangLevel)
  javascript: LangLevel;

  @IsOptional()
  @IsEnum(LangLevel)
  typescript: LangLevel;

  constructor(userDto: SearchUserDto) {
    this.name = userDto.name;
    this.javascript = userDto.javascript;
    this.typescript = userDto.typescript;
  }
}

export default SearchUserDto;

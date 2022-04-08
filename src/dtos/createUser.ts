import { IsEmail, IsEnum, Length } from 'class-validator';
import { LangLevel } from '../entities/user';

class CreateUserDTO {
  @Length(2, 255)
  name: string;

  @IsEmail()
  email: string;

  @Length(8)
  password: string;

  @IsEnum(LangLevel)
  javascript: LangLevel;

  @IsEnum(LangLevel)
  typescript: LangLevel;

  constructor(userDto: CreateUserDTO) {
    this.name = userDto.name;
    this.email = userDto.email;
    this.password = userDto.password;
    this.javascript = userDto.javascript;
    this.typescript = userDto.typescript;
  }
}

export default CreateUserDTO;

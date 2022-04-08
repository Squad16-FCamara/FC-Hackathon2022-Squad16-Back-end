import { IsEmail, Length } from 'class-validator';

class LoginUserDto {
  @IsEmail()
  email: string;

  @Length(8)
  password: string;

  constructor(userDto: LoginUserDto) {
    this.email = userDto.email;
    this.password = userDto.password;
  }
}

export default LoginUserDto;

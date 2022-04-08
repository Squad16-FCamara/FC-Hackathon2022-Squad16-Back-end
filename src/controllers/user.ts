import { Request, Response } from 'express';
import CreateUserDTO from '../dtos/createUser';
import LoginUserDto from '../dtos/loginUser';
import UserService from '../services/user';
import validateDto from '../validations/validateDto';

class UserController {
  public async create(request: Request, response: Response) {
    const userDto = new CreateUserDTO(request.body);

    await validateDto(userDto);

    const userService = new UserService();

    await userService.create(userDto);

    return response.status(201).json({
      message: 'User created!',
    });
  }

  public async auth(request: Request, response: Response) {
    const userDto = new LoginUserDto(request.body);

    await validateDto(userDto);

    const userService = new UserService();

    const userAndToken = await userService.auth(userDto);

    return response.json(userAndToken);
  }

  public async get(request: Request, response: Response) {
    const id = parseInt(request.params.id);

    const userService = new UserService();

    const user = await userService.get(id);

    return response.json({ user });
  }
}

export default UserController;

import { Request, Response } from 'express';
import CreateUserDTO from '../dtos/createUser';
import LoginUserDto from '../dtos/loginUser';
import SearchUserDto from '../dtos/searchUser';
import AppError from '../errors/appError';
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

  public async getAll(request: Request, response: Response) {
    const userService = new UserService();

    const users = await userService.getAll();

    return response.json({ users });
  }

  public async search(request: Request, response: Response) {
    const name = request.query.name;

    if (typeof name !== 'string') {
      throw new AppError('You can not make a search like this');
    }

    const userService = new UserService();

    const users = await userService.search(name);

    return response.json({ users });
  }
}

export default UserController;

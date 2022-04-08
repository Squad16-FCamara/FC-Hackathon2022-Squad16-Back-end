import { validateOrReject, ValidationError } from 'class-validator';
import { Request, Response } from 'express';
import CreateUserDTO from '../dtos/createUser';
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
}

export default UserController;

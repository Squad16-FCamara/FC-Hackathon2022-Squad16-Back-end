import CreateUserDTO from '../dtos/createUser';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/user';
import AppError from '../errors/appError';
import { hash } from 'bcryptjs';

class UserService {
  private readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = getRepository(User);
  }

  public async create(userDto: CreateUserDTO) {
    const exists = await this.userRepository.findOne({
      where: {
        email: userDto.email,
      },
    });

    if (exists) {
      throw new AppError('User already exists');
    }

    userDto.password = await hash(userDto.password, 10);

    const user = this.userRepository.create(userDto);

    this.userRepository.save(user);

    return user;
  }
}

export default UserService;

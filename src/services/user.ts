import CreateUserDTO from '../dtos/createUser';
import { getRepository, ILike, MoreThanOrEqual, Repository } from 'typeorm';
import { User } from '../entities/user';
import AppError from '../errors/appError';
import { compare, hash } from 'bcryptjs';
import LoginUserDto from '../dtos/loginUser';
import { sign } from 'jsonwebtoken';
import SearchUserDto from '../dtos/searchUser';

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

  public async auth({ email, password }: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError('Verify your email or password', 401);
    }

    const validation = await compare(password, user.password);

    if (!validation) {
      throw new AppError('Verify your email or password', 401);
    }

    const secret = process.env.AUTH_SECRET || 'secret';
    const expiresIn = process.env.AUTH_TIME || '1d';

    const token = sign({}, secret, {
      expiresIn,
      subject: user.id.toString(),
    });

    delete user.password;

    return { user, token };
  }

  public async get(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new AppError('User not found');
    }

    delete user.password;
    delete user.email;
    delete user.updatedAt;

    return user;
  }

  public async getAll() {
    const users = await this.userRepository.find();

    users.forEach((user) => {
      delete user.password;
      delete user.updatedAt;
      delete user.email;
    });

    return users;
  }

  public async search(search: SearchUserDto) {
    const users = await this.userRepository.find({
      // ts bug, se você somar ou subtrair um valor, o bug desaparece
      // poderia colocar search.typescript - 0 para resolver no typescript
      // para não comprometer o funcionamento, vou usar ts-ignore
      where: [
        {
          name: ILike(`%${search.name}%`),
          // @ts-ignore
          c: MoreThanOrEqual(search.c),
          // @ts-ignore
          cpp: MoreThanOrEqual(search.cpp),
          // @ts-ignore
          css: MoreThanOrEqual(search.css),
          // @ts-ignore
          html: MoreThanOrEqual(search.html),
          // @ts-ignore
          java: MoreThanOrEqual(search.java),
          // @ts-ignore
          javascript: MoreThanOrEqual(search.javascript),
          // @ts-ignore
          julia: MoreThanOrEqual(search.julia),
          // @ts-ignore
          python: MoreThanOrEqual(search.python),
          // @ts-ignore
          r: MoreThanOrEqual(search.r),
          // @ts-ignore
          ruby: MoreThanOrEqual(search.ruby),
          // @ts-ignore
          typescript: MoreThanOrEqual(search.typescript),
        },
        {
          about: ILike(`%${search.name}%`),
          // @ts-ignore
          c: MoreThanOrEqual(search.c),
          // @ts-ignore
          cpp: MoreThanOrEqual(search.cpp),
          // @ts-ignore
          css: MoreThanOrEqual(search.css),
          // @ts-ignore
          html: MoreThanOrEqual(search.html),
          // @ts-ignore
          java: MoreThanOrEqual(search.java),
          // @ts-ignore
          javascript: MoreThanOrEqual(search.javascript),
          // @ts-ignore
          julia: MoreThanOrEqual(search.julia),
          // @ts-ignore
          python: MoreThanOrEqual(search.python),
          // @ts-ignore
          r: MoreThanOrEqual(search.r),
          // @ts-ignore
          ruby: MoreThanOrEqual(search.ruby),
          // @ts-ignore
          typescript: MoreThanOrEqual(search.typescript),
        },
      ],
    });

    for (let i = 0; i < users.length; i++) {
      delete users[i].password;
      delete users[i].updatedAt;
      delete users[i].email;
    }

    return users;
  }
}

export default UserService;

import CreateUserDTO from '../dtos/createUser';
import { getRepository, ILike, MoreThanOrEqual, Repository } from 'typeorm';
import { User } from '../entities/user';
import AppError from '../errors/appError';
import { compare, hash } from 'bcryptjs';
import LoginUserDto from '../dtos/loginUser';
import { sign } from 'jsonwebtoken';
import SearchUserDto from '../dtos/searchUser';
import Feedback from '../entities/feedback';

class UserService {
  private readonly userRepository: Repository<User>;
  private readonly feedbackRepository: Repository<Feedback>;

  constructor() {
    this.userRepository = getRepository(User);
    this.feedbackRepository = getRepository(Feedback);
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

    const skills = [];

    for (const [key, value] of Object.entries(user)) {
      if (
        key == 'c' ||
        key == 'cpp' ||
        key == 'css' ||
        key == 'html' ||
        key == 'java' ||
        key == 'javascript' ||
        key == 'julia' ||
        key == 'python' ||
        key == 'r' ||
        key == 'ruby' ||
        key == 'typescript'
      ) {
        if (value != '0') skills.push(key);
      }
    }

    if (!user.mentor) {
      return user;
    }

    const feedbacks = await this.feedbackRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
      relations: ['owner'],
    });

    user.feedbacks = feedbacks.map((feedback) => {
      return {
        owner: {
          id: feedback.owner.id,
          name: feedback.owner.name,
        },
        content: feedback.content,
        stars: feedback.stars,
      };
    }) as Array<Feedback>;

    return { ...user, skills };
  }

  public async getAll() {
    const users = await this.userRepository.find();

    const userFilter = users.map((user) => {
      delete user.password;
      delete user.email;
      delete user.updatedAt;

      const skills = [];

      for (const [key, value] of Object.entries(user)) {
        if (
          key == 'c' ||
          key == 'cpp' ||
          key == 'css' ||
          key == 'html' ||
          key == 'java' ||
          key == 'javascript' ||
          key == 'julia' ||
          key == 'python' ||
          key == 'r' ||
          key == 'ruby' ||
          key == 'typescript'
        ) {
          if (value != '0') skills.push(key);
        }
      }
      return { ...user, skills };
    });

    return userFilter;
  }

  public async search(search: SearchUserDto) {
    const users = await this.userRepository.find({
      // ts bug, se você somar ou subtrair um valor, o bug desaparece
      // poderia colocar search.typescript - 0 para resolver no typescript
      // para não comprometer o funcionamento, vou usar ts-ignore
      where: [
        {
          name: ILike(`%${search.name}%`),
          mentor: true,
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
          mentor: true,
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

    const userFilter = users.map((user) => {
      delete user.password;
      delete user.email;
      delete user.updatedAt;

      const skills = [];

      for (const [key, value] of Object.entries(user)) {
        if (
          key == 'c' ||
          key == 'cpp' ||
          key == 'css' ||
          key == 'html' ||
          key == 'java' ||
          key == 'javascript' ||
          key == 'julia' ||
          key == 'python' ||
          key == 'r' ||
          key == 'ruby' ||
          key == 'typescript'
        ) {
          if (value != '0') skills.push(key);
        }
      }
      return { ...user, skills };
    });

    return userFilter;
  }
}

export default UserService;

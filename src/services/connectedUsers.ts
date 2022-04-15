import { getRepository, Repository } from 'typeorm';
import CreateConnectedUsersDto from '../dtos/createConnectedUsers';
import ConnectedUsers from '../entities/connectedUsers';
import { User } from '../entities/user';
import AppError from '../errors/appError';

class ConnectedUsersService {
  private readonly connectedUsersRepository: Repository<ConnectedUsers>;
  private readonly userRepository: Repository<User>;

  constructor() {
    this.connectedUsersRepository = getRepository(ConnectedUsers);
    this.userRepository = getRepository(User);
  }

  public async create({ mentorId, userId }: CreateConnectedUsersDto) {
    const mentor = await this.userRepository.findOne({
      where: {
        id: mentorId,
      },
    });

    if (!mentor) {
      throw new AppError('Mentor not found', 401);
    }

    const exists = this.connectedUsersRepository.findOne({
      where: {
        mentor: {
          id: mentorId,
        },
        user: {
          id: userId,
        },
    }});

    if (exists) {
      throw new AppError('You are already connected', 401)
    }

    const connectedUsers = this.connectedUsersRepository.create({
      mentor: {
        id: mentorId,
      },
      user: {
        id: userId,
      },
    });

    await this.connectedUsersRepository.save(connectedUsers);

    return connectedUsers;
  }

  public async get(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (user.mentor) {
      const connectedUsers = await this.connectedUsersRepository.find({
        where: {
          mentor: {
            id,
          },
        },
        relations: ['user'],
      });

      return connectedUsers.map((connectedUser) => {
        return {
          id: connectedUser.user.id,
          name: connectedUser.user.name,
        };
      });
    }

    const connectedUsers = await this.connectedUsersRepository.find({
      where: {
        user: {
          id,
        },
      },
      relations: ['mentor'],
    });

    return connectedUsers.map((connectedUser) => {
      return {
        id: connectedUser.mentor.id,
        name: connectedUser.mentor.name,
      };
    });
  }
}

export default ConnectedUsersService;

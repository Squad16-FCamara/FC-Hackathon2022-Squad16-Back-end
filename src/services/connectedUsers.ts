import { getRepository, Repository } from 'typeorm';
import CreateConnectedUsersDto from '../dtos/createConnectedUsers';
import ConnectedUsers from '../entities/connectedUsers';
import { User } from '../entities/user';
import AppError from '../errors/appError';
import Message from '../entities/message';

class ConnectedUsersService {
  private readonly connectedUsersRepository: Repository<ConnectedUsers>;
  private readonly userRepository: Repository<User>;
  private readonly messageRepository: Repository<Message>;

  constructor() {
    this.connectedUsersRepository = getRepository(ConnectedUsers);
    this.userRepository = getRepository(User);
    this.messageRepository = getRepository(Message);
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
      },
    });

    if (exists) {
      throw new AppError('You are already connected', 401);
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

    if (!user) {
      throw new AppError('User not found', 401);
    }

    if (user.mentor) {
      const connectedUsers = await this.connectedUsersRepository.find({
        where: {
          mentor: {
            id,
          },
        },
        relations: ['user'],
      });

      return Promise.all(
        connectedUsers.map(async (connectedUser) => {
          const raw = await this.messageRepository.find({
            where: {
              mentor: {
                id: user.id,
              },
              user: {
                id: connectedUser.user.id,
              },
            },
          });

          const messages = raw.map((rawMessage) => {
            return {
              id: rawMessage.id,
              content: rawMessage.content,
              senderId: rawMessage.senderId,
            };
          });

          console.log(messages);

          return {
            id: connectedUser.user.id,
            name: connectedUser.user.name,
            about: connectedUser.user.about,
            jobTitle: connectedUser.user.jobTitle,
            messages,
          };
        })
      );
    }

    const connectedUsers = await this.connectedUsersRepository.find({
      where: {
        user: {
          id,
        },
      },
      relations: ['mentor'],
    });

    return await Promise.all(
      connectedUsers.map(async (connectedUser) => {
        const raw = await this.messageRepository.find({
          where: {
            user: {
              id: user.id,
            },
            mentor: {
              id: connectedUser.mentor.id,
            },
          },
        });

        const messages = raw.map((rawMessage) => {
          return {
            id: rawMessage.id,
            content: rawMessage.content,
          };
        });

        return {
          id: connectedUser.mentor.id,
          name: connectedUser.mentor.name,
          about: connectedUser.mentor.about,
          jobTitle: connectedUser.mentor.jobTitle,
          messages,
        };
      })
    );
  }
}

export default ConnectedUsersService;

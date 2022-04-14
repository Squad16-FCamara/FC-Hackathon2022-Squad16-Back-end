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
}

export default ConnectedUsersService;

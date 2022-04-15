import { Repository, getRepository } from 'typeorm';
import CreateMessageDto from '../dtos/createMessage';
import { User } from '../entities/user';
import Message from '../entities/message';
import AppError from '../errors/appError';

class MessageService {
  private readonly userRepository: Repository<User>;
  private readonly messageRepository: Repository<Message>;

  constructor() {
    this.userRepository = getRepository(User);
    this.messageRepository = getRepository(Message);
  }

  public async create({ userId, mentorId, content }: CreateMessageDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new AppError('User not found', 401);
    }

    if (user.mentor) {
      const target = await this.userRepository.findOne({
        where: {
          id: mentorId,
        },
      });

      if (!target) {
        throw new AppError('User not found', 401);
      }

      if (target.mentor) {
        throw new AppError(
          'Mentors can not send messages to other mentor',
          401
        );
      }

      const message = this.messageRepository.create({
        content,
        mentor: {
          id: user.id,
        },
        user: {
          id: target.id,
        },
        senderId: user.id,
      });

      await this.messageRepository.save(message);

      return message;
    }

    const mentor = await this.userRepository.findOne({
      where: {
        id: mentorId,
      },
    });

    if (!mentor) {
      throw new AppError('User not found', 401);
    }

    if (!mentor.mentor) {
      throw new AppError('Users can not send messages to other user', 401);
    }

    const message = this.messageRepository.create({
      content,
      mentor: {
        id: mentor.id,
      },
      user: {
        id: user.id,
      },
      senderId: user.id,
    });

    await this.messageRepository.save(message);

    return message;
  }
}

export default MessageService;

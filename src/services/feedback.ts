import { getRepository, Repository } from 'typeorm';
import CreateFeedbackDto from '../dtos/createFeedback';
import Feedback from '../entities/feedback';
import { User } from '../entities/user';
import AppError from '../errors/appError';

class FeedbackService {
  private readonly feedbackRepository: Repository<Feedback>;
  private readonly userRepository: Repository<User>;

  constructor() {
    this.feedbackRepository = getRepository(Feedback);
    this.userRepository = getRepository(User);
  }

  public async create({ content, ownerId, stars, userId }: CreateFeedbackDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new AppError('User not found', 401);
    }

    const feedback = this.feedbackRepository.create({
      content,
      owner: {
        id: ownerId,
      },
      user: {
        id: userId,
      },
      stars,
    });

    await this.feedbackRepository.save(feedback);

    user.stars =
      (user.feedbackCount * user.stars + stars) / (user.feedbackCount + 1);
    user.feedbackCount += 1;

    await this.userRepository.save(user);

    return feedback;
  }
}

export default FeedbackService;

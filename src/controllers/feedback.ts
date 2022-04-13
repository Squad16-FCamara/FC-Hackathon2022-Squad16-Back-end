import { Request, Response } from 'express';
import CreateFeedbackDto from '../dtos/createFeedback';
import FeedbackService from '../services/feedback';
import validateDto from '../validations/validateDto';

class FeedbackController {
  public async create(request: Request, response: Response) {
    const feedbackDto = new CreateFeedbackDto({
      ownerId: request.user.id,
      ...request.body,
    });

    await validateDto(feedbackDto);

    const feedbackService = new FeedbackService();

    const feedback = await feedbackService.create(feedbackDto);

    return response.status(201).json({
      feedback,
    });
  }
}

export default FeedbackController;

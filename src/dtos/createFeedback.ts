import { IsInt, IsNumber, IsString, Length, Max, Min } from 'class-validator';

class CreateFeedbackDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  ownerId: number;

  @IsInt()
  @Min(1)
  @Max(5)
  stars: number;

  @IsString()
  content: string;

  constructor(feedbackDto: CreateFeedbackDto) {
    this.userId = feedbackDto.userId;
    this.ownerId = feedbackDto.ownerId;
    this.stars = feedbackDto.stars;
    this.content = feedbackDto.content;
  }
}

export default CreateFeedbackDto;

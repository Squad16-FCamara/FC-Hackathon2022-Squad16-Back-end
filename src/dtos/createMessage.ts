import { IsNumber, IsString, IsBoolean } from 'class-validator';

class CreateMessageDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  mentorId: number;

  @IsString()
  content: string;

  constructor(messageDto: CreateMessageDto) {
    this.content = messageDto.content;
    this.mentorId = messageDto.mentorId;
    this.userId = messageDto.userId;
  }
}

export default CreateMessageDto;

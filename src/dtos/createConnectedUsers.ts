import { IsNumber } from 'class-validator';

class CreateConnectedUsersDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  mentorId: number;

  constructor(connectedUsersdto: CreateConnectedUsersDto) {
    this.userId = connectedUsersdto.userId;
    this.mentorId = connectedUsersdto.mentorId;
  }
}

export default CreateConnectedUsersDto;

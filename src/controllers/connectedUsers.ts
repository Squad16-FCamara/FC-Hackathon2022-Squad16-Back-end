import { Request, Response } from 'express';
import CreateConnectedUsersDto from '../dtos/createConnectedUsers';
import ConnectedUsersService from '../services/connectedUsers';

class ConnectedUsersController {
  public async create(request: Request, response: Response) {
    const connectedUsersDto = new CreateConnectedUsersDto({
      mentorId: request.body.mentorId,
      userId: request.user.id,
    });

    const connectedUsersService = new ConnectedUsersService();

    const connectedUsers = await connectedUsersService.create(
      connectedUsersDto
    );

    return response.status(201).json({ connectedUsers });
  }

  public async get(request: Request, response: Response) {
    const connectedUsersService = new ConnectedUsersService();

    const connectedUsers = await connectedUsersService.get(request.user.id);

    return response.json({ connectedUsers });
  }
}

export default ConnectedUsersController;

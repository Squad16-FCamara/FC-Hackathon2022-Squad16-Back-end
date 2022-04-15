import { Socket } from 'socket.io';
import CreateMessageDto from './dtos/createMessage';
import { verify, JwtPayload } from 'jsonwebtoken';
import validateDto from './validations/validateDto';
import MessageService from './services/message';

function socketEvents(socket: Socket) {
  socket.on('sendMessage', async (content) => {
    const secret = process.env.AUTH_SECRET || 'secret';

    try {
      const { sub } = verify(content.token, secret) as JwtPayload;

      content.userId = parseInt(sub);

      const messageDto = new CreateMessageDto(content);

      await validateDto(messageDto);

      const messageService = new MessageService();

      await messageService.create(messageDto);

      socket.emit('updateChat', messageDto);
    } catch {
      socket.emit('invalidToken', 'invalidToken');
      return;
    }
  });
}

export default socketEvents;

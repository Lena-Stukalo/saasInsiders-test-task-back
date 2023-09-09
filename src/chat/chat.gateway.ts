import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { IToken } from 'src/types/socket.types';
import { IDecoded } from 'src/middlewares/AuthMiddelwares';
import { RequestError } from 'src/helpers/RequestError';
import { User } from 'src/entities/user.entities';
import { IUser } from 'src/types/user.types';
import { Frase } from 'src/entities/frase.entities';

@WebSocketGateway(8081, { cors: '*' })
export class ChatGateway {
  constructor(private jwtService: JwtService) {}
  @WebSocketServer()
  server;
  @SubscribeMessage('message')
  async handleMessage(@MessageBody() message: IToken) {
    try {
      const payload = (await this.jwtService.verifyAsync(message.token, {
        secret: process.env.SECRET_KEY!,
      })) as IDecoded;
      const user = (await User.findOneBy({ email: payload.email })) as IUser;
      if (!user || user.token !== message.token) {
        throw RequestError(401, 'Unauthorized');
      }
      const dialog = await Frase.find({
        where: [{ ownerId: user.id }],
        order: { createAT: 'ASC' },
      });
      this.server.emit('message', dialog);
    } catch (error: any) {
      if (!error.status) {
        error.status = 401;
      }
      throw RequestError(401, 'Unauthorized');
    }
  }
}

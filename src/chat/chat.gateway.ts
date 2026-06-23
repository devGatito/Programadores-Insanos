import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server?: Server;

  @SubscribeMessage('ping')
  handlePing(@MessageBody() payload: any) {
    this.server?.emit('pong', payload);
    return payload;
  }

  emitMessageCreated(message: any) {
    this.server?.emit('message:created', message);
  }
}
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ChatGateway } from 'src/chat/chat.gateway';

@Injectable()
export class MessagesService {
  constructor(
  private readonly prisma: PrismaService,
  private readonly chatGateway: ChatGateway,
) {}

async create(createMessageDto: CreateMessageDto) {
  const message = await this.prisma.message.create({
    data: {
      content: createMessageDto.content,
      user: {
        connect: {
          id: createMessageDto.userId,
        },
      },
    },
    include: { user: true },
  });

  this.chatGateway.emitMessageCreated(message);

  return message;
}

 

  findAll() {
    return this.prisma.message.findMany({
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: number) {
    return this.prisma.message.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return this.prisma.message.update({
      where: { id },
      data: updateMessageDto,
      include: { user: true },
    });
  }

  remove(id: number) {
    return this.prisma.message.delete({
      where: { id },
      include: { user: true },
    });
  }
}
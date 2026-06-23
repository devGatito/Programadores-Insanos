import 'dotenv/config';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

//aqui se hace una injection para que la clase PrismaService pueda ser utilizada en otros lugares del proyecto, y se implementa la interfaz OnModuleInit para ejecutar el método onModuleInit cuando el módulo se inicializa.
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
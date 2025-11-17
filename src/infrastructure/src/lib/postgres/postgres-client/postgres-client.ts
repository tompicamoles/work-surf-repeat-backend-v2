import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class PostgresClient {
  //todo implementer
  //j'utilise "onModuleInit" de nestJS pour que ça se connecte ?
  async onModuleInit() {
    try {
      const client = new Client({
        connectionString: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,
      });
      await client.connect();
    } catch (error) {
      const cause = error instanceof Error ? error : undefined;
      throw new InternalServerErrorException(
        'Error during postgres connection initialization.',
        {
          cause,
        },
      );
    }
  }
}

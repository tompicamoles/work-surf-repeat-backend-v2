import { Injectable } from '@nestjs/common';

@Injectable()
export class PostgresClientService {
  //todo implementer
  // j'utilise "onModuleInit" de nestJS pour que ça se connecte ?

  async onModuleInit() {
    try {
      const client = new Client({
        connectionString: `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`,
      });

      client.connect();
    } catch (error) {
      throw new Error('Error during postgres connection initialization.');
    }
  }
}

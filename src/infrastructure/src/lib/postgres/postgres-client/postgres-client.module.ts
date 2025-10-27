import { Module } from '@nestjs/common';
import { PostgresClientService } from './postgres-client.service';

@Module({
  providers: [PostgresClientService],
})
export class PostgresClientModule {}

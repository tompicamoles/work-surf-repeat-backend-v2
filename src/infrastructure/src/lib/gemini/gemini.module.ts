import { Global, Module } from '@nestjs/common';
import { AI_PROVIDER } from 'src/application/src/lib/providers/aiProvider/ai.provider';
import { GeminiApiProvider } from './gemini.provider';

@Global()
@Module({
  providers: [{ provide: AI_PROVIDER, useClass: GeminiApiProvider }],
})
export class GeminiModule {}

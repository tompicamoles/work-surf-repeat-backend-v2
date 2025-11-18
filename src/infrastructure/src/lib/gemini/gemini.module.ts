import { Global, Module } from '@nestjs/common';
import { AI_PROVIDER } from 'src/application/src/lib/providers/ai-provider/ai.provider';
import { GeminiApiProvider } from './gemini.provider';

@Global()
@Module({
  providers: [{ provide: AI_PROVIDER, useClass: GeminiApiProvider }],
  exports: [AI_PROVIDER],
})
export class GeminiModule {}

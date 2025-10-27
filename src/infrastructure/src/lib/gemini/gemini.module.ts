import { Global, Module } from '@nestjs/common';
import { GEMINI_PROVIDER } from 'src/application/src/lib/gemini/gemini.provider';
import { GeminiApiProvider } from './gemini.provider';

@Global()
@Module({
  providers: [{ provide: GEMINI_PROVIDER, useClass: GeminiApiProvider }],
})
export class GeminiModule {}

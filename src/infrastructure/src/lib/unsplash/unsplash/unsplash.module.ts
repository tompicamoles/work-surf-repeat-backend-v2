import { Global, Module } from '@nestjs/common';
import { UNSPLASH_PROVIDER } from 'src/application/src/lib/unsplash/unsplash.provider';
import { UnsplashApiProvider } from './unsplash.provider';

@Global()
@Module({
  providers: [
    {
      provide: UNSPLASH_PROVIDER,
      useClass: UnsplashApiProvider,
    },
  ],
})
export class UnsplashModule {}

import { Global, Module } from '@nestjs/common';
import { IMAGE_GENERATOR_PROVIDER } from 'src/application/src/lib/providers/imageGenerator/imageGenerator.provider';
import { UnsplashApiProvider } from './unsplash.provider';

@Global()
@Module({
  providers: [
    {
      provide: IMAGE_GENERATOR_PROVIDER,
      useClass: UnsplashApiProvider,
    },
  ],
  exports: [IMAGE_GENERATOR_PROVIDER],
})
export class UnsplashModule {}

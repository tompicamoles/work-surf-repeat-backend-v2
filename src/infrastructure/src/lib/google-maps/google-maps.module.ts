import { Global, Module } from '@nestjs/common';
import { GEOLOCATION_PROVIDER } from 'src/application/src/lib/providers/geolocationProvider/geolocation.provider';
import { GoogleMapsProvider } from './google-maps.provider';

@Global()
@Module({
  providers: [{ provide: GEOLOCATION_PROVIDER, useClass: GoogleMapsProvider }],
})
export class GoogleMapsModule {}

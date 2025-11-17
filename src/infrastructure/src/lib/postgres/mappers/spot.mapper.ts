import { Spot } from 'src/spot/domain/spot.model';
import { SpotRecord } from '../records/spot.record';

export const spotMapper = {
  toPersistence: (spot: Spot): SpotRecord => ({
    _id: spot.id,
    name: spot.name,
    country: spot.country,
    image_link: spot.imageLink.toString(),
    latitude: spot.latitude,
    longitude: spot.longitude,
    submitted_by: spot.submittedBy,
    wifi_quality: spot.wifiQuality,
    creator_name: spot.creatorName,
    summary: spot.summary,
  }),
};

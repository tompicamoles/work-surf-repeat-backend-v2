import { Injectable } from '@nestjs/common';
import { SpotsRepository } from 'src/spot/application/spot.repository';
import { Spot } from 'src/spot/domain/spot.model';
import { PostgresClient } from '../postgres-client/postgres-client';

@Injectable()
export class PostgresSpotRepository implements SpotsRepository {
  constructor(private readonly client: PostgresClient) {} // todo should I import it here ?

  async create(spot: Spot): Promise<void> {
    //const spotRecord = spotMapper.toPersistence(spot);
    // await this.client.query(
    //   `
    //   INSERT INTO spots (
    //     name,
    //     country,
    //     image_link,
    //     latitude,
    //     longitude,
    //     submitted_by,
    //     wifi_quality,
    //     creator_name,
    //     summary
    //   )
    //   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    //   RETURNING id
    // `,
    //   [
    //     spotRecord.name,
    //     spotRecord.country,
    //     spotRecord.image_link,
    //     spotRecord.latitude,
    //     spotRecord.longitude,
    //     spotRecord.submitted_by,
    //     spotRecord.wifi_quality,
    //     spotRecord.creator_name,
    //     spotRecord.summary,
    //   ],
    // );
    console.log(spot);
    await Promise.resolve();
  }
}

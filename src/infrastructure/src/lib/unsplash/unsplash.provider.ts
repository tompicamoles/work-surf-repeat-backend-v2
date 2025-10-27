import { Injectable } from '@nestjs/common';
import { UnsplashProvider } from 'src/application/src/lib/unsplash/unsplash.provider';

interface UnsplashRandomPhotoResponse {
  urls: {
    regular: string;
  };
}

@Injectable()
export class UnsplashApiProvider implements UnsplashProvider {
  private readonly token = process.env.UNSPLASH_TOKEN;

  /**
   * related documentation: https://unsplash.com/documentation#get-a-random-photo
   * @param keyword
   * @returns Unsplash image url
   */
  async generateRandomImage(keyword: string): Promise<URL> {
    if (!this.token) {
      throw new Error('UNSPLASH_TOKEN environment variable is required');
    }
    const url = `https://api.unsplash.com/photos/random?query=${keyword}&orientation=landscape`;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: this.token,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }

      const data = (await response.json()) as UnsplashRandomPhotoResponse;
      const imgUrl = data.urls.regular;
      return new URL(imgUrl);
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}

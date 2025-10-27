export const UNSPLASH_PROVIDER = Symbol('UNSPLASH_PROVIDER');

export interface UnsplashProvider {
  generateRandomImage(keyword: string): Promise<URL>;
}

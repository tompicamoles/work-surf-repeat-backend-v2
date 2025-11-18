export const IMAGE_GENERATOR_PROVIDER = Symbol('IMAGE_GENERATOR_PROVIDER');

export interface ImageGeneratorProvider {
  generateRandomImage(keyword: string): Promise<URL>;
}

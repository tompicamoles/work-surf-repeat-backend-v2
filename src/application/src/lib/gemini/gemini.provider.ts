export const GEMINI_PROVIDER = Symbol('GEMINI_PROVIDER');

export interface GeminiProvider {
  validateSpotEligibility(name, country): Promise<boolean>;
}

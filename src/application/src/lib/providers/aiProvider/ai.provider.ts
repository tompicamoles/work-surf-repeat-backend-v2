export const AI_PROVIDER = Symbol('AI_PROVIDER');

export interface AiProvider {
  validateSpotEligibility(name, country): Promise<boolean>;
  generateSpotSummary(name, country): Promise<string>;
}

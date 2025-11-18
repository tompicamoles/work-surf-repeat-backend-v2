import { GoogleGenAI } from '@google/genai';
import { Injectable } from '@nestjs/common';
import { AiProvider } from 'src/application/src/lib/providers/aiProvider/ai.provider';
import { Spot } from 'src/spot/domain/spot.model';

@Injectable()
export class GeminiApiProvider implements AiProvider {
  private ai: GoogleGenAI;
  constructor() {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      throw new Error('API KEY MISSING');
    }

    this.ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  }

  /**
   * related documentation: https://ai.google.dev/gemini-api/docs?hl=fr
   * @param name
   * @param country
   * @returns boolean
   */
  async validateSpotEligibility(name: any, country: any): Promise<boolean> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-05-20',

        contents: Spot.getAiModeratorInstructions(name, country),
      });

      return response.text === 'true';
    } catch {
      throw new Error('Error: could not call Gemini Api');
    }
  }

  /**
   * related documentation: https://ai.google.dev/gemini-api/docs?hl=fr
   * @param name
   * @param country
   * @returns boolean
   */
  async generateSpotSummary(name: string, country: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-05-20',

        contents: `Generate a detailed summary for a remote work and surfing destination.
      The summary must be approximately 90-120 words and follow this structure:
      [Catchy Title]: Explain why the destination is good for remote work (focus on reliable internet, coworking/cafes). Then, explain why it's good for surfing (mention type of waves, skill levels, consistency, and accessibility to surf spots within 20 mins drive).
      Ensure the summary emphasizes these aspects for both remote work and surfing.
      Example structure and desired detail:
      City Meets Surf: Focus on urban amenities (internet, coworking) and accessible waves (type, levels, drive time).
      Surf & Focus: Highlight tranquil environment (internet, cafes) and diverse breaks (type, levels, season).
      Destination: ${name}, ${country}`,
      });

      if (response === undefined) {
        throw new Error('Gemini response is undefined');
      }

      return response.text || '';
    } catch {
      throw new Error('Error: could not call Gemini Api');
    }
  }
}

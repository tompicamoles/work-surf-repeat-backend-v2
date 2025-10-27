import { GoogleGenAI } from '@google/genai';
import { Injectable } from '@nestjs/common';
import { GeminiProvider } from 'src/application/src/lib/gemini/gemini.provider';
import { Spot } from 'src/spot/domain/spot.model';

@Injectable()
export class GeminiApiProvider implements GeminiProvider {
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
}

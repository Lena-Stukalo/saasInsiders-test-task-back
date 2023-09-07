import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

@Injectable()
export class ChatGptAiService {
  private readonly openApi: OpenAI;
  constructor() {
    this.openApi = new OpenAI({
      organization: process.env.ORGANIZATION_ID,
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  async getModeAnswer(question: string, temperature?: number) {
    try {
      const res = await this.openApi.completions.create({
        prompt: question,
        model: 'gpt-3.5-turbo',
        temperature: temperature != undefined ? temperature : 0.9,
      });
      return JSON.stringify(res.choices);
    } catch (error) {
      return error;
    }
  }
}

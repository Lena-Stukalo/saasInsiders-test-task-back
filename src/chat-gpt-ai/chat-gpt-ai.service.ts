import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { IUser } from '../types/user.types';
import { IQuestion } from '../types/qestion.type';
import { Frase } from '../entities/frase.entities';

@Injectable()
export class ChatGptAiService {
  private readonly openApi: OpenAI;
  constructor() {
    this.openApi = new OpenAI({
      organization: process.env.ORGANIZATION_ID,
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  async getModeAnswer(body: IQuestion, user: IUser) {
    try {
      const ques = await Frase.create({
        text: body.question,
        isHuman: true,
        ownerId: user.id,
        createAT: new Date(),
      });
      ques.save();
      const res = await this.openApi.chat.completions.create({
        messages: [{ role: 'assistant', content: body.question }],
        model: 'gpt-3.5-turbo',
      });
      const result = await Frase.create({
        text: res.choices[0].message.content,
        isHuman: false,
        ownerId: user.id,
        createAT: new Date(),
      });
      result.save();
      return [ques, result];
    } catch (error) {
      throw error;
    }
  }
  async getDiolog(user: IUser) {
    try {
      const result = await Frase.find({
        where: [{ ownerId: user.id }],
        order: { createAT: 'ASC' },
      });
      return result;
    } catch (error) {
      return error;
    }
  }
}

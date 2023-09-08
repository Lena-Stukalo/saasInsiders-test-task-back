import { Controller, Post, Req, Res, Get } from '@nestjs/common';
import { ChatGptAiService } from './chat-gpt-ai.service';
import { IQuestion } from 'src/types/qestion.type';
import { CustomRequest } from 'src/types/service.type';
import { Response } from 'express';

@Controller('chat-gpt-ai')
export class ChatGptAiController {
  constructor(private readonly service: ChatGptAiService) {}
  @Post('/question')
  async getModelAnswer(@Req() req: CustomRequest, @Res() res: Response) {
    try {
      const data = req.body as unknown as IQuestion;
      const result = await this.service.getModeAnswer(data, req.user);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(error.status).json(error.message);
    }
  }

  @Get('/dialog')
  async getdialog(@Req() req: CustomRequest, @Res() res: Response) {
    try {
      const result = await this.service.getDiolog(req.user);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.status).json(error.message);
    }
  }
}

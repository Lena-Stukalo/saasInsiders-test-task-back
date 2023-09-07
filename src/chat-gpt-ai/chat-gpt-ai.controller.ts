import { Controller, Post, Body } from '@nestjs/common';
import { ChatGptAiService } from './chat-gpt-ai.service';
import { IQuestion } from 'src/types/qestion.type';

@Controller('chat-gpt-ai')
export class ChatGptAiController {
  constructor(private readonly service: ChatGptAiService) {}
  @Post('/question')
  getModelAnswer(@Body() data: IQuestion) {
    return this.service.getModeAnswer(data.question);
  }
}

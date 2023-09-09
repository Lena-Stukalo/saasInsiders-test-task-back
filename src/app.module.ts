import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGptAiModule } from './chat-gpt-ai/chat-gpt-ai.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middlewares/AuthMiddelwares';
import { AuthController } from './auth/auth.controller';
import { ChatGptAiController } from './chat-gpt-ai/chat-gpt-ai.controller';
import { validateBody } from './middlewares/VaidateBodyMiddlwarws';
import { questionSchema } from './schemas/quest.schema';
import { userSchemaLog, userSchemaReg } from './schemas/auth.schema';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [ChatGptAiModule, ConfigModule.forRoot(), AuthModule],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('auth/register', 'auth/login')
      .forRoutes(AuthController, ChatGptAiController);
    consumer
      .apply(validateBody(questionSchema))
      .forRoutes('chat-gpt-ai/question');
    consumer.apply(validateBody(userSchemaReg)).forRoutes('auth/register');
    consumer.apply(validateBody(userSchemaLog)).forRoutes('auth/login');
  }
}

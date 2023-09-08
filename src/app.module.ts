import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGptAiModule } from './chat-gpt-ai/chat-gpt-ai.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middlewares/AuthMiddelwares';
import { AuthController } from './auth/auth.controller';
import { ChatGptAiController } from './chat-gpt-ai/chat-gpt-ai.controller';

@Module({
  imports: [ChatGptAiModule, ConfigModule.forRoot(), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('auth/register', 'auth/login')
      .forRoutes(AuthController, ChatGptAiController);
  }
}

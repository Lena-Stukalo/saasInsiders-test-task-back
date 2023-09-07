import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import connectDB from './db/database';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  connectDB();
  await app.listen(3000);
}
bootstrap();

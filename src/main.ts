import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const PORT = process.env.NODE_ENV === 'production' ? 3001 : 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(cookieParser());
  await app.listen(PORT, () =>
    console.log(`${process.env.NODE_ENV} server running on port: ${PORT}`),
  );
}
bootstrap();

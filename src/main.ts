import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.NODE_ENV === 'production' ? 3001 : 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Financial App')
    .setDescription('Financial App API')
    .addTag('@shvetsm123')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  await app.listen(PORT, () =>
    console.log(`${process.env.NODE_ENV} server running on port: ${PORT}`),
  );
}
bootstrap();

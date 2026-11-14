import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { HttpExceptionFilter } from './filter/http-exception.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173', // 이 출처에서 오는 요청만 허용
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  });

  // DTO 검증: 정의되지 않은 값은 제거하고, 들어오면 400으로 막는다
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  // 실패 응답을 { isSuccess, code, message, result } 형식으로 통일
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();

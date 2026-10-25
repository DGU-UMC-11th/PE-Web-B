import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app/app.module.js';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe.js';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        instrument: ObserveInstrument,
    });
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true, //자동변환
        })
    )
    await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();

import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config'; //.env 알아먹게
import { databaseProviders } from './database.provider.js';

import { BookController } from './book.controller.js';
import { BookService } from './book.service.js';
import { BookRepository } from './book.repository.js';

import { RentalsController } from './rentals.controller.js';
import { RentalsService } from './rentals.service.js';
import { RentalsRepository } from './rentals.repository.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'study',
    }),

    ConfigModule.forRoot({
        isGlobal: true,
    })
  ],
  controllers: [
    AppController,

    BookController,
    RentalsController,
],
  providers: [
        ...databaseProviders, // db 커넥션 풀
        AppService,

        BookService,
        BookRepository,

        RentalsService,
        RentalsRepository,
    ],
    exports: [
        ...databaseProviders
    ]
})
export class AppModule {}

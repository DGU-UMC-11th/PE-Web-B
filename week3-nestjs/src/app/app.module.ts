//app.module.ts
import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import { databaseProviders } from '../database.provider.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, TagEntity, BookEntity, RentalEntity, BookTagEntity, BookLikeEntity, CategoryEntity, NotificationEntity } from "../entities.js";
import { BooksModule } from '../book/book.module.js';
import { RentalsMoudle } from '../rental/rental.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
    imports: [
        ObserveModule.forRoot({
            appKey: 'YOUR_APP_KEY',
            appSecret: 'YOUR_APP_SECRET',
            serviceId: 'study',
        }),

        ConfigModule.forRoot({
            isGlobal: true,
        }),

        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT!,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            autoLoadEntities: true,
            synchronize: false, //여기 배포할 땐 false로
            entities: [BookEntity, UserEntity, TagEntity, BookEntity, RentalEntity, BookTagEntity, BookLikeEntity, CategoryEntity, NotificationEntity],
            // autoLoadEntities: true,
        }),

        BooksModule,
        RentalsMoudle,
    ],
    controllers: [
        AppController,
    ],
    providers: [
        ...databaseProviders, // db 커넥션 풀
        AppService,
    ],
    exports: [
        ...databaseProviders
    ]
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
// import { AppController } from './app.controller.js';
// import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberController } from './controller/member.controller.js';
import { MemberService } from './service/member.service.js';
import { RatingEntity } from './entity/rating.entity.js';
import { MemberEntity } from './entity/member.entity.js';
import { RatingController } from './controller/rating.controller.js';
import { RatingService } from './service/rating.service.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
    imports: [
        // Distributed tracing, auto-correlated logs, request/job metrics, error
        // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
        ObserveModule.forRoot({
            appKey: 'YOUR_APP_KEY',
            appSecret: 'YOUR_APP_SECRET',
            serviceId: 'movie',
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
            // entities: [RatingEntity, MemberEntity],
            // autoLoadEntities: true,
        }),
        TypeOrmModule.forFeature([
            MemberEntity,
            RatingEntity,
        ])
    ],
    controllers: [
        // AppController,
        MemberController,
        RatingController,
    ],
    providers: [
        // AppService
        MemberService,
        RatingService,
    ],
})
export class AppModule {}

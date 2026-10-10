//rental.module.ts

import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BookEntity, RentalEntity, UserEntity } from '../entities.js';
import { CategoryEntity } from '../entities.js';
import { RentalController } from './rental.controller.js';
import { RentalService } from './rental.service.js';

@Module({
    imports: [TypeOrmModule.forFeature([BookEntity, CategoryEntity, RentalEntity, UserEntity])],
    controllers: [RentalController],
    providers: [RentalService],
})
export class RentalsMoudle {}
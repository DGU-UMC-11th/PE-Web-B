//book.module.ts

import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BookEntity } from '../entities.js';
import { CategoryEntity } from '../entities.js';
import { BookController } from './book.controller.js';
import { BookService } from './book.service.js';

@Module({
    imports: [TypeOrmModule.forFeature([BookEntity, CategoryEntity])],
    controllers: [BookController],
    providers: [BookService],
})
export class BooksModule {}
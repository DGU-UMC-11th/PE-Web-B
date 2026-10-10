//book.service.ts
import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { BookEntity, CategoryEntity } from '../entities.js';
import { InjectRepository } from '@nestjs/typeorm';
import { BookResponseDto } from './dto/book-response.dto.js';
import { Like, Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto.js';

@Injectable()
export class BookService {
    // 창고지기(BookRepository)를 주입받습니다.
    constructor(
        @InjectRepository(BookEntity)
        private readonly bookRepository: Repository<BookEntity>,

        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,
    ) {}

    async getAllBooks(): Promise<BookResponseDto[]> {
        const books = await this.bookRepository.find({
            relations: {
                category: true, //카테고리 테이블도 묶어서 가져오라
            },
            order: {
                bookId: 'DESC',
            },
            take: 100, //limit 100
        })

        return books.map(BookResponseDto.from);
    }

    async getBooksByKeyword(keyword: string): Promise<BookResponseDto[]> {
        const books = await this.bookRepository.find({
            relations: {
                category: true,
            },
            order: {
                bookId: 'DESC',
            },
            where: {
                title: Like(`%${keyword}%`),
            },
            take: 100,
        });
        return books.map(BookResponseDto.from);
    }
    
    async findBooksByCategoryID(categoryID: number): Promise<BookResponseDto[]> {
        const books = await this.bookRepository.find({
            relations: {
                category: true,
            },
            where: {
                categoryId: categoryID.toString(),
            },
            order: {
                bookId: 'DESC',
            },
            take: 100, //limit 100
        })

        return books.map(BookResponseDto.from)
    }

    
    async createBook(body: CreateBookDto) {
        body.title = body.title.trim();

        const isCategoryExists = await this.categoryRepository.existsBy({
            categoryId: body.categoryId.toString()
        });
        if(!isCategoryExists) {
            throw new NotFoundException("존재하지 않는 카테고리 번호");
        }

        const isBookTitleExists = (body.title.length !== 0);
        if(!isBookTitleExists) {
            throw new BadRequestException("없는 제목");
        }

        const isBookExists = await this.bookRepository.existsBy({
            title: body.title,
            // description: body.description, < 굳이 ?
            categoryId: body.categoryId.toString(),
        });
        if(isBookExists) {
            throw new ConflictException("이미 존재하는 책");
        }

        const book = this.bookRepository.create({
            title: body.title,
            description: body.description?.trim(),
            categoryId: body.categoryId.toString(),
        });
        return BookResponseDto.from(await this.bookRepository.save(book));
    }
}
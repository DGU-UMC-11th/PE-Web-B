// book.controller.ts
import { Controller, Get, Param, ParseIntPipe, Body, Post, Query } from '@nestjs/common';
import { BookService } from './book.service.js';
import { BookResponseDto } from './dto/book-response.dto.js';
import { CreateBookDto } from './dto/create-book.dto.js';

@Controller('books') // 이 컨트롤러로 들어오는 기본 주소: /books
export class BookController {
    // 주방장(BookService)을 주입받습니다.
    constructor(private readonly bookService: BookService) {}

    @Get()
    async getBooks(@Query('keyword') keyword?: string,): Promise<BookResponseDto[]> {
        if(keyword) {
            return await this.bookService.getBooksByKeyword(keyword);
        }
        return await this.bookService.getAllBooks();
    }
    
    @Get('category/:categoryID')
    async findBooksByCategoryID(@Param('categoryID', ParseIntPipe) categoryID: number): Promise<BookResponseDto[]> {
        return await this.bookService.findBooksByCategoryID(categoryID);
    }

    @Post()
    async createBook(@Body() body: CreateBookDto) {
        return await this.bookService.createBook(body);
    }
}
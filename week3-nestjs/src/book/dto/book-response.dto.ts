//book-response.dto.ts
import { BookEntity } from '../../entities.js';

export class BookResponseDto {
    bookId: number;
    title: string;
    description: string | null;
    categoryName: string;
    isAvailable: boolean;

    static from(book: BookEntity): BookResponseDto {
        return {
            bookId: +book.bookId,
            title: book.title,
            description: book.description,
            categoryName: book.category.name,
            isAvailable: book.isAvailable,
        };
    }
}
//rental.service.ts

import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity, RentalEntity, UserEntity } from '../entities.js';
import { DataSource, IsNull, Repository } from 'typeorm';
import { RentBookDto } from './dto/rental.dto.js';

@Injectable()
export class RentalService {
    constructor(
        // @InjectRepository(RentalEntity)
        // private readonly rentalRepository: Repository<RentalEntity>,

        @InjectRepository(BookEntity)
        private readonly bookRepository: Repository<BookEntity>,

        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,

        private readonly dataSource: DataSource,
    ) {}

    async rentBook(body: RentBookDto) {
        const isUserExists = await this.userRepository.existsBy({
            userId: body.userId.toString(),
        });
        if(!isUserExists) throw new NotFoundException("없는 유저");
        
        const isBookExists = await this.bookRepository.existsBy({
            bookId: body.bookId.toString(),
        });
        if(!isBookExists) throw new NotFoundException("없는 책");
        
        return await this.dataSource.transaction(async (manager) => {
            const book = await manager.findOne(
                BookEntity,
                {
                    where: {
                        bookId: body.bookId.toString(),
                        isAvailable: true,
                    },
                    lock: {
                        mode: "pessimistic_write"
                    }
                }
            );

            if(!book) throw new ConflictException("이미 대여된 도서");
            
            book.isAvailable = true;
            await manager.save(BookEntity, book);

            const dueDate = new Date();
            dueDate.setDate(dueDate.getDate() + 7); 

            const rent = manager.create(
                RentalEntity,
                {
                    userId: body.userId.toString(),
                    bookId: body.bookId.toString(),
                    dueAt: dueDate,
                    rentedAt: new Date(),
                }
            );
            return manager.save(rent);
        });
    }

    async returnBook(rentalID: number) {
        return await this.dataSource.transaction(async (manager) => {
            const rental = await manager.findOne(
                RentalEntity,
                {
                    where: {
                        rentalId: rentalID.toString(),
                        returnedAt: IsNull(),
                    },
                    lock: {
                        mode: "pessimistic_write"
                    }
                }
            );
            if(!rental) throw new NotFoundException("없는 대여");

            const rentedBook = await manager.findOne(
                BookEntity,
                {
                    where: {
                        bookId: rental.bookId,
                    },
                    lock: {
                        mode: "pessimistic_write"
                    }
                }
            );

            if(!rentedBook) throw new ConflictException("이미 반납함");

            rentedBook.isAvailable = true;
            await manager.save(BookEntity, rentedBook);

            return await manager.update(
                RentalEntity,
                {
                    rentalId: rentalID.toString(),
                },
                {
                    returnedAt: new Date(),
                }
            );
        });
    }
}
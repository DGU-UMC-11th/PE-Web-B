//rental.service.ts

import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity, RentalEntity, UserEntity } from '../entities.js';
import { DataSource, Repository } from 'typeorm';
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
            const isBookRentable = await manager.existsBy(
                BookEntity,
                {
                    bookId: body.bookId.toString(),
                    isAvailable: true,
                }
            );
            if(!isBookRentable) throw new ConflictException("이미 대여된 도서");
            
            await manager.update(
               BookEntity,
               {
                    bookId: body.bookId.toString(),
               },
               {
                    isAvailable: false,
               }
            );

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
                    }
                }
            );
            if(!rental) throw new NotFoundException("없는 대여");
    
            if(rental.returnedAt) throw new ConflictException("이미 반납함");
            
            await manager.update(
               BookEntity,
               {
                    bookId: rental.bookId,
               },
               {
                    isAvailable: true,
               }
            );

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
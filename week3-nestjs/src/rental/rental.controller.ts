// rental.controller.ts
import { Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { RentalService } from './rental.service.js';
import { Body, Post } from '@nestjs/common';
import { RentBookDto } from './dto/rental.dto.js';

@Controller('rentals')
export class RentalController {
    constructor(private readonly rentalsService: RentalService) {}

    @Post()
    async rentBook(@Body() body: RentBookDto) {
        return await this.rentalsService.rentBook(body);
    }

    @Patch(':rentalID/return')
    async returnBook(@Param('rentalID', ParseIntPipe) rentalID:number) {
        return await this.rentalsService.returnBook(rentalID);
    }
}
// src/book.controller.ts
import { Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { RentalsService } from './rentals.service.js';
import { Body, Post } from '@nestjs/common';

@Controller('rentals')
export class RentalsController {
    constructor(private readonly rentalsService: RentalsService) {}

    @Post()
    async rentBook(@Body() body: Record<string, any>): Promise<string> {
        return await this.rentalsService.rentBook(body);
    }

    @Patch(':rentalID/return')
    async returnBook(@Param('rentalID', ParseIntPipe) rentalID:number): Promise<string> {
        return await this.rentalsService.returnBook(rentalID);
    }
}
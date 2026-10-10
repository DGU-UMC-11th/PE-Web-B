// src/rental.controller.ts
import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { RentalService } from './rental.service';

@Controller('rentals')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  //Body: { "userId": 1, "bookId": 3 }
  @Post()
  async createRental(@Body() body: Record<string, any>): Promise<string> {
    return await this.rentalService.createRental(body.userId, body.bookId);
  }

  @Patch(':rentalId/return')
  async returnRental(
    @Param('rentalId', ParseIntPipe) rentalId: number,
  ): Promise<string> {
    return await this.rentalService.returnRental(rentalId);
  }
}

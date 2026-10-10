// src/rental.service.ts
import { Injectable } from '@nestjs/common';
import { RentalRepository } from './rental.repository';

@Injectable()
export class RentalService {
  constructor(private readonly rentalRepository: RentalRepository) {}

  async createRental(userId: number, bookId: number): Promise<string> {
    const result = await this.rentalRepository.create(userId, bookId);
    return `대여 완료 (rental_id: ${result.insertId})`;
  }

  async returnRental(rentalId: number): Promise<string> {
    await this.rentalRepository.updateReturnedAt(rentalId);
    return `반납 처리 완료 (rental_id: ${rentalId})`;
  }
}

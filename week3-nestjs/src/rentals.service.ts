// src/book.service.ts
import { Injectable } from '@nestjs/common';
import { RentalsRepository } from './rentals.repository.js';

@Injectable()
export class RentalsService {
  constructor(private readonly rentalsRepository: RentalsRepository) {}

  async rentBook(body: Record<string, any>): Promise<string> {
    await this.rentalsRepository.rentBook(body);
    return '정상적으로 대여했습니다.'
  }

  async returnBook(rentalID: number): Promise<string> {
    await this.rentalsRepository.returnBook(rentalID);
    return '정상적으로 반납했습니다.'
  }
}
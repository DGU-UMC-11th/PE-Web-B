import { Injectable, Inject } from '@nestjs/common';
import type { Pool } from 'mysql2/promise';
import { DATABASE_CONNECTION } from './database.provider.js';

@Injectable()
export class RentalsRepository {
  constructor(
    @Inject(DATABASE_CONNECTION) private readonly pool: Pool,
  ) {}

  async rentBook(body: Record<string, any>): Promise<any> {
    const sql = 'INSERT INTO rental (user_id, book_id, rented_at, due_at) VALUES (?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY))';

    const [result] = await this.pool.execute(sql, [
        body.userId,
        body.bookId,
    ]);
    return result;
  }

  async returnBook(rentalID: number): Promise<any> {
    const sql = 'UPDATE rental SET returned_at = NOW() WHERE rental_id = ?';

    const [result] = await this.pool.execute(sql, [
        rentalID
    ]);

    return result;
  }
}
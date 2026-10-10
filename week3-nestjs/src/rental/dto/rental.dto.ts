//rental.dto.ts

import { Type } from 'class-transformer';
import {
    IsInt,
} from 'class-validator';

export class RentBookDto {
    @IsInt()
    @Type(() => Number)
    userId: number;

    @IsInt()
    @Type(() => Number)
    bookId: number;
}

// export class ReturnBookDto {
//     @IsInt()
//     @Type(() => Number)
//     rentalId: number;
// }
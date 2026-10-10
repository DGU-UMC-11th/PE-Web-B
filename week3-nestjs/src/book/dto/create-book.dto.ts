//create-book.dto.ts
import { Transform, Type } from 'class-transformer';
import {
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
} from 'class-validator';

export class CreateBookDto {
    @IsInt()
    @Type(() => Number)
    categoryId: number;

    @IsNotEmpty()
    @MaxLength(100)
    @IsString()
    @Transform(({value}) => (typeof value === "string" ? value.trim() : value))
    title: string;

    @IsOptional()
    @IsString()
    description?: string;
}
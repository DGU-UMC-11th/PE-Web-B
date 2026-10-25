//page-context.tsx
import { movies } from "../data/movies";

export const PAGE_SIZE = 5;
export const initialPage: number = 1;
export const possiblePages: number[] = Array.from(
    { length: Math.ceil(movies.length / PAGE_SIZE) },
    (_, i) => i + 1, //(현재 값, index) => 값
);
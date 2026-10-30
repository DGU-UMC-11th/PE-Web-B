// src/dto/rating-response.dto.ts
import { RatingEntity } from "../entity/rating.entity.js";

export class RatingResponseDto {
  ratingId: number;
  movieId: number;
  score: number;
  comment: string | null;
  createdAt: Date;
  updatedAt: Date;

  static from(rating: RatingEntity): RatingResponseDto {
    return {
      ratingId: rating.ratingId,
      movieId: rating.movieId,
      score: rating.score,
      comment: rating.comment,
      createdAt: rating.createdAt,
      updatedAt: rating.updatedAt,
    };
  }
}
// 서버의 RatingResponse예요.
export interface Rating {
    ratingId: number;
    movieId: number;
    score: number;
    comment: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface RatingBody {
    score: number;
    comment: string;
}

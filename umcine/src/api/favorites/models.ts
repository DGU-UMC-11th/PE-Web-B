// 서버의 FavoriteResponse예요. (서버 필드명이 createdAt이 아니라 createAt이에요)
export interface Favorite {
    favoriteId: number;
    movieId: number;
    createAt: string;
}

export interface FavoriteStatus {
    isFavorite: boolean;
}

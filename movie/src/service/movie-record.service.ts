import { HttpStatus, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { CreateMovieRecordDto } from "../dto/create-movie-record.dto.js";
import { FavoriteResponseDto } from "../dto/favorite-response.dto.js";
import { RatingResponseDto } from "../dto/rating-response.dto.js";
import { FavoriteEntity } from "../entity/favorite.entity.js";
import { MemberEntity } from "../entity/member.entity.js";
import { RatingEntity } from "../entity/rating.entity.js";
import { ApiException } from "../exception/api.exception.js";

@Injectable()
export class MovieRecordService {
    constructor(private readonly dataSource: DataSource) {}

    async create(memberId: number, dto: CreateMovieRecordDto) {
        // 콜백이 정상 종료되면 commit, 예외가 나면 rollback
        return this.dataSource.transaction(async (manager) => {
            // 콜백 안에서는 manager가 만든 Repository만 사용 (같은 트랜잭션 연결 보장)
            const memberRepository = manager.getRepository(MemberEntity);
            const ratingRepository = manager.getRepository(RatingEntity);
            const favoriteRepository = manager.getRepository(FavoriteEntity);

            const member = await memberRepository.findOneBy({ memberId });
            if (!member) {
                throw new ApiException(HttpStatus.NOT_FOUND, "MEMBER404_1", "해당 회원을 찾을 수 없습니다.");
            }
            if (await ratingRepository.exists({ where: { member: { memberId }, movieId: dto.movieId } })) {
                throw new ApiException(HttpStatus.CONFLICT, "RATING409_1", "이미 이 영화에 평점을 남기셨습니다.");
            }
            if (dto.addToFavorites
                && await favoriteRepository.exists({ where: { member: { memberId }, movieId: dto.movieId } })) {
                throw new ApiException(HttpStatus.CONFLICT, "FAVORITE409_1", "이미 이 영화를 즐겨찾기하셨습니다.");
            }

            const savedRating = await ratingRepository.save(
                ratingRepository.create({ member, movieId: dto.movieId, score: dto.score, comment: dto.comment ?? null }),
            );

            const savedFavorite = dto.addToFavorites
                ? await favoriteRepository.save(favoriteRepository.create({ member, movieId: dto.movieId }))
                : null;

            return {
                rating: RatingResponseDto.from(savedRating),
                favorite: savedFavorite && FavoriteResponseDto.from(savedFavorite),
            };
        });
    }
}

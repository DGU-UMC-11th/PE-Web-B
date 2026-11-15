// src/service/rating.service.ts
import { HttpStatus, Injectable } from "@nestjs/common";
import { CreateRatingDto } from "../dto/create-rating.dto.js";
import { UpdateRatingDto } from "../dto/update-rating.dto.js";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RatingEntity } from "../entity/rating.entity.js";
import { MemberEntity } from "../entity/member.entity.js";
import { RatingResponseDto } from "../dto/rating-response.dto.js";
import { ApiException } from "../exception/api.exception.js";

@Injectable()
export class RatingService {
    constructor(
        @InjectRepository(RatingEntity)
        private readonly ratingRepository: Repository<RatingEntity>,
        @InjectRepository(MemberEntity)
        private readonly memberRepository: Repository<MemberEntity>,
    ) {}

    async getRatingsByMember(memberId: number, page: number, size: number): Promise<RatingResponseDto[]> {
        const member = await this.memberRepository.findOneBy({ memberId });
        if (!member) {
            throw new ApiException(HttpStatus.NOT_FOUND, "MEMBER404_1", "해당 회원을 찾을 수 없습니다.");
        }

        page = Math.max(page, 0); //기본값 설정. 0, 1
        size = Math.min(Math.max(size, 1),100); //최대 100개 조회

        const ratings = await this.ratingRepository.find({
            where: { member: { memberId } },
            order: { ratingId: "DESC" },
            skip: page * size, 
            take: size,
        });

        return ratings.map(RatingResponseDto.from);
    }

    async create(memberId: number, dto: CreateRatingDto): Promise<RatingResponseDto> {
        const member = await this.memberRepository.findOneBy({ memberId });
        if (!member) {
            throw new ApiException(HttpStatus.NOT_FOUND, "MEMBER404_1", "해당 회원을 찾을 수 없습니다.");
        }

        // DB 복합 UNIQUE가 최종 방어선, 여기서는 친절한 메시지용 사전 확인
        if (await this.ratingRepository.exists({ where: { member: { memberId }, movieId: dto.movieId } })) {
            throw new ApiException(HttpStatus.CONFLICT, "RATING409_1", "이미 이 영화에 평점을 남기셨습니다.");
        }

        const saved = await this.ratingRepository.save(
            this.ratingRepository.create({
                member,
                movieId: dto.movieId,
                score: dto.score,
                comment: dto.comment ?? null,
            }),
        );
        return RatingResponseDto.from(saved);
    }

    async update(memberId: number, ratingId: number, dto: UpdateRatingDto): Promise<RatingResponseDto> {
        const rating = await this.findOwnedRating(memberId, ratingId);
        rating.score = dto.score;
        rating.comment = dto.comment ?? null;
        return RatingResponseDto.from(await this.ratingRepository.save(rating));
    }

    async delete(memberId: number, ratingId: number): Promise<void> {
        await this.ratingRepository.remove(await this.findOwnedRating(memberId, ratingId));
    }

    private async findOwnedRating(memberId: number, ratingId: number): Promise<RatingEntity> {
        const rating = await this.ratingRepository.findOne({ where: { ratingId }, relations: { member: true } });
        if (!rating) {
            throw new ApiException(HttpStatus.NOT_FOUND, "RATING404_1", "해당 평점을 찾을 수 없습니다.");
        }
        if (rating.member.memberId !== memberId) {
            throw new ApiException(HttpStatus.FORBIDDEN, "RATING403_1", "본인이 작성한 평점만 수정하거나 삭제할 수 있습니다.");
        }
        return rating;
    }
}
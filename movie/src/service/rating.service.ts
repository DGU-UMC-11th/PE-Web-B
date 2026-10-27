// src/service/rating.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RatingEntity } from "../entity/rating.entity.js";
import { MemberEntity } from "../entity/member.entity.js";
import { RatingResponseDto } from "../dto/rating-response.dto.js";

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
        throw new NotFoundException("존재하지 않는 유저입니다.");
        }

        page = Math.max(page, 0); //기본값 설정. 0, 1
        size = Math.max(size, 1);

        const ratings = await this.ratingRepository.find({
            where: { member: { memberId } },
            order: { ratingId: "DESC" },
            skip: page * size, 
            take: size,
        });

        return ratings.map(RatingResponseDto.from);
    }
}
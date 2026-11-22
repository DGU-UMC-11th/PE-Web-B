import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateFavoriteDto } from "../dto/create-favorite.dto.js";
import { FavoriteResponseDto } from "../dto/favorite-response.dto.js";
import { FavoriteEntity } from "../entity/favorite.entity.js";
import { MemberEntity } from "../entity/member.entity.js";
import { ApiException } from "../exception/api.exception.js";

@Injectable()
export class FavoriteService {
    constructor(
        @InjectRepository(FavoriteEntity)
        private readonly favoriteRepository: Repository<FavoriteEntity>,
        @InjectRepository(MemberEntity)
        private readonly memberRepository: Repository<MemberEntity>,
    ) {}

    async create(memberId: number, dto: CreateFavoriteDto): Promise<FavoriteResponseDto> {
        const member = await this.memberRepository.findOneBy({ memberId });
        if (!member) {
            throw new ApiException(HttpStatus.NOT_FOUND, "MEMBER404_1", "해당 회원을 찾을 수 없습니다.");
        }

        // 친절한 메시지용 사전 검사. 동시 요청은 DB UNIQUE가 최종 방어
        if (await this.favoriteRepository.exists({ where: { member: { memberId }, movieId: dto.movieId } })) {
            throw new ApiException(HttpStatus.CONFLICT, "FAVORITE409_1", "이미 이 영화를 즐겨찾기하셨습니다.");
        }

        const saved = await this.favoriteRepository.save(
            this.favoriteRepository.create({ member, movieId: dto.movieId }),
        );
        return FavoriteResponseDto.from(saved);
    }

    async getMyFavorites(memberId: number): Promise<FavoriteResponseDto[]> {
        const favorites = await this.favoriteRepository.find({
            where: { member: { memberId } },
            order: { favoriteId: "DESC" },
        });
        return favorites.map(FavoriteResponseDto.from);
    }

    async getStatus(memberId: number, movieId: number): Promise<{ isFavorite: boolean }> {
        return { isFavorite: await this.favoriteRepository.exists({ where: { member: { memberId }, movieId } }) };
    }

    async delete(memberId: number, movieId: number): Promise<void> {
        const favorite = await this.favoriteRepository.findOne({ where: { member: { memberId }, movieId } });
        if (!favorite) {
            throw new ApiException(HttpStatus.NOT_FOUND, "FAVORITE404_1", "즐겨찾기한 영화를 찾을 수 없습니다.");
        }
        await this.favoriteRepository.remove(favorite);
    }
}

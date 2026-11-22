// src/controller/rating.controller.ts
import {
    Body, Controller, DefaultValuePipe, Delete, Get, HttpCode, HttpStatus,
    Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards,
} from "@nestjs/common";
import type { Request } from "express";
import { CreateRatingDto } from "../dto/create-rating.dto.js";
import { UpdateRatingDto } from "../dto/update-rating.dto.js";
import { RatingService } from "../service/rating.service.js";
import { AuthGuard } from "../guard/auth.guard.js";

type AuthRequest = Request & { memberId?: number };

// @Controller("members") → @Controller(): 이제 /ratings 로도 나가야 하므로 접두사를 비웁니다
@Controller()
export class RatingController {
    constructor(private readonly ratingService: RatingService) {}

    // 공개 API라 AuthGuard 없음
    @Get("members/:memberId/ratings")
    getMemberRatings(
        @Param("memberId", ParseIntPipe) memberId: number,
        @Query("page", new DefaultValuePipe(0), ParseIntPipe) page: number,
        @Query("size", new DefaultValuePipe(10), ParseIntPipe) size: number,
    ) {
        return this.ratingService.getRatingsByMember(memberId, page, size);
    }

    // memberId는 URL이 아니라 Guard가 토큰에서 꺼내 담아둔 값을 씁니다
    @Post("ratings")
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.CREATED)
    async create(@Req() request: AuthRequest, @Body() dto: CreateRatingDto) {
        const result = await this.ratingService.create(request.memberId as number, dto);
        return { isSuccess: true, code: "COMMON201", message: "평점을 등록했습니다.", result };
    }

    @Patch("ratings/:ratingId")
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    async update(
        @Req() request: AuthRequest,
        @Param("ratingId", ParseIntPipe) ratingId: number,
        @Body() dto: UpdateRatingDto,
    ) {
        const result = await this.ratingService.update(request.memberId as number, ratingId, dto);
        return { isSuccess: true, code: "COMMON200", message: "평점을 수정했습니다.", result };
    }

    // 응답 바디가 있으므로 NO_CONTENT 대신 200
    @Delete("ratings/:ratingId")
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    async delete(@Req() request: AuthRequest, @Param("ratingId", ParseIntPipe) ratingId: number) {
        await this.ratingService.delete(request.memberId as number, ratingId);
        return { isSuccess: true, code: "COMMON200", message: "평점을 삭제했습니다.", result: null };
    }
}

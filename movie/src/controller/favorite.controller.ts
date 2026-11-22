import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Req, UseGuards } from "@nestjs/common";
import type { Request } from "express";
import { CreateFavoriteDto } from "../dto/create-favorite.dto.js";
import { AuthGuard } from "../guard/auth.guard.js";
import { FavoriteService } from "../service/favorite.service.js";

type AuthRequest = Request & { memberId?: number };

@Controller("favorites")
@UseGuards(AuthGuard)
export class FavoriteController {
    constructor(private readonly favoriteService: FavoriteService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Req() request: AuthRequest, @Body() dto: CreateFavoriteDto) {
        const result = await this.favoriteService.create(request.memberId as number, dto);
        return { isSuccess: true, code: "COMMON201", message: "즐겨찾기를 등록했습니다.", result };
    }

    @Get()
    async getMyFavorites(@Req() request: AuthRequest) {
        const result = await this.favoriteService.getMyFavorites(request.memberId as number);
        return { isSuccess: true, code: "COMMON200", message: "내 즐겨찾기 목록을 조회했습니다.", result };
    }

    @Get(":movieId")
    async getStatus(@Req() request: AuthRequest, @Param("movieId", ParseIntPipe) movieId: number) {
        const result = await this.favoriteService.getStatus(request.memberId as number, movieId);
        return { isSuccess: true, code: "COMMON200", message: "즐겨찾기 여부를 조회했습니다.", result };
    }

    @Delete(":movieId")
    async delete(@Req() request: AuthRequest, @Param("movieId", ParseIntPipe) movieId: number) {
        await this.favoriteService.delete(request.memberId as number, movieId);
        return { isSuccess: true, code: "COMMON200", message: "즐겨찾기를 해제했습니다.", result: null };
    }
}

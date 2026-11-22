import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import type { Request } from "express";
import { CreateMovieRecordDto } from "../dto/create-movie-record.dto.js";
import { AuthGuard } from "../guard/auth.guard.js";
import { MovieRecordService } from "../service/movie-record.service.js";

type AuthRequest = Request & { memberId?: number };

@Controller("movie-records")
@UseGuards(AuthGuard)
export class MovieRecordController {
    constructor(private readonly movieRecordService: MovieRecordService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Req() request: AuthRequest, @Body() dto: CreateMovieRecordDto) {
        const result = await this.movieRecordService.create(request.memberId as number, dto);
        return { isSuccess: true, code: "COMMON201", message: "영화 기록을 저장했습니다.", result };
    }
}

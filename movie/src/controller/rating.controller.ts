// src/controller/rating.controller.ts
import { Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { RatingService } from "../service/rating.service.js";

@Controller("members")
export class RatingController {
    constructor(private readonly ratingService: RatingService) {}

    @Get(":memberId/ratings")
    getMemberRatings(
        @Param("memberId", ParseIntPipe) memberId: number, 
        @Query("page", new DefaultValuePipe(0), ParseIntPipe) page: number,
        @Query("size", new DefaultValuePipe(10), ParseIntPipe) size: number,
    ) {
        return this.ratingService.getRatingsByMember(memberId, page, size);
    }
}
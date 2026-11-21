package com.umc.movie.dto;

// password는 절대 응답에 넣지 않는다
public record MemberResponse(
        Long memberId,
        String email,
        String nickname
) {}

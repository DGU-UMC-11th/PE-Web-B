package com.umc.movie.service;

import com.umc.movie.dto.RatingResponse;
import com.umc.movie.repository.MemberRepository;
import com.umc.movie.repository.RatingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RatingService {

    private final RatingRepository ratingResponse;
    private final MemberRepository memberRepository;

    @Transactional(readOnly = true)
    public List<RatingResponse> getRatingByMember(Long memberId, long page, long size) {
        if(!memberRepository.existsById(memberId)) {
            // 아직 안함
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "존재하지 않는 유저입니다.");
        }
        return ratingResponse.findByMember_MemberIdOrderByRatingIdDesc(memberId)
                .stream()
                .skip(page * size)
                .limit(size)
                .map(RatingResponse::from)
                .toList();
    }
}

package com.umc.movie.repository;

import com.umc.movie.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, Long> {
    List<Rating> findByMember_MemberIdOrderByRatingIdDesc(Long memberId);

    // rating.member.memberId 와 movieId 조합으로 중복 평점 확인
    boolean existsByMember_MemberIdAndMovieId(Long memberId, Long movieId);
}

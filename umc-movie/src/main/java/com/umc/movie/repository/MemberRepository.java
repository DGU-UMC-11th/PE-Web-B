package com.umc.movie.repository;

import com.umc.movie.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    boolean existsByNickname(String nickname);
    boolean existsByEmail(String email);

    // 7주차: 로그인 때 회원 자체를 꺼내옴
    Optional<Member> findByEmail(String email);

    // 7주차: 나를 뺀 다른 회원이 이 닉네임을 쓰는지
    boolean existsByNicknameAndMemberIdNot(String nickname, Long memberId);
}

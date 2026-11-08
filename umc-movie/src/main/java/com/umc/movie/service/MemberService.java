package com.umc.movie.service;

import com.umc.movie.dto.EmailCheckResponse;
import com.umc.movie.dto.MemberResponse;
import com.umc.movie.dto.NicknameCheckResponse;
import com.umc.movie.dto.SignUpRequest;
import com.umc.movie.entity.Member;
import com.umc.movie.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public NicknameCheckResponse checkNickname(String nickname) {
        return new NicknameCheckResponse(!memberRepository.existsByNickname(nickname));
    }

    @Transactional(readOnly = true)
    public EmailCheckResponse checkEmail(String email) {
        return new EmailCheckResponse(!memberRepository.existsByEmail(email));
    }

    @Transactional
    public MemberResponse signUp(SignUpRequest request) {
        // 1차 방어: 친절한 메시지를 주기 위한 사전 중복 체크
        if (memberRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }
        if (memberRepository.existsByNickname(request.nickname())) {
            throw new IllegalArgumentException("이미 사용 중인 닉네임입니다.");
        }

        Member member = Member.builder()
                .email(request.email())
                .password(passwordEncoder.encode(request.password())) // 평문 대신 bcrypt 해시 저장
                .nickname(request.nickname())
                .build();

        // 2차 방어: 동시에 들어온 요청은 DB UNIQUE 제약이 막고, GlobalExceptionHandler가 409로 바꾼다
        Member savedMember = memberRepository.save(member);
        return new MemberResponse(savedMember.getMemberId(), savedMember.getEmail(), savedMember.getNickname());
    }
}

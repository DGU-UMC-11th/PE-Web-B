package com.umc.movie.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @NotBlank(message = "이메일을 입력해주세요.")
        @Email(message = "이메일 형식이 올바르지 않습니다.")
        String email,

        // 로그인에서는 비밀번호 규칙까지는 검사 안 함 (규칙 바뀌기 전 가입자도 로그인해야 하니까)
        @NotBlank(message = "비밀번호를 입력해주세요.")
        String password
) {}

package com.umc.movie;

import com.umc.movie.entity.Member;
import com.umc.movie.repository.MemberRepository;
import com.umc.movie.repository.RatingRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.nullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class Week6ApiTest {

    @Autowired MockMvc mvc;
    @Autowired MemberRepository memberRepository;
    @Autowired RatingRepository ratingRepository;

    @BeforeEach
    void clean() {
        ratingRepository.deleteAll();
        memberRepository.deleteAll();
    }

    private long signUp(String email, String nickname) throws Exception {
        mvc.perform(post("/members").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"%s\",\"password\":\"Umc!1234\",\"nickname\":\"%s\"}".formatted(email, nickname)))
                .andExpect(status().isCreated());
        return memberRepository.findAll().stream().filter(m -> m.getEmail().equals(email)).findFirst().orElseThrow().getMemberId();
    }

    @Test
    void signUp_success_hidesPassword_andHashes() throws Exception {
        mvc.perform(post("/members").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"umc@example.com\",\"password\":\"Umc!1234\",\"nickname\":\"moviefan\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.isSuccess").value(true))
                .andExpect(jsonPath("$.code").value("COMMON201"))
                .andExpect(jsonPath("$.result.email").value("umc@example.com"))
                .andExpect(jsonPath("$.result.password").doesNotExist());

        Member saved = memberRepository.findAll().get(0);
        assertThat(saved.getPassword()).startsWith("$2a$").hasSize(60);
    }

    @Test
    void signUp_failures() throws Exception {
        signUp("umc@example.com", "moviefan");
        mvc.perform(post("/members").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"umc@example.com\",\"password\":\"Umc!1234\",\"nickname\":\"other\"}"))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.isSuccess").value(false))
                .andExpect(jsonPath("$.message").value("이미 사용 중인 이메일입니다."))
                .andExpect(jsonPath("$.result").value(nullValue()));
        mvc.perform(post("/members").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"not-email\",\"password\":\"Umc!1234\",\"nickname\":\"abc\"}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("COMMON4001"));
        mvc.perform(post("/members").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"a@b.com\",\"password\":\"weakpass\",\"nickname\":\"abc\"}"))
                .andExpect(status().isBadRequest());
    }
}

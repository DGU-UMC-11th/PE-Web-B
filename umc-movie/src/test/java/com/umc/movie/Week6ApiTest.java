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

    @Test
    void rating_crud_and_failures() throws Exception {
        long me = signUp("me@umc.com", "me");
        long other = signUp("other@umc.com", "other");

        mvc.perform(post("/members/" + me + "/ratings").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"movieId\":550,\"score\":5,\"comment\":\"good\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.result").isNumber());
        long ratingId = ratingRepository.findAll().get(0).getRatingId();

        // 중복 평점 409
        mvc.perform(post("/members/" + me + "/ratings").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"movieId\":550,\"score\":4}"))
                .andExpect(status().isConflict());
        assertThat(ratingRepository.count()).isEqualTo(1);

        // 별점 범위 400
        mvc.perform(post("/members/" + me + "/ratings").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"movieId\":155,\"score\":6}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("별점은 5점 이하여야 합니다."));

        // 수정 200
        mvc.perform(patch("/members/" + me + "/ratings/" + ratingId).contentType(MediaType.APPLICATION_JSON)
                        .content("{\"score\":3,\"comment\":\"changed\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value("COMMON200"));
        mvc.perform(get("/members/" + me + "/ratings"))
                .andExpect(jsonPath("$[0].score").value(3))
                .andExpect(jsonPath("$[0].comment").value("changed"));

        // 남의 평점 403, 없는 평점 404
        mvc.perform(patch("/members/" + other + "/ratings/" + ratingId).contentType(MediaType.APPLICATION_JSON)
                        .content("{\"score\":1}"))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.code").value("COMMON403"));
        mvc.perform(delete("/members/" + me + "/ratings/999999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value("COMMON404"));

        // 삭제 204
        mvc.perform(delete("/members/" + me + "/ratings/" + ratingId))
                .andExpect(status().isNoContent());
        assertThat(ratingRepository.count()).isZero();
    }
}

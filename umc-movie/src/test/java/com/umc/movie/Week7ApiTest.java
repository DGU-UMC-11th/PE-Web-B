package com.umc.movie;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.umc.movie.repository.MemberRepository;
import com.umc.movie.repository.RatingRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.nullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class Week7ApiTest {

    static final String SECRET = "umc-11th-movie-rating-secret-key-please-change-me";

    @Autowired MockMvc mvc;
    @Autowired ObjectMapper objectMapper;
    @Autowired MemberRepository memberRepository;
    @Autowired RatingRepository ratingRepository;

    @BeforeEach
    void clean() {
        ratingRepository.deleteAll();
        memberRepository.deleteAll();
    }

    private void signUp(String email, String nickname) throws Exception {
        mvc.perform(post("/members").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"%s\",\"password\":\"Umc!1234\",\"nickname\":\"%s\"}".formatted(email, nickname)))
                .andExpect(status().isCreated());
    }

    private String login(String email) throws Exception {
        String body = mvc.perform(post("/auth/login").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"%s\",\"password\":\"Umc!1234\"}".formatted(email)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value("COMMON200"))
                .andExpect(jsonPath("$.result.accessToken").isString())
                .andReturn().getResponse().getContentAsString();
        return "Bearer " + objectMapper.readTree(body).at("/result/accessToken").asText();
    }

    @Test
    void login_success_and_sameFailureForWrongEmailOrPassword() throws Exception {
        signUp("a@umc.com", "영화광");
        String token = login("a@umc.com");
        assertThat(token.split("\\.")).hasSize(3);

        mvc.perform(post("/auth/login").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"a@umc.com\",\"password\":\"Wrong!123\"}"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.code").value("AUTH401_1"));
        mvc.perform(post("/auth/login").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"nobody@umc.com\",\"password\":\"Umc!1234\"}"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.code").value("AUTH401_1"))
                .andExpect(jsonPath("$.message").value("이메일 또는 비밀번호가 올바르지 않습니다."));
    }

    @Test
    void me_get_and_update() throws Exception {
        signUp("a@umc.com", "영화광");
        signUp("b@umc.com", "팝콘");
        String tokenA = login("a@umc.com");

        mvc.perform(get("/members/me"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.code").value("AUTH401_2"));

        mvc.perform(get("/members/me").header("Authorization", tokenA))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.email").value("a@umc.com"))
                .andExpect(jsonPath("$.result.nickname").value("영화광"))
                .andExpect(jsonPath("$.result.createdAt").exists())
                .andExpect(jsonPath("$.result.password").doesNotExist());

        // payload 한 글자 바꾸기 → 서명 불일치
        String raw = tokenA.substring(7);
        String[] parts = raw.split("\\.");
        char c = parts[1].charAt(5);
        parts[1] = parts[1].substring(0, 5) + (c == 'A' ? 'B' : 'A') + parts[1].substring(6);
        mvc.perform(get("/members/me").header("Authorization", "Bearer " + String.join(".", parts)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.code").value("AUTH401_3"));

        // 내 닉네임 그대로는 OK, 남의 닉네임은 409
        mvc.perform(patch("/members/me").header("Authorization", tokenA).contentType(MediaType.APPLICATION_JSON)
                        .content("{\"nickname\":\"영화광\"}"))
                .andExpect(status().isOk());
        mvc.perform(patch("/members/me").header("Authorization", tokenA).contentType(MediaType.APPLICATION_JSON)
                        .content("{\"nickname\":\"팝콘\"}"))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("MEMBER409_1"));
        mvc.perform(patch("/members/me").header("Authorization", tokenA).contentType(MediaType.APPLICATION_JSON)
                        .content("{\"nickname\":\"새닉네임\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.nickname").value("새닉네임"));
    }

    @Test
    void expiredToken_returnsAuth401_4() throws Exception {
        String expired = Jwts.builder()
                .subject("1")
                .expiration(new Date(System.currentTimeMillis() - 120_000)) // clockSkew 60초보다 더 과거
                .signWith(Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8)))
                .compact();
        mvc.perform(get("/members/me").header("Authorization", "Bearer " + expired))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.code").value("AUTH401_4"));
    }

    @Test
    void postmanScenario_9steps() throws Exception {
        // 1~2. 두 명 가입 + 로그인
        signUp("a@umc.com", "aaa");
        signUp("b@umc.com", "bbb");
        String tokenA = login("a@umc.com");
        String tokenB = login("b@umc.com");

        // 3. 등록 201 (바디에 memberId 없음)
        String body = mvc.perform(post("/ratings").header("Authorization", tokenA).contentType(MediaType.APPLICATION_JSON)
                        .content("{\"movieId\":550,\"score\":5,\"comment\":\"good\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.code").value("COMMON201"))
                .andExpect(jsonPath("$.result.ratingId").isNumber())
                .andReturn().getResponse().getContentAsString();
        long ratingId = objectMapper.readTree(body).at("/result/ratingId").asLong();

        // 4. 중복 409
        mvc.perform(post("/ratings").header("Authorization", tokenA).contentType(MediaType.APPLICATION_JSON)
                        .content("{\"movieId\":550,\"score\":4}"))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("RATING409_1"));

        // 5. 본인 수정 200
        mvc.perform(patch("/ratings/" + ratingId).header("Authorization", tokenA).contentType(MediaType.APPLICATION_JSON)
                        .content("{\"score\":3,\"comment\":\"changed\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.score").value(3));

        // 6. 남의 것 403
        mvc.perform(patch("/ratings/" + ratingId).header("Authorization", tokenB).contentType(MediaType.APPLICATION_JSON)
                        .content("{\"score\":1}"))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.code").value("RATING403_1"));

        // 7. 토큰 없이 401
        mvc.perform(patch("/ratings/" + ratingId).contentType(MediaType.APPLICATION_JSON)
                        .content("{\"score\":1}"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.code").value("AUTH401_2"));

        // 8. 없는 평점 404
        mvc.perform(delete("/ratings/99999").header("Authorization", tokenA))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value("RATING404_1"));

        // 공개 조회는 토큰 없이 됨
        long memberA = memberRepository.findByEmail("a@umc.com").orElseThrow().getMemberId();
        mvc.perform(get("/members/" + memberA + "/ratings"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].comment").value("changed"));

        // 9. 본인 삭제 200
        mvc.perform(delete("/ratings/" + ratingId).header("Authorization", tokenA))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value("COMMON200"))
                .andExpect(jsonPath("$.result").value(nullValue()));
        assertThat(ratingRepository.count()).isZero();
    }

    @Test
    void preflight_passesWithoutToken() throws Exception {
        mvc.perform(options("/members/me")
                        .header("Origin", "http://localhost:5173")
                        .header("Access-Control-Request-Method", "GET")
                        .header("Access-Control-Request-Headers", "authorization"))
                .andExpect(status().isOk());
    }
}

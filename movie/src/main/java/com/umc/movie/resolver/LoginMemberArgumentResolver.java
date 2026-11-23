package com.umc.movie.resolver;

import com.umc.movie.exception.ApiException;
import com.umc.movie.interceptor.AuthInterceptor;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@Component
public class LoginMemberArgumentResolver implements HandlerMethodArgumentResolver {

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        boolean hasLoginMember = parameter.hasParameterAnnotation(LoginMember.class);
        boolean isLong = Long.class.equals(parameter.getParameterType());
        return hasLoginMember && isLong;
    }

    @Nullable
    @Override
    public Object resolveArgument(MethodParameter parameter,
                                  @Nullable ModelAndViewContainer mavContainer,
                                  NativeWebRequest webRequest,
                                  @Nullable WebDataBinderFactory binderFactory) throws Exception {
        HttpServletRequest request =
                webRequest.getNativeRequest(HttpServletRequest.class);

        Object memberId = request.getAttribute(AuthInterceptor.MEMBER_ID);

        if(memberId == null) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "AUTH401_1",
                    "로그인이 필요한 요청입니다.");
        }

        return memberId;
    }
}

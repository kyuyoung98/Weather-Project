package com.weather.backend.member.dto;

import com.weather.backend.member.entity.Authority;
import com.weather.backend.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberRequestDto {
    private String email;
    private String password;
    private String name;

    public Member toMember(PasswordEncoder passwordEncoder) {
        return Member.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .name(name)
                .authority(Authority.ROLE_USER)
                .build();
    }

    // UsernamePasswordAuthenticationToken를 반환하여 아이디와 비밀번호가 일치하는지 검증하는 로직을 넣을 수 있음
    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(email, password);
    }
}
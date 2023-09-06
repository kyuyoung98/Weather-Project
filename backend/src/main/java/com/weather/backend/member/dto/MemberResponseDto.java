package com.weather.backend.member.dto;

import com.weather.backend.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberResponseDto {
    private String email;
    private String name;

    public static MemberResponseDto of(Member member) {
        return MemberResponseDto.builder()
                .email(member.getEmail())
                .name(member.getName())
                .build();
    }
}
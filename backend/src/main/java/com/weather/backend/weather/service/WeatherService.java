package com.weather.backend.weather.service;

import com.weather.backend.board.dto.BoardResponseDto;
import com.weather.backend.member.entity.Member;
import com.weather.backend.weather.dto.WeatherResponseDto;
import com.weather.backend.weather.entity.Weather;
import com.weather.backend.weather.repository.WeatherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class WeatherService {
    private final WeatherRepository weatherRepository;

    // 날씨 하나 조회
    public WeatherResponseDto oneWeather(Long id) {
        Weather weather = weatherRepository.findById(id).orElseThrow(() -> new RuntimeException("정보가 없습니다."));
        return WeatherResponseDto.of(weather);
    }


}

package com.weather.backend.weather.controller;

import com.weather.backend.weather.dto.WeatherResponseDto;
import com.weather.backend.weather.service.WeatherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/weather")
public class WeatherController {
    private final WeatherService weatherService;

    @GetMapping("/one")
    public ResponseEntity<WeatherResponseDto> getOneWeather(@RequestParam(name = "id") Long id) {
        return ResponseEntity.ok(weatherService.oneWeather(id));
    }
}

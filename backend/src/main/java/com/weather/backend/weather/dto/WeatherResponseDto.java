package com.weather.backend.weather.dto;

import com.weather.backend.weather.entity.Weather;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WeatherResponseDto {
    private Long weatherId;
    private String date;
    private String cityName;
    private Float lon;
    private Float lat;
    private String weatherMain;
    private Float temperature;
    private Integer humidity;
    private Float windSpeed;
    private Integer clouds;

    public static WeatherResponseDto of(Weather weather) {
        return WeatherResponseDto.builder()
                .weatherId(weather.getId())
                .date(weather.getDate())
                .cityName(weather.getCityName())
                .lon(weather.getLon())
                .lat(weather.getLat())
                .weatherMain(weather.getWeatherMain())
                .temperature(weather.getTemperature())
                .humidity(weather.getHumidity())
                .windSpeed(weather.getWindSpeed())
                .clouds(weather.getClouds())
                .build();
    }
}

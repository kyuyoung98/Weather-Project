package com.weather.backend.weather.entity;

import jakarta.persistence.*;
import lombok.Getter;
import java.time.LocalDateTime;

@Entity
@Getter
public class Weather {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "weather_id")
    private Long id;

    @Column(nullable = false)
    private String date;

    @Column(nullable = false)
    private String cityName;

    @Column(nullable = false)
    private Float lon;

    @Column(nullable = false)
    private Float lat;

    @Column(nullable = false)
    private String weatherMain;

    @Column(nullable = false)
    private Float temperature;

    @Column(nullable = false)
    private Integer humidity;

    @Column(nullable = false)
    private Float windSpeed;

    @Column(nullable = false)
    private Integer clouds;
}

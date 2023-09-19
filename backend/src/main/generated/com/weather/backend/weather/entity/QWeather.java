package com.weather.backend.weather.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QWeather is a Querydsl query type for Weather
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QWeather extends EntityPathBase<Weather> {

    private static final long serialVersionUID = -557647644L;

    public static final QWeather weather = new QWeather("weather");

    public final StringPath cityName = createString("cityName");

    public final NumberPath<Integer> clouds = createNumber("clouds", Integer.class);

    public final StringPath date = createString("date");

    public final NumberPath<Integer> humidity = createNumber("humidity", Integer.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Float> lat = createNumber("lat", Float.class);

    public final NumberPath<Float> lon = createNumber("lon", Float.class);

    public final NumberPath<Float> temperature = createNumber("temperature", Float.class);

    public final StringPath weatherMain = createString("weatherMain");

    public final NumberPath<Float> windSpeed = createNumber("windSpeed", Float.class);

    public QWeather(String variable) {
        super(Weather.class, forVariable(variable));
    }

    public QWeather(Path<? extends Weather> path) {
        super(path.getType(), path.getMetadata());
    }

    public QWeather(PathMetadata metadata) {
        super(Weather.class, metadata);
    }

}


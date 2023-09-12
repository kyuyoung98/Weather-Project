package com.weather.backend.board.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ChangeBoardRequestDto {
    private Long id;
    private String title;
    private String body;
}

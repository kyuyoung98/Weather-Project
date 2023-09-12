package com.weather.backend.board.dto;

import lombok.Getter;
@Getter
public class CommentRequestDto {
    private Long boardId;
    private String body;
}

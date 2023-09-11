package com.weather.backend.board.dto;
import com.weather.backend.board.entity.Board;
import lombok.Builder;
import lombok.Getter;

import java.time.format.DateTimeFormatter;

@Getter
@Builder
public class PageResponseDto {
    private Long boardId;
    private String boardTitle;
    private String memberName;
    private String createdAt;

    // Board 객체를 Dto로 변환
    public static PageResponseDto of(Board board) {
        return PageResponseDto.builder()
                .boardId(board.getId())
                .boardTitle(board.getTitle())
                .memberName(board.getMember().getName())
                .createdAt(board.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .build();
    }
}
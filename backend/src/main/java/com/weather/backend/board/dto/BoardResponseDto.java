package com.weather.backend.board.dto;

import com.weather.backend.board.entity.Board;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.format.DateTimeFormatter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BoardResponseDto {
    private Long boardId;
    private String memberName;
    private String boardTitle;
    private String boardBody;
    private String createdAt;
    private String updatedAt;
    private boolean isWritten;

    public static BoardResponseDto of(Board board, boolean bool) {
        return BoardResponseDto.builder()
                .boardId(board.getId())
                .memberName(board.getMember().getName())
                .boardTitle(board.getTitle())
                .boardBody(board.getBody())
                .createdAt(board.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .updatedAt(board.getUpdatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .isWritten(bool)
                .build();
    }
}

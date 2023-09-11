package com.weather.backend.board.service;

import com.weather.backend.board.dto.PageResponseDto;
import com.weather.backend.board.entity.Board;
import com.weather.backend.board.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;

    public List<PageResponseDto> allArticle() {
        List<Board> boards = boardRepository.findAll();
        return boards
                .stream()
                .map(PageResponseDto::of)
                .collect(Collectors.toList());
    }
}

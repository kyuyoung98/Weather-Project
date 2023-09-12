package com.weather.backend.board.controller;

import com.weather.backend.board.dto.*;
import com.weather.backend.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardController {
    private final BoardService boardService;

    @GetMapping("/page")
    public ResponseEntity<Page<PageResponseDto>> pageBoard(@RequestParam(name = "page") int page) {
        return ResponseEntity.ok(boardService.pageBoard(page));
    }

    @GetMapping("/one")
    public ResponseEntity<BoardResponseDto> getOneBoard(@RequestParam(name = "id") Long id) {
        return ResponseEntity.ok(boardService.oneBoard(id));
    }

    @PostMapping("/")
    public ResponseEntity<BoardResponseDto> createBoard(@RequestBody CreateBoardRequestDto request) {
        return ResponseEntity.ok(boardService.postBoard(request.getTitle(), request.getBody()));
    }

    @GetMapping("/change")
    public ResponseEntity<BoardResponseDto> getChangeBoard(@RequestParam(name = "id") Long id) {
        return ResponseEntity.ok(boardService.oneBoard((id)));
    }

    @PutMapping("/")
    public ResponseEntity<BoardResponseDto> putChangeBoard(@RequestBody ChangeBoardRequestDto request) {
        return ResponseEntity.ok(boardService.changeBoard(
                request.getId(), request.getTitle(), request.getBody()
        ));
    }

    @DeleteMapping("/one")
    public ResponseEntity<MessageDto> deleteBoard(@RequestParam(name = "id") Long id) {
        boardService.deleteBoard(id);
        return ResponseEntity.ok(new MessageDto("Success"));
    }
}

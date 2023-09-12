package com.weather.backend.board.repository;

import com.weather.backend.board.dto.PageResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BoardRepositoryCustom {
    Page<PageResponseDto> searchAll(Pageable pageable);
}

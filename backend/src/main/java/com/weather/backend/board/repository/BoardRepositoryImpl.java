package com.weather.backend.board.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.weather.backend.board.dto.PageResponseDto;
import com.weather.backend.board.entity.Board;
import static com.weather.backend.board.entity.QBoard.board;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;


import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class BoardRepositoryImpl implements BoardRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    @Override
    public Page<PageResponseDto> searchAll(Pageable pageable) {
        List<Board> content = queryFactory
                .selectFrom(board)
                .orderBy(board.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        List<PageResponseDto> pages = content
                .stream()
                .map(PageResponseDto::of)
                .collect(Collectors.toList());

        int totalSize = queryFactory
                .selectFrom(board)
                .fetch()
                .size();

        return new PageImpl<>(pages, pageable, totalSize);
    }
}
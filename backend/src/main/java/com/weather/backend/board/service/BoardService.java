package com.weather.backend.board.service;

import com.weather.backend.board.dto.BoardResponseDto;
import com.weather.backend.board.dto.PageResponseDto;
import com.weather.backend.board.entity.Board;
import com.weather.backend.board.repository.BoardRepository;
import com.weather.backend.config.SecurityUtil;
import com.weather.backend.member.entity.Member;
import com.weather.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;

    // 게시물 조회
    public BoardResponseDto oneBoard(Long id) {
        Board board = boardRepository.findById(id).orElseThrow(() -> new RuntimeException("글이 없습니다."));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getPrincipal() == "anonymousUser") {
            return BoardResponseDto.of(board, false);
        } else {
            Member member = memberRepository.findById(Long.parseLong(authentication.getName())).orElseThrow();
            boolean result = board.getMember().equals(member);
            return BoardResponseDto.of(board, result);
        }
    }

    // 게시물 페이지 조회
    public Page<PageResponseDto> pageBoard(int pageNum) {
        return boardRepository.searchAll(PageRequest.of(pageNum - 1, 20));
    }

    // 게시물 생성
    @Transactional
    public BoardResponseDto postBoard(String title, String body) {
        Member member = isMemberCurrent();
        Board board = Board.createBoard(title, body, member);
        return BoardResponseDto.of(boardRepository.save(board), true);
    }

    // 게시물 수정
    @Transactional
    public BoardResponseDto changeBoard(Long id, String title, String body) {
        Board board = authorizationBoardWriter(id);
        return BoardResponseDto.of(boardRepository.save(Board.changeBoard(board, title, body)), true);
    }

    // 게시물 삭제
    @Transactional
    public void deleteBoard(Long id) {
        Board board = authorizationBoardWriter(id);
        boardRepository.delete(board);
    }

    // 토큰 값으로 본 계정이 로그인 되어있는지 확인
    public Member isMemberCurrent() {
        return memberRepository.findById(SecurityUtil.getCurrentMemberId())
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
    }

    // Board의 Member와 토큰의 Member가 같은지 확인
    public Board authorizationBoardWriter(Long id) {
        Member member = isMemberCurrent();
        Board board = boardRepository.findById(id).orElseThrow(() -> new RuntimeException("글이 없습니다."));
        if (!board.getMember().equals(member)) {
            throw new RuntimeException("로그인한 유저와 작성 유저가 같지 않습니다.");
        }
        return board;
    }
}

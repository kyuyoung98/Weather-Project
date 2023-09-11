package com.weather.backend.board.entity;
import com.weather.backend.member.entity.Member;
import jakarta.persistence.*;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String body;

    @CreationTimestamp
    @Column
    private LocalDateTime createdAt = LocalDateTime.now();

    @UpdateTimestamp
    @Column
    private LocalDateTime updatedAt = LocalDateTime.now();

    @OneToMany(mappedBy = "board")
    private List<Comment> comments = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public static Board createBoard (String title, String body, Member member) {
        Board board = new Board();
        board.title = title;
        board.body = body;
        board.member = member;
        return board;
    }

    public static Board changeBoard (Board board, String title, String body) {
        board.title = title;
        board.body = body;
        return board;
    }
}
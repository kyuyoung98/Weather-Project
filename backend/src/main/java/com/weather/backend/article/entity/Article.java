package com.weather.backend.article.entity;


import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 10, nullable = true)
    @NotEmpty
    private String userid;

    @Column(length = 10, nullable = true)
    @NotEmpty
    private String nickname;

    @Column(length = 30, nullable = true)
    @NotEmpty
    private String title;

    @Column(nullable = true)
    @NotEmpty
    private String content;

    @Column(nullable = true, updatable = false)
    @CreatedDate
    private LocalDateTime time;

    @PrePersist
    public void time() {
        this.time = LocalDateTime.now();
    }
}
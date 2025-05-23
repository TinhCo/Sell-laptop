package com.tinhco.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "movies")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer movieId;

    @Column(nullable = false, length = 200)
    @NotBlank(message = "Please provide movie title!")
    private String title;

    @Column(nullable = false)
    @NotBlank(message = "Please provide movie's director name!")
    private String director;

    @Column(nullable = false)
    @NotBlank(message = "Please provide movie's studio name!")
    private String studio;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "movie_cast")
    private Set<String> movieCast;

    @Column(nullable = false)
    private Integer releaseYear;

    @Column(nullable = false)
    @NotBlank(message = "Please provide movie's poster name!")
    private String poster;
}

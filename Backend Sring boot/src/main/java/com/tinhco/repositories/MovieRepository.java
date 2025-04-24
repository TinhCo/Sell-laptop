package com.tinhco.repositories;

import com.tinhco.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository  extends JpaRepository<Movie, Integer> {
}

package com.tinhco.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tinhco.dto.MovieDto;
import com.tinhco.dto.MoviePageResponse;
import com.tinhco.exceptions.EmptyFileException;
import com.tinhco.services.MovieService;
import com.tinhco.utils.AppConstants;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/movie/")
public class MovieController {

    private final MovieService movieService;
    private final ObjectMapper objectMapper;

    public MovieController(MovieService movieService, ObjectMapper objectMapper) {

        this.movieService = movieService;
        this.objectMapper = objectMapper;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
        @PostMapping("/app-movie")
    public ResponseEntity<MovieDto> addMovieHandler(@RequestPart String movieDto,
                                                    @RequestPart MultipartFile file) throws IOException {
        if (file.isEmpty()) throw new EmptyFileException("File cannot be empty, please send a file!");
        MovieDto obj = getMovieDto(movieDto);
        return new ResponseEntity<>(movieService.addMovie(obj, file), HttpStatus.CREATED);
    }

    @GetMapping("/{movieId}")
    public ResponseEntity<MovieDto> getMovieHandler(@PathVariable Integer movieId) {
        return ResponseEntity.ok(movieService.getMovie(movieId));
    }

    @GetMapping("/all")
    public ResponseEntity<List<MovieDto>> getMoviesHandler() {

        return ResponseEntity.ok(movieService.getAllMovies());
    }

    @PutMapping("/update-movie/{movieId}")
    public ResponseEntity<MovieDto> updateMovieHandler(@PathVariable Integer movieId,
                                                       @RequestPart MultipartFile file,
                                                       @RequestPart String movieDtoObj) throws IOException {
        if (file.isEmpty()) file = null;
        MovieDto movieDto = getMovieDto(movieDtoObj);
        return ResponseEntity.ok(movieService.updateMovie(movieId, movieDto, file));
    }

    @DeleteMapping("/delete/{movieId}")
    public ResponseEntity<String> deleteMovieHander(@PathVariable Integer movieId) throws IOException {
        return ResponseEntity.ok(movieService.deleteMovie(movieId));
    }
    @GetMapping("/allMovies")
    public ResponseEntity<MoviePageResponse> getAllMoviesWithPagination(
            @RequestParam(defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize
    ) {
        return ResponseEntity.ok(movieService.getAllMoviesWithPagination(pageNumber, pageSize));
    }

    @GetMapping("/allMoviesSort")
    public ResponseEntity<MoviePageResponse> getAllMoviesWithPaginationAndSorting(
            @RequestParam(defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(defaultValue = AppConstants.SORT_BY, required = false) String sortBy,
            @RequestParam(defaultValue = AppConstants.SORT_DIR, required = false) String sortDir
    ) {
        return  ResponseEntity.ok(movieService.getAllMoviesWithPaginationAndSorting(pageNumber, pageSize, sortBy, sortDir));
    }
    // Chuyển đổi dữ liệu requestPart trong chuỗi thành đối tượng JSON được ánh xạ tới lớp MovieDto
    private MovieDto getMovieDto(String movieObj) {
        MovieDto movieDto = new MovieDto();
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            movieDto = objectMapper.readValue(movieObj, MovieDto.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return movieDto;
    }
}

package com.tinhco.services.impl;

import com.tinhco.dto.MovieDto;
import com.tinhco.dto.MoviePageResponse;
import com.tinhco.model.Movie;
import com.tinhco.exceptions.FileExistsException;
import com.tinhco.exceptions.MovieNotFoundException;
import com.tinhco.repositories.MovieRepository;
import com.tinhco.services.FileService;
import com.tinhco.services.MovieService;
import jakarta.transaction.Transactional;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
public class MovieServiceImpl implements MovieService {

    private final FileService fileService;
    private final MovieRepository movieRepository;
    @Value("${project.poster}")
    private String path;

    @Value("${base.url}")
    private String baseUrl;

    public MovieServiceImpl(MovieRepository movieRepository, FileService fileService) {
        this.movieRepository = movieRepository;
        this.fileService = fileService;
    }

    @Override
    public MovieDto addMovie(MovieDto movieDto, MultipartFile file) throws IOException {
        // 1. upload file -> returns file name
        if(Files.exists(Paths.get(path + File.separator + file.getOriginalFilename()))){
            throw new FileExistsException("File already exists! Please give another file!");
        }
        String uploadedFileName =  fileService.uploadFile(path, file);

        // 2. set poster value to file name
        movieDto.setPoster(uploadedFileName);

        // 3. convert to Movie object
        Movie movie = new Movie(
                null,
                movieDto.getTitle(),
                movieDto.getDirector(),
                movieDto.getStudio(),
                movieDto.getMovieCast(),
                movieDto.getReleaseYear(),
                movieDto.getPoster()
        );
        // 4. save Movie object to DB -> return Movie object
        Movie savedMovie = movieRepository.save(movie);
        // 6. Get base url and construct poster's Url

        var posterUrl = baseUrl + "/file/" + uploadedFileName;
        // 5. convert to MovieDto object, and return this object
        var responseObj = new MovieDto(
                savedMovie.getMovieId(),
                savedMovie.getTitle(),
                savedMovie.getDirector(),
                savedMovie.getStudio(),
                savedMovie.getMovieCast(),
                savedMovie.getReleaseYear(),
                savedMovie.getPoster(),
                posterUrl
        );

        return responseObj;
    }

    @Transactional
    public MovieDto getMovie(Integer movieId) {
        // 1. kiểm tra xem có bản ghi nào tồn tại trong DB với 'movieId' đã cho không
        // 2. lấy dữ liệu nếu tồn tại, nếu không thì ném/xử lý ngoại lệ
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new MovieNotFoundException("Movie not found with id = " + movieId));
        Hibernate.initialize(movie.getMovieCast());
        // 3. generate 'posterUrl' with help of value from 'poster' field
        var posterUrl = baseUrl + "/file/" + movie.getPoster();

        // 4. ánh xạ dữ liệu tới đối tượng MovieDto và trả về đối tượng
        MovieDto response = new MovieDto(
                movie.getMovieId(),
                movie.getTitle(),
                movie.getDirector(),
                movie.getStudio(),
                movie.getMovieCast(),
                movie.getReleaseYear(),
                movie.getPoster(),
                posterUrl
        );

        return response;
    }

    @Transactional
    public List<MovieDto> getAllMovies() {
        // 1. lấy tất cả dữ liệu từ DB
        List<Movie> movies = movieRepository.findAll();
        List<MovieDto> movieDtos = new ArrayList<>();
        // 2.1 lặp lại danh sách, tạo posterUrl cho từng dữ liệu,
        // 2.2 và ánh xạ tới đối tượng MovieDto -> trả về đối tượng
        for(Movie movie: movies) {
            var posterUrl = baseUrl + "/file/" + movie.getPoster();
            MovieDto movieDto = new MovieDto(
                    movie.getMovieId(),
                    movie.getTitle(),
                    movie.getDirector(),
                    movie.getStudio(),
                    movie.getMovieCast(),
                    movie.getReleaseYear(),
                    movie.getPoster(),
                    posterUrl
            );
            movieDtos.add(movieDto);
        }
        return movieDtos;
    }

    @Transactional
    @Override
    public MovieDto updateMovie(Integer movieId, MovieDto movieDto, MultipartFile file) throws IOException {
        Movie existingMovie = movieRepository.findById(movieId)
                .orElseThrow(() -> new MovieNotFoundException("Movie not found with id = " + movieId));

        // Update file if a new one is provided
        if (file != null && !file.isEmpty()) {
            // Replace old file
            String oldFileName = existingMovie.getPoster();
            Files.deleteIfExists(Paths.get(path + File.separator + oldFileName));

            // Upload new file and set new file name
            String uploadedFileName = fileService.uploadFile(path, file);
            existingMovie.setPoster(uploadedFileName);
        }

        // Update movie details
        existingMovie.setTitle(movieDto.getTitle());
        existingMovie.setDirector(movieDto.getDirector());
        existingMovie.setStudio(movieDto.getStudio());
        existingMovie.setMovieCast(movieDto.getMovieCast());
        existingMovie.setReleaseYear(movieDto.getReleaseYear());

        // Save to the database
        Movie updatedMovie = movieRepository.save(existingMovie);

        // Generate poster URL
        String posterUrl = baseUrl + "/file/" + updatedMovie.getPoster();

        // Create and return DTO
        return new MovieDto(
                updatedMovie.getMovieId(),
                updatedMovie.getTitle(),
                updatedMovie.getDirector(),
                updatedMovie.getStudio(),
                updatedMovie.getMovieCast(),
                updatedMovie.getReleaseYear(),
                updatedMovie.getPoster(),
                posterUrl
        );
    }

    @Override
    public String deleteMovie(Integer movieId) throws IOException {
        // 1. check if movie record exists in DB with given movieID
        Movie mv = movieRepository.findById(movieId)
                .orElseThrow(() -> new MovieNotFoundException("Movie not found with id = " + movieId));
        Integer id = mv.getMovieId();
        // 2. if exists delete the movie object in DB, and file associated with in file path
        Files.deleteIfExists(Paths.get(path + File.separator + mv.getPoster()));
        movieRepository.delete(mv);
        return "Đối tượng phim đã bị xóa với id = " + id;
    }

    @Override
    public MoviePageResponse getAllMoviesWithPagination(Integer pageNumber, Integer pageSize) {
        // 1. create Pageable object
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        // 2. Get the data from DB
        Page<Movie> moviePages = movieRepository.findAll(pageable);
        List<Movie> movies = moviePages.getContent();

        // 3. Convert to MovieDto object and return it
        List<MovieDto> movieDtos = new ArrayList<>();
        for (Movie movie : movies) {
            var posterUrl = baseUrl + "/file/" + movie.getPoster();
            MovieDto movieDto = new MovieDto(
                    movie.getMovieId(),
                    movie.getTitle(),
                    movie.getDirector(),
                    movie.getStudio(),
                    movie.getMovieCast(),
                    movie.getReleaseYear(),
                    movie.getPoster(),
                    posterUrl
            );
            movieDtos.add(movieDto);
        }

        return new MoviePageResponse(movieDtos,
                pageNumber,
                pageSize,
                moviePages.getTotalElements(),
                moviePages.getTotalPages(),
                moviePages.isLast());
    }
    @Override
    public MoviePageResponse getAllMoviesWithPaginationAndSorting(Integer pageNumber, Integer pageSize,
                                                                  String sortBy, String sortDir) {
        // 1. create Sort and Pageable object
        Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

        // 2. Get the data from DB
        Page<Movie> moviePages = movieRepository.findAll(pageable);
        List<Movie> movies = moviePages.getContent();

        // 3. Convert to MovieDto object and return it
        List<MovieDto> movieDtos = new ArrayList<>();
        for (Movie movie : movies) {
            var posterUrl = baseUrl + "/file/" + movie.getPoster();
            MovieDto movieDto = new MovieDto(
                    movie.getMovieId(),
                    movie.getTitle(),
                    movie.getDirector(),
                    movie.getStudio(),
                    movie.getMovieCast(),
                    movie.getReleaseYear(),
                    movie.getPoster(),
                    posterUrl
            );
            movieDtos.add(movieDto);
        }
        return new MoviePageResponse(movieDtos,
                pageNumber,
                pageSize,
                moviePages.getTotalElements(),
                moviePages.getTotalPages(),
                moviePages.isLast());
    }
}

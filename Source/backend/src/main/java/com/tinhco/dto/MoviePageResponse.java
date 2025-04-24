package com.tinhco.dto;

import java.util.List;
public record MoviePageResponse(List<MovieDto> movieDtos,
                                int pageNumber,
                                int pageSize,
                                long totalElements,
                                int totalPages,
                                boolean isLastPage) {}

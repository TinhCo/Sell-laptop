package com.tinhco.services;

import com.tinhco.dto.PostDto;

import java.util.List;

public interface PostService {
    PostDto createPost(PostDto postDto);
    PostDto getPostById(Integer id);
    List<PostDto> getAllPosts();
    PostDto updatePost(Integer id, PostDto postDto);
    void deletePost(Integer id);
    boolean postExists(String title, String slug);
}

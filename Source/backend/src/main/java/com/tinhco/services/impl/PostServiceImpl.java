package com.tinhco.services.impl;

import com.tinhco.dto.PostDto;
import com.tinhco.model.Post;
import com.tinhco.repositories.PostRepository;
import com.tinhco.services.PostService;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepository postRepository;

    @Override
    public PostDto createPost(PostDto postDto) {
        Post post = convertToEntity(postDto);
        Post savedPost = postRepository.save(post);
        return convertToDto(savedPost);
    }

    @Override
    public PostDto getPostById(Integer id) {
        Post post = postRepository.findById(id).orElse(null);
        return convertToDto(post);
    }

    @Override
    public List<PostDto> getAllPosts() {
        List<Post> posts = postRepository.findAll();
        return posts.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public PostDto updatePost(Integer id, PostDto postDto) {
        Post existingPost = postRepository.findById(id).orElse(null);
        if (existingPost != null) {
            BeanUtils.copyProperties(postDto, existingPost, "id", "createdBy", "createdAt", "status");
            return convertToDto(postRepository.save(existingPost));
        }
        return null;
    }

    @Override
    public void deletePost(Integer id) {
        postRepository.deleteById(id);
    }

    @Override
    public boolean postExists(String title, String slug) {
        return postRepository.existsByTitleAndSlug(title, slug);
    }

    private PostDto convertToDto(Post post) {
        if (post == null) {
            return null;
        }
        PostDto postDto = new PostDto();
        BeanUtils.copyProperties(post, postDto);
        return postDto;
    }

    private Post convertToEntity(PostDto postDto) {
        Post post = new Post();
        BeanUtils.copyProperties(postDto, post);
        return post;
    }

}


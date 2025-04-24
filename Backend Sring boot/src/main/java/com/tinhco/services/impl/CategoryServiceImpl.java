package com.tinhco.services.impl;

import com.tinhco.dto.CategoryDto;
import com.tinhco.repositories.CategoryRepository;
import com.tinhco.services.CategoryService;
import com.tinhco.model.Category;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<CategoryDto> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream()
                .map(category -> modelMapper.map(category, CategoryDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public CategoryDto getCategoryById(Integer id) {
        Optional<Category> category = categoryRepository.findById(id);
        if (category.isPresent()) {
            return modelMapper.map(category.get(), CategoryDto.class);
        } else {
            throw new RuntimeException("Không tìm thấy danh mục cho id: " + id);
        }
    }

    @Override
    public CategoryDto createCategory(CategoryDto categoryDto) {
        Category category = modelMapper.map(categoryDto, Category.class);
        category = categoryRepository.save(category);
        return modelMapper.map(category, CategoryDto.class);
    }

    @Override
    public CategoryDto updateCategory(Integer id, CategoryDto categoryDto) {
        Optional<Category> categoryOptional = categoryRepository.findById(id);
        if (categoryOptional.isPresent()) {
            Category category = categoryOptional.get();
            category.setName(categoryDto.getName());
            category.setSlug(categoryDto.getSlug());
            category = categoryRepository.save(category);
            return modelMapper.map(category, CategoryDto.class);
        } else {
            throw new RuntimeException("Không tìm thấy danh mục cho id: " + id);
        }
    }

    @Override
    public void deleteCategory(Integer id) {
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
        } else {
            throw new RuntimeException("Không tìm thấy danh mục cho id: " + id);
        }
    }

    @Override
    public CategoryDto getCategoryByName(String name) {
        Category category = categoryRepository.findByName(name);
        if (category != null) {
            return modelMapper.map(category, CategoryDto.class);
        } else {
            return null;
        }
    }

}

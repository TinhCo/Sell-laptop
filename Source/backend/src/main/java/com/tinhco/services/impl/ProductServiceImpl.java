package com.tinhco.services.impl;

import com.tinhco.model.Product;
import com.tinhco.dto.ProductDto;
import com.tinhco.exceptions.ProductNotFoundException;
import com.tinhco.repositories.ProductRepository;
import com.tinhco.services.FileService;
import com.tinhco.services.ProductService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    private final FileService fileService;
    private final ProductRepository productRepository;

    @Value("${project.image}")
    private String path;

    @Value("${base.url}")
    private String baseUrl;

    public ProductServiceImpl(ProductRepository productRepository, FileService fileService) {
        this.productRepository = productRepository;
        this.fileService = fileService;
    }

    @Override
    public ProductDto addProduct(ProductDto productDto, MultipartFile file) throws IOException {
        if (file != null && !file.isEmpty()) {
            String fileName = file.getOriginalFilename();
            Path imagePath = Paths.get("images/" + fileName);
            Files.copy(file.getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);
            productDto.setImage(fileName);
        }

        Product product = new Product(
                null,
                productDto.getCategoryId(),
                productDto.getBrandId(),
                productDto.getName(),
                productDto.getSlug(),
                productDto.getPrice(),
                productDto.getPresale(),
                productDto.getImage(),
                productDto.getQty(),
                productDto.getDetail(),
                productDto.getDescription(),
                productDto.getCreatedBy(),
                productDto.getUpdatedBy(),
                productDto.getStatus()
        );

        Product savedProduct = productRepository.save(product);

        ProductDto responseObj = new ProductDto(
                savedProduct.getId(),
                savedProduct.getCategoryId(),
                savedProduct.getBrandId(),
                savedProduct.getName(),
                savedProduct.getSlug(),
                savedProduct.getPrice(),
                savedProduct.getPresale(),
                savedProduct.getImage(),
                savedProduct.getQty(),
                savedProduct.getDetail(),
                savedProduct.getDescription(),
                savedProduct.getCreatedBy(),
                savedProduct.getUpdatedBy(),
                savedProduct.getStatus()
        );

        return responseObj;
    }

    @Override
    public ProductDto getProduct(Integer productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Product not found with id = " + productId));

        ProductDto response = new ProductDto(
                product.getId(),
                product.getCategoryId(),
                product.getBrandId(),
                product.getName(),
                product.getSlug(),
                product.getPrice(),
                product.getPresale(),
                product.getImage(),
                product.getQty(),
                product.getDetail(),
                product.getDescription(),
                product.getCreatedBy(),
                product.getUpdatedBy(),
                product.getStatus()
        );

        return response;
    }

    @Override
    public List<ProductDto> getAllProducts() {
        List<Product> products = productRepository.findAll();
        List<ProductDto> productDtos = new ArrayList<>();
        for (Product product : products) {
            ProductDto productDto = new ProductDto(
                    product.getId(),
                    product.getCategoryId(),
                    product.getBrandId(),
                    product.getName(),
                    product.getSlug(),
                    product.getPrice(),
                    product.getPresale(),
                    product.getImage(),
                    product.getQty(),
                    product.getDetail(),
                    product.getDescription(),
                    product.getCreatedBy(),
                    product.getUpdatedBy(),
                    product.getStatus()
            );
            productDtos.add(productDto);
        }
        return productDtos;
    }

    @Override
    public ProductDto updateProduct(Integer productId, ProductDto productDto, MultipartFile file) throws IOException {
        Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Product not found with id = " + productId));

        if (file != null && !file.isEmpty()) {
            String oldFileName = existingProduct.getImage();
            Files.deleteIfExists(Paths.get(path + File.separator + oldFileName));
            String uploadedFileName = fileService.uploadFile(path, file);
            existingProduct.setImage(uploadedFileName);
        }

        existingProduct.setCategoryId(productDto.getCategoryId());
        existingProduct.setBrandId(productDto.getBrandId());
        existingProduct.setName(productDto.getName());
        existingProduct.setSlug(productDto.getSlug());
        existingProduct.setPrice(productDto.getPrice());
        existingProduct.setPresale(productDto.getPresale());
        existingProduct.setQty(productDto.getQty());
        existingProduct.setDetail(productDto.getDetail());
        existingProduct.setDescription(productDto.getDescription());
        existingProduct.setUpdatedBy(productDto.getUpdatedBy());
        existingProduct.setStatus(productDto.getStatus());

        Product updatedProduct = productRepository.save(existingProduct);

        return new ProductDto(
                updatedProduct.getId(),
                updatedProduct.getCategoryId(),
                updatedProduct.getBrandId(),
                updatedProduct.getName(),
                updatedProduct.getSlug(),
                updatedProduct.getPrice(),
                updatedProduct.getPresale(),
                updatedProduct.getImage(),
                updatedProduct.getQty(),
                updatedProduct.getDetail(),
                updatedProduct.getDescription(),
                updatedProduct.getCreatedBy(),
                updatedProduct.getUpdatedBy(),
                updatedProduct.getStatus()
        );
    }

    @Override
    public String deleteProduct(Integer productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Product not found with id = " + productId));

        // Delete the product image file if it exists
        String imageName = product.getImage();
        if (imageName != null && !imageName.isEmpty()) {
            try {
                Files.deleteIfExists(Paths.get(path + File.separator + imageName));
            } catch (IOException e) {
                throw new RuntimeException("Error deleting file: " + imageName, e);
            }
        }

        productRepository.deleteById(productId);
        return "Product with id " + productId + " has been deleted successfully.";
    }

    private ProductDto productToProductDto(Product product) {
        return ProductDto.builder()
                .id(product.getId())
                .categoryId(product.getCategoryId())
                .brandId(product.getBrandId())
                .name(product.getName())
                .slug(product.getSlug())
                .price(product.getPrice())
                .presale(product.getPresale())
                .image(product.getImage())
                .qty(product.getQty())
                .detail(product.getDetail())
                .description(product.getDescription())
                .createdBy(product.getCreatedBy())
                .updatedBy(product.getUpdatedBy())
                .status(product.getStatus())
                .build();
    }

    @Override
    public List<ProductDto> getProductsByCategoryId(Integer categoryId) {
        List<Product> products = productRepository.findByCategoryId(categoryId);
        return products.stream()
                .map(this::productToProductDto)
                .collect(Collectors.toList());
    }
}

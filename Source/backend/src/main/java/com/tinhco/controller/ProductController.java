package com.tinhco.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tinhco.dto.ProductDto;
import com.tinhco.exceptions.EmptyFileException;
import com.tinhco.services.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/product/")
public class ProductController {

    private final ProductService productService;
    private final ObjectMapper objectMapper;
    public ProductController(ProductService productService, ObjectMapper objectMapper) {
        this.productService = productService;
        this.objectMapper = objectMapper;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/app-product")
    public ResponseEntity<ProductDto> addProductHandler(@RequestParam("productDto") String productDtoJson,
                                                        @RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new EmptyFileException("Tệp không thể trống, vui lòng gửi tệp!");
        }
        ProductDto productDto = objectMapper.readValue(productDtoJson, ProductDto.class);
        ProductDto savedProduct = productService.addProduct(productDto, file);
        String imageUrl = constructImageUrl(savedProduct.getImage());
        savedProduct.setImage(imageUrl);
        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }


    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/update-product/{productId}")
    public ResponseEntity<ProductDto> updateProductHandler(@PathVariable Integer productId,
                                                           @RequestParam(value = "file", required = false) MultipartFile file,
                                                           @RequestParam("productDto") String productDtoJson) throws IOException {
        ProductDto productDto = objectMapper.readValue(productDtoJson, ProductDto.class);
        ProductDto updatedProduct = productService.updateProduct(productId, productDto, file);
        String imageUrl = constructImageUrl(updatedProduct.getImage());
        updatedProduct.setImage(imageUrl);
        return ResponseEntity.ok(updatedProduct);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/delete/{productId}")
    public ResponseEntity<String> deleteProductHandler(@PathVariable Integer productId) throws IOException {
        return ResponseEntity.ok(productService.deleteProduct(productId));
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/{productId}")
    public ResponseEntity<ProductDto> getProductHandler(@PathVariable Integer productId) {
        ProductDto productDto = productService.getProduct(productId);
        String imageUrl = constructImageUrl(productDto.getImage());
        productDto.setImage(imageUrl);
        return ResponseEntity.ok(productDto);
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/all")
    public ResponseEntity<List<ProductDto>> getAllProductsHandler() {
        List<ProductDto> productDtos = productService.getAllProducts();
        for (ProductDto productDto : productDtos) {
            String imageUrl = constructImageUrl(productDto.getImage());
            productDto.setImage(imageUrl);
        }
        return ResponseEntity.ok(productDtos);
    }

    @ExceptionHandler(EmptyFileException.class)
    public ResponseEntity<String> handleEmptyFileException(EmptyFileException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    private ProductDto getProductDto(String productObj) {
        try {
            return objectMapper.readValue(productObj, ProductDto.class);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Invalid JSON format for ProductDto", e);
        }
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ProductDto>> getProductsByCategoryHandler(@PathVariable Integer categoryId) {
        List<ProductDto> products = productService.getProductsByCategoryId(categoryId);
        for (ProductDto productDto : products) {
            String imageUrl = constructImageUrl(productDto.getImage());
            productDto.setImage(imageUrl);
        }
        return ResponseEntity.ok(products);
    }

    private String constructImageUrl(String imageName) {
        String baseUrl = "http://localhost:8081/images/";
        return baseUrl + imageName;
    }
}

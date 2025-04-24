package com.tinhco.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDto {
    private Integer id;
    private Integer categoryId;
    private Integer brandId;
    private String name;
    private String slug;
    private Float price;
    private Float presale;
    private String image;
    private Integer qty;
    private String detail;
    private String description;
    private Integer createdBy;
    private Integer updatedBy;
    private Integer status;

}

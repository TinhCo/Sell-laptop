package com.tinhco.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "products")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "category_id")
    private Integer categoryId;

    @Column(nullable = false)
    private Integer brandId;

    @Column(nullable = false, length = 1000)
    private String name;

    @Column(nullable = false, length = 1000)
    private String slug;

    @Column(nullable = false)
    private Float price;

    @Column
    private Float presale;

    @Column(nullable = false, length = 1000)
    private String image;

    @Column(nullable = false)
    private Integer qty;

    @Column(nullable = false, columnDefinition = "MEDIUMTEXT")
    private String detail;

    @Column(length = 255)
    private String description;

    @Column(nullable = false)
    private Integer createdBy;

    @Column
    private Integer updatedBy;

    @Column(nullable = false)
    private Integer status;


}

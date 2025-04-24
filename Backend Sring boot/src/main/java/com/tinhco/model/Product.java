package com.tinhco.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "products")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
     Integer id;

    @Column(name = "category_id")
     Integer categoryId;

    @Column(nullable = false)
     Integer brandId;

    @Column(nullable = false, length = 1000)
     String name;

    @Column(nullable = false, length = 1000)
     String slug;

    @Column(nullable = false)
     Float price;

    @Column
     Float presale;

    @Column(nullable = false, length = 1000)
     String image;

    @Column(nullable = false)
     Integer qty;

    @Column(nullable = false, columnDefinition = "MEDIUMTEXT")
     String detail;

    @Column(length = 255)
     String description;

    @Column(nullable = false)
     Integer createdBy;

    @Column
     Integer updatedBy;

    @Column(nullable = false)
     Integer status;

}

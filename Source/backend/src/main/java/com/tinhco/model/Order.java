package com.tinhco.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.tinhco.auth.model.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    @ManyToOne
    @JoinColumn(name = "updated_by")
    private User updatedBy;
    private String name;
    private String phone;
    private String email;
    private String address;
    private String note;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Integer status;
}

package com.tinhco.auth.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.tinhco.auth.enumb.UserRole;
import com.tinhco.model.CartItem;
import com.tinhco.model.Order;
import com.tinhco.model.Post;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userId;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<CartItem> cartItems;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<Order> orders;

    @NotBlank(message = "Trường 'tên' không được để trống")
    private String name;

    @Column(unique = true)
    @NotBlank(message = "Trường 'tên người dùng' không được để trống")
    private String username;

    @Column(unique = true)
    @NotBlank(message = "Trường 'email' không được để trống")
    @Email(message = "Vui lòng nhập đúng định dạng email!")
    private String email;

    @JsonIgnore
    @NotBlank(message = "Trường 'mật khẩu' không được để trống")
    @Size(min = 5, message = "Mật khẩu phải có ít nhất 5 ký tự")
    private String password;

    @OneToOne(mappedBy = "user")
    private RefreshToken refreshToken;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private UserRole role = UserRole.USER;

    @OneToOne(mappedBy = "user")
    private ForgotPassword forgotPassword;

    @OneToMany(mappedBy = "createdBy", cascade = CascadeType.ALL)
    @JsonManagedReference
    @JsonIgnore
    private List<Post> posts;

    public User(String name, String username, String email, String password) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = UserRole.USER;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

package com.tinhco.auth.utils;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterRequest {
    @NotBlank(message = "Trường 'tên' không được để trống")
    private String name;

    @NotBlank(message = "Trường 'email' không được để trống")
    @Email(message = "Vui lòng nhập đúng định dạng email!")
    private String email;

    @NotBlank(message = "Trường 'tên người dùng' không được để trống")
    private String username;

    @NotBlank(message = "Trường 'mật khẩu' không được để trống")
    @Size(min = 8, message = "Mật khẩu phải có ít nhất 8 ký tự")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
            message = "Mật khẩu phải bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
    )
    private String password;

}

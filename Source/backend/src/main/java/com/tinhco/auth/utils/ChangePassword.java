package com.tinhco.auth.utils;

import lombok.Data;

@Data
public class ChangePassword {
    private String password;
    private String repeatPassword;
}

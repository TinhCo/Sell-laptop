package com.tinhco.auth.sevices;

import com.tinhco.auth.model.User;
import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(Long id);
    void deleteUser(Long id);
}

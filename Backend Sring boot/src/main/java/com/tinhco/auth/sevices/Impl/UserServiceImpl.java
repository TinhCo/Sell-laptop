package com.tinhco.auth.sevices.Impl;

import com.tinhco.auth.model.User;
import com.tinhco.auth.repositories.UserRepository;
import com.tinhco.auth.sevices.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        return optionalUser.orElse(null);
    }


    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}

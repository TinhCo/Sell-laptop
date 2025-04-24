package com.tinhco.auth.sevices.Impl;

import com.tinhco.auth.model.User;
import com.tinhco.auth.enumb.UserRole;
import com.tinhco.auth.repositories.UserRepository;
import com.tinhco.auth.utils.AuthResponse;
import com.tinhco.auth.utils.LoginRequest;
import com.tinhco.auth.utils.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final RefreshTokenService refreshTokenService;

    public AuthResponse register(RegisterRequest request){
        var user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(UserRole.USER)
                .build();
        User savedUser = userRepository.save(user);
        var jwt = jwtService.generateToken(savedUser);
        var refreshToken = refreshTokenService.createRefreshToken(user.getEmail());
        return AuthResponse.builder()
                .token(jwt)
                .refreshToken(refreshToken.getRefreshToken())
                .role(savedUser.getRole().name())
                .build();

    }

    public AuthResponse authenticate(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwt = jwtService.generateToken(user);
        var refreshToken = refreshTokenService.createRefreshToken(user.getEmail());
        return AuthResponse.builder()
                .token(jwt)
                .refreshToken(refreshToken.getRefreshToken())
                .role(user.getRole().name())
                .build();
    }

}

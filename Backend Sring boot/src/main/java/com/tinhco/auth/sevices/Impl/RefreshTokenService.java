package com.tinhco.auth.sevices.Impl;

import com.tinhco.auth.model.RefreshToken;
import com.tinhco.auth.model.User;
import com.tinhco.auth.repositories.RefreshTokenRepository;
import com.tinhco.auth.repositories.UserRepository;
import com.tinhco.exceptions.TokenExpiredException;
import com.tinhco.exceptions.TokenNotFoundException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
public class RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;

    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository, UserRepository userRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRepository = userRepository;
    }

    public RefreshToken createRefreshToken(String username){
        User user = userRepository.findByEmail(username).orElseThrow(()
                -> new UsernameNotFoundException("User not found with username : " + username));
        RefreshToken refreshToken = user.getRefreshToken();
        if (refreshToken == null) {
            long refreshTokenValidity = 30 * 1000;
            refreshToken = RefreshToken.builder()
                    .refreshToken(UUID.randomUUID().toString())
                    .expirationTime(Instant.now().plusMillis(refreshTokenValidity))
                    .user(userRepository.findByEmail(username)
                            .orElseThrow(() -> new UsernameNotFoundException("User not found with username : " + username)))
                    .build();

        }
        return refreshToken;
    }
    public RefreshToken verifyRefreshToken(String refreshToken) {
        RefreshToken refreshTokenOb = refreshTokenRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new TokenNotFoundException("refresh token not exist"));
        if(refreshTokenOb.getExpirationTime().compareTo(Instant.now()) < 0) {
            System.out.println("Entered here ....");
            refreshTokenRepository.delete(refreshTokenOb);
            throw new TokenExpiredException("Refresh Token expired");
        }
        return refreshTokenOb;
    }
}

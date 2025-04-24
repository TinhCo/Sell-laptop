package com.tinhco.controller;

import com.tinhco.auth.model.ForgotPassword;
import com.tinhco.auth.model.User;
import com.tinhco.auth.repositories.ForgotPasswordRepository;
import com.tinhco.auth.repositories.UserRepository;
import com.tinhco.auth.utils.ChangePassword;
import com.tinhco.dto.MailBody;
import com.tinhco.services.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.time.Instant;
import java.util.Date;
import java.util.Objects;
import java.util.Random;

@RestController
@RequestMapping("/forgotPassword")
public class ForgotPasswordController {
    private final EmailService emailService;
    private final UserRepository userRepository;
    private final ForgotPasswordRepository forgotPasswordRepository;
    private final PasswordEncoder passwordEncoder;

    public ForgotPasswordController(EmailService emailService, UserRepository userRepository,
                                    ForgotPasswordRepository forgotPasswordRepository, PasswordEncoder passwordEncoder) {
        this.emailService = emailService;
        this.userRepository = userRepository;
        this.forgotPasswordRepository = forgotPasswordRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping(value = "/verifyMail/{email}")
    public ResponseEntity<String> sendOtpEmail(@PathVariable String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Vui lòng cung cấp email hợp lệ!"));

        int otp = generateOtp();
        String htmlContent = getHtmlTemplateWithOtp(otp);

        MailBody mailBody = MailBody.builder()
                .to(email)
                .text(htmlContent)
                .subject("OTP cho Yêu cầu Quên Mật Khẩu")
                .isHtml(true)
                .build();

        ForgotPassword forgotPassword = ForgotPassword.builder()
                .otp(otp)
                .expirationTime(new Date(System.currentTimeMillis() + 15 * 60 * 1000))
                .user(user)
                .build();

        emailService.sendSimpleMessage(mailBody);
        forgotPasswordRepository.save(forgotPassword);

        return ResponseEntity.ok("Email đã được gửi để xác nhận!");
    }

    @PostMapping("/verifyOtp/{otp}/{email}")
    public ResponseEntity<String> verifyOtp(@PathVariable Integer otp, @PathVariable String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Vui lòng cung cấp email hợp lệ!"));

        ForgotPassword forgotPassword = forgotPasswordRepository.findByOtpAndUser(otp, user)
                .orElseThrow(() -> new RuntimeException("OTP không hợp lệ cho email: " + email));

        if (forgotPassword.getExpirationTime().before(Date.from(Instant.now()))) {
            forgotPasswordRepository.deleteById(forgotPassword.getFpid());
            return new ResponseEntity<>("OTP đã hết hạn!", HttpStatus.EXPECTATION_FAILED);
        }

        return ResponseEntity.ok("OTP đã được xác nhận!");
    }

    @PostMapping("/changePassword/{email}")
    public ResponseEntity<String> changePassword(@RequestBody ChangePassword changePassword, @PathVariable String email) {
        if (!Objects.equals(changePassword.getPassword(), changePassword.getRepeatPassword())) {
            return new ResponseEntity<>("Vui lòng nhập lại mật khẩu!", HttpStatus.BAD_REQUEST);
        }

        String encodedPassword = passwordEncoder.encode(changePassword.getPassword());
        userRepository.updatePassword(email, encodedPassword);

        return ResponseEntity.ok("Mật khẩu đã được thay đổi!");
    }

    private int generateOtp() {
        Random random = new Random();
        return random.nextInt(900000) + 100000;
    }

    private String getHtmlTemplateWithOtp(int otp) {
        try {
            File file = ResourceUtils.getFile("classpath:emailTemplate.html");
            String content = new String(Files.readAllBytes(file.toPath()));
            return content.replace("{{otp}}", String.valueOf(otp));
        } catch (IOException e) {
            throw new RuntimeException("Lỗi khi đọc mẫu email HTML", e);
        }
    }
}

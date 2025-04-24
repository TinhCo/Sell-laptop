package com.tinhco.services;

import com.tinhco.dto.MailBody;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
@Service
public class EmailService {
    public final JavaMailSender javaMailSender;

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }
    public void sendSimpleMessage(MailBody mailBody) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mailBody.getTo());  // Use getter methods
        message.setFrom("phungtoan872@gmail.com");
        message.setSubject(mailBody.getSubject());
        message.setText(mailBody.getText());
        javaMailSender.send(message);
    }

}

package com.tinhco.services.impl;

import com.tinhco.dto.MailBody;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
@Service
public class EmailService {
    private final JavaMailSender javaMailSender;

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }
    @KafkaListener(topics = "email-topic", groupId = "email-group")
    public void listenAndSendEmail(MailBody mailBody) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(mailBody.getTo());
            helper.setFrom("phungtoan872@gmail.com");
            helper.setSubject(mailBody.getSubject());
            helper.setText(mailBody.getText(), mailBody.isHtml());
            javaMailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}

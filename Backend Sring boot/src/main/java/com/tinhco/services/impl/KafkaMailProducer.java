package com.tinhco.services.impl;

import com.tinhco.dto.MailBody;
import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.serialization.StringSerializer;
import com.tinhco.serializer.MailBodySerializer;

import java.util.Properties;

public class KafkaMailProducer {
    public static void main(String[] args) {
        // Cấu hình cho Kafka Producer
        Properties props = new Properties();
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, MailBodySerializer.class.getName());

        // Tạo producer
        Producer<String, MailBody> producer = new KafkaProducer<>(props);

        // Tạo đối tượng MailBody
        MailBody mailBody = MailBody.builder()
                .to("phungtoan872@gmail.com")
                .subject("Test Subject")
                .text("This is a test email.")
                .isHtml(false)
                .build();

        // Gửi đối tượng MailBody đến Kafka
        ProducerRecord<String, MailBody> record = new ProducerRecord<>("your_topic", mailBody);
        producer.send(record, (metadata, exception) -> {
            if (exception != null) {
                exception.printStackTrace();
            } else {
                System.out.printf("Sent message to topic %s partition %d with offset %d%n",
                        metadata.topic(), metadata.partition(), metadata.offset());
            }
        });

        // Đóng producer
        producer.close();
    }
}

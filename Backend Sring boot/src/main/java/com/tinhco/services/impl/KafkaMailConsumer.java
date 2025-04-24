package com.tinhco.services.impl;

import com.tinhco.dto.MailBody;
import org.apache.kafka.clients.consumer.*;
import org.apache.kafka.common.serialization.StringDeserializer;

import java.time.Duration;
import java.util.Collections;
import java.util.Properties;

public class KafkaMailConsumer {
    public static void main(String[] args) {
        // Cấu hình cho Kafka Consumer
        Properties props = new Properties();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        props.put(ConsumerConfig.GROUP_ID_CONFIG, "your_group_id");
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, MailBodyDeserializer.class.getName());

        // Tạo consumer
        Consumer<String, MailBody> consumer = new KafkaConsumer<>(props);
        consumer.subscribe(Collections.singletonList("your_topic"));

        // Nhận dữ liệu từ Kafka
        while (true) {
            ConsumerRecords<String, MailBody> records = consumer.poll(Duration.ofMillis(100));
            for (ConsumerRecord<String, MailBody> record : records) {
                System.out.printf("Received message: %s%n", record.value());
            }
        }
    }
}


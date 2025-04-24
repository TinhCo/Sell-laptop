package com.tinhco.services.impl;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.tinhco.dto.MailBody;
import org.apache.kafka.common.serialization.Deserializer;

import java.util.Map;

public class MailBodyDeserializer implements Deserializer<MailBody> {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public MailBody deserialize(String topic, byte[] data) {
        try {
            return objectMapper.readValue(data, MailBody.class);
        } catch (Exception e) {
            throw new RuntimeException("Error deserializing MailBody", e);
        }
    }

    @Override
    public void configure(Map<String, ?> configs, boolean isKey) {
        // Không cần cấu hình thêm gì
    }

    @Override
    public void close() {
        // Không cần đóng gì
    }
}

package com.midas.core.service;

import com.midas.core.model.TransactionEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaProducerService {

    private final KafkaTemplate<String, TransactionEvent> kafkaTemplate;
    private static final String TOPIC = "trader-updates";

    public void sendTransaction(TransactionEvent event) {
        log.info("Producing transaction to Kafka: {}", event);
        kafkaTemplate.send(TOPIC, event);
    }
}

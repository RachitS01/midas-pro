package com.midas.core.service;

import com.midas.core.model.TransactionEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaConsumerService {

    private final TransactionService transactionService;
    private final SimpMessagingTemplate messagingTemplate; // For WebSocket

    @KafkaListener(topics = "trader-updates", groupId = "midas-group")
    public void consume(TransactionEvent event) {
        log.info("Consume transaction from Kafka: {}", event);
        try {
            transactionService.processTransaction(event.getUserId(), event.getAmount(), event.getType());
            // Notify Frontend via WS after processing
            messagingTemplate.convertAndSend("/topic/transactions", event); // Sending event back as "processed"
                                                                            // notification
            // Or better, send the updated balance
        } catch (Exception e) {
            log.error("Error processing transaction: {}", e.getMessage(), e);
        }
    }
}

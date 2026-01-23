package com.midas.core;

import com.midas.core.model.TransactionEvent;
import com.midas.core.model.TransactionType;
import com.midas.core.model.UserRecord;
import com.midas.core.repository.UserRepository;
import com.midas.core.service.KafkaProducerService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.kafka.test.context.EmbeddedKafka;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;
import java.time.Duration;

import static org.awaitility.Awaitility.await;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@DirtiesContext
@EmbeddedKafka(partitions = 1, brokerProperties = { "listeners=PLAINTEXT://localhost:9092", "port=9092" })
@ActiveProfiles("test")
class MidasApplicationTests {

    @Autowired
    private KafkaProducerService producerService;

    @Autowired
    private UserRepository userRepository;

    @Test
    void testTransactionFlow() {
        // Given
        UserRecord user = userRepository.save(new UserRecord(null, "testuser", "password", new BigDecimal("100.00")));

        // When: Deposit 50
        TransactionEvent deposit = TransactionEvent.builder()
                .userId(user.getId())
                .amount(new BigDecimal("50.00"))
                .type(TransactionType.DEPOSIT)
                .build();

        producerService.sendTransaction(deposit);

        // Then: Wait for balance update
        await().atMost(Duration.ofSeconds(10)).untilAsserted(() -> {
            UserRecord updatedUser = userRepository.findById(user.getId()).orElseThrow();
            assertEquals(0, new BigDecimal("150.00").compareTo(updatedUser.getBalance()));
        });

        // When: Withdraw 30
        TransactionEvent withdraw = TransactionEvent.builder()
                .userId(user.getId())
                .amount(new BigDecimal("30.00"))
                .type(TransactionType.WITHDRAWAL)
                .build();

        producerService.sendTransaction(withdraw);

        // Then: Wait for balance update
        await().atMost(Duration.ofSeconds(10)).untilAsserted(() -> {
            UserRecord updatedUser = userRepository.findById(user.getId()).orElseThrow();
            assertEquals(0, new BigDecimal("120.00").compareTo(updatedUser.getBalance()));
        });
    }
}

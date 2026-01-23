package com.midas.core.service;

import com.midas.core.model.TransactionRecord;
import com.midas.core.model.TransactionStatus;
import com.midas.core.model.TransactionType;
import com.midas.core.model.UserRecord;
import com.midas.core.repository.TransactionRepository;
import com.midas.core.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class TransactionService {

    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;

    @Transactional
    public void processTransaction(Long userId, BigDecimal amount, TransactionType type) {
        log.info("Processing transaction for user {}: {} {}", userId, type, amount);

        UserRecord user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));

        TransactionStatus status = TransactionStatus.APPROVED;

        if (type == TransactionType.WITHDRAWAL || type == TransactionType.TRANSFER) {
            if (user.getBalance().compareTo(amount) < 0) {
                log.warn("Insufficient funds for user {}", userId);
                status = TransactionStatus.REJECTED;
            } else {
                user.setBalance(user.getBalance().subtract(amount));
            }
        } else if (type == TransactionType.DEPOSIT) {
            user.setBalance(user.getBalance().add(amount));
        }

        if (status == TransactionStatus.APPROVED) {
            userRepository.save(user);
        }

        TransactionRecord record = TransactionRecord.builder()
                .userId(userId)
                .amount(amount)
                .type(type)
                .status(status)
                .timestamp(LocalDateTime.now())
                .build();

        transactionRepository.save(record);
        log.info("Transaction processed with status: {}", status);
    }
}

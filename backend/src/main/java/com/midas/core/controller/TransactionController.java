package com.midas.core.controller;

import com.midas.core.model.TransactionEvent;
import com.midas.core.model.UserRecord;
import com.midas.core.model.TransactionRecord;
import com.midas.core.repository.TransactionRepository;
import com.midas.core.repository.UserRepository;
import com.midas.core.service.KafkaProducerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // For demo simplicity
public class TransactionController {

    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;
    private final KafkaProducerService kafkaProducerService;

    @GetMapping("/users/{id}/balance")
    public ResponseEntity<UserRecord> getBalance(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/transactions")
    public ResponseEntity<String> createTransaction(@RequestBody TransactionEvent event) {
        kafkaProducerService.sendTransaction(event);
        return ResponseEntity.ok("Transaction submitted");
    }

    @GetMapping("/transactions/history")
    public ResponseEntity<List<TransactionRecord>> getHistory(@RequestParam Long userId) {
        return ResponseEntity.ok(transactionRepository.findByUserIdOrderByTimestampDesc(userId));
    }
}

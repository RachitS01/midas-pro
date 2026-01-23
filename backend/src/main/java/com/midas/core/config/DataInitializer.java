package com.midas.core.config;

import com.midas.core.model.UserRecord;
import com.midas.core.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository) {
        return args -> {
            if (userRepository.findByUsername("waldorf").isEmpty()) {
                userRepository.save(new UserRecord(null, "waldorf", "password", new BigDecimal("1000.00")));
                System.out.println("Seeded user 'waldorf' with balance 1000.00");
            }
        };
    }
}

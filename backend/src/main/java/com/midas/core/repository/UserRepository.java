package com.midas.core.repository;

import com.midas.core.model.UserRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserRecord, Long> {
    Optional<UserRecord> findByUsername(String username);
}

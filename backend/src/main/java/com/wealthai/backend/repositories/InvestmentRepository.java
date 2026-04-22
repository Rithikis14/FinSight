package com.wealthai.backend.repositories;

import com.wealthai.backend.entities.Investment;
import com.wealthai.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface InvestmentRepository extends JpaRepository<Investment, UUID> {
    List<Investment> findByUser(User user);
}
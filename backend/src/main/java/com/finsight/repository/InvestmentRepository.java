package com.finsight.repository;

import com.finsight.entity.Investment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface InvestmentRepository extends JpaRepository<Investment, UUID> {

    List<Investment> findByUserIdOrderByCreatedAtDesc(UUID userId);

    Optional<Investment> findByIdAndUserId(UUID id, UUID userId);

    @Query("SELECT SUM(i.currentPrice * i.quantity) FROM Investment i WHERE i.user.id = :userId")
    java.math.BigDecimal sumCurrentValueByUserId(UUID userId);

    @Query("SELECT SUM((i.currentPrice - i.avgBuyPrice) * i.quantity) FROM Investment i WHERE i.user.id = :userId")
    java.math.BigDecimal sumProfitLossByUserId(UUID userId);
}

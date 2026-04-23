package com.finsight.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "investments")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Investment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 10)
    private String ticker;

    @Column(nullable = false)
    private String assetName;

    @Column(nullable = false, precision = 15, scale = 4)
    private BigDecimal quantity;

    @Column(nullable = false, precision = 15, scale = 4)
    private BigDecimal avgBuyPrice;

    @Column(nullable = false, precision = 15, scale = 4)
    private BigDecimal currentPrice;

    @Column(nullable = false)
    private LocalDate purchaseDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AssetType assetType;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    // Computed helpers (not persisted)
    @Transient
    public BigDecimal getCurrentValue() {
        return currentPrice.multiply(quantity);
    }

    @Transient
    public BigDecimal getProfitLoss() {
        return getCurrentValue().subtract(avgBuyPrice.multiply(quantity));
    }

    @Transient
    public BigDecimal getProfitLossPct() {
        BigDecimal cost = avgBuyPrice.multiply(quantity);
        if (cost.compareTo(BigDecimal.ZERO) == 0) return BigDecimal.ZERO;
        return getProfitLoss().divide(cost, 4, java.math.RoundingMode.HALF_UP)
                .multiply(BigDecimal.valueOf(100));
    }

    public enum AssetType {
        STOCK, ETF, CRYPTO, BOND, MUTUAL_FUND, OTHER
    }
}

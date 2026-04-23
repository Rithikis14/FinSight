package com.finsight.dto;

import com.finsight.entity.Investment;
import jakarta.validation.constraints.*;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

// ── Auth DTOs ─────────────────────────────────────────────────────────────────

// ── Investment DTOs ───────────────────────────────────────────────────────────

public class InvestmentDTOs {

    @Data
    public static class CreateRequest {
        @NotBlank(message = "Ticker is required")
        @Size(max = 10)
        private String ticker;

        @NotBlank(message = "Asset name is required")
        private String assetName;

        @NotNull @DecimalMin("0.0001")
        private BigDecimal quantity;

        @NotNull @DecimalMin("0.01")
        private BigDecimal avgBuyPrice;

        @NotNull @DecimalMin("0.01")
        private BigDecimal currentPrice;

        @NotNull @PastOrPresent
        private LocalDate purchaseDate;

        @NotNull
        private Investment.AssetType assetType;
    }

    @Data @Builder
    public static class Response {
        private UUID id;
        private String ticker;
        private String assetName;
        private BigDecimal quantity;
        private BigDecimal avgBuyPrice;
        private BigDecimal currentPrice;
        private BigDecimal currentValue;
        private BigDecimal profitLoss;
        private BigDecimal profitLossPct;
        private LocalDate purchaseDate;
        private Investment.AssetType assetType;
        private LocalDateTime createdAt;
    }

    @Data @Builder
    public static class PortfolioSummary {
        private BigDecimal totalWealth;
        private BigDecimal totalProfitLoss;
        private BigDecimal totalProfitLossPct;
        private String riskLevel;
        private int totalHoldings;
    }
}

// ── AI DTOs ──────────────────────────────────────────────────────────────────


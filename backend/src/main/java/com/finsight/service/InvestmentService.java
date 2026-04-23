package com.finsight.service;

import com.finsight.dto.InvestmentDTOs;
import com.finsight.entity.Investment;
import com.finsight.entity.User;
import com.finsight.exception.ResourceNotFoundException;
import com.finsight.repository.InvestmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InvestmentService {

    private final InvestmentRepository investmentRepository;

    @Transactional
    public InvestmentDTOs.Response addInvestment(User user, InvestmentDTOs.CreateRequest request) {
        Investment investment = Investment.builder()
                .user(user)
                .ticker(request.getTicker().toUpperCase())
                .assetName(request.getAssetName())
                .quantity(request.getQuantity())
                .avgBuyPrice(request.getAvgBuyPrice())
                .currentPrice(request.getCurrentPrice())
                .purchaseDate(request.getPurchaseDate())
                .assetType(request.getAssetType())
                .build();
        return toResponse(investmentRepository.save(investment));
    }

    @Transactional(readOnly = true)
    public List<InvestmentDTOs.Response> getUserInvestments(UUID userId) {
        return investmentRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public InvestmentDTOs.PortfolioSummary getPortfolioSummary(UUID userId) {
        List<Investment> investments = investmentRepository.findByUserIdOrderByCreatedAtDesc(userId);
        BigDecimal totalWealth = investments.stream()
                .map(Investment::getCurrentValue)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal totalCost = investments.stream()
                .map(i -> i.getAvgBuyPrice().multiply(i.getQuantity()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal totalPL = totalWealth.subtract(totalCost);
        BigDecimal totalPLPct = totalCost.compareTo(BigDecimal.ZERO) == 0 ? BigDecimal.ZERO
                : totalPL.divide(totalCost, 4, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(100));

        return InvestmentDTOs.PortfolioSummary.builder()
                .totalWealth(totalWealth)
                .totalProfitLoss(totalPL)
                .totalProfitLossPct(totalPLPct)
                .riskLevel(calculateRiskLevel(investments))
                .totalHoldings(investments.size())
                .build();
    }

    @Transactional
    public void deleteInvestment(UUID investmentId, UUID userId) {
        Investment investment = investmentRepository.findByIdAndUserId(investmentId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Investment not found"));
        investmentRepository.delete(investment);
    }

    private String calculateRiskLevel(List<Investment> investments) {
        if (investments.isEmpty()) return "LOW";
        long cryptoCount = investments.stream()
                .filter(i -> i.getAssetType() == Investment.AssetType.CRYPTO).count();
        double cryptoRatio = (double) cryptoCount / investments.size();
        if (cryptoRatio > 0.5) return "HIGH";
        if (cryptoRatio > 0.2) return "MEDIUM";
        return "LOW";
    }

    private InvestmentDTOs.Response toResponse(Investment i) {
        return InvestmentDTOs.Response.builder()
                .id(i.getId())
                .ticker(i.getTicker())
                .assetName(i.getAssetName())
                .quantity(i.getQuantity())
                .avgBuyPrice(i.getAvgBuyPrice())
                .currentPrice(i.getCurrentPrice())
                .currentValue(i.getCurrentValue())
                .profitLoss(i.getProfitLoss())
                .profitLossPct(i.getProfitLossPct())
                .purchaseDate(i.getPurchaseDate())
                .assetType(i.getAssetType())
                .createdAt(i.getCreatedAt())
                .build();
    }
}

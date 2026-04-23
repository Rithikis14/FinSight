package com.finsight.controller;

import com.finsight.dto.InvestmentDTOs;
import com.finsight.entity.User;
import com.finsight.service.InvestmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/investments")
@RequiredArgsConstructor
public class InvestmentController {

    private final InvestmentService investmentService;

    @PostMapping
    public ResponseEntity<InvestmentDTOs.Response> addInvestment(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody InvestmentDTOs.CreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(investmentService.addInvestment(user, request));
    }

    @GetMapping
    public ResponseEntity<List<InvestmentDTOs.Response>> getInvestments(
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(investmentService.getUserInvestments(user.getId()));
    }

    @GetMapping("/summary")
    public ResponseEntity<InvestmentDTOs.PortfolioSummary> getSummary(
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(investmentService.getPortfolioSummary(user.getId()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInvestment(
            @AuthenticationPrincipal User user,
            @PathVariable UUID id) {
        investmentService.deleteInvestment(id, user.getId());
        return ResponseEntity.noContent().build();
    }
}

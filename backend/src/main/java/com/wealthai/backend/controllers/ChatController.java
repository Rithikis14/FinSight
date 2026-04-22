package com.wealthai.backend.controllers;

import com.wealthai.backend.entities.Investment;
import com.wealthai.backend.entities.User;
import com.wealthai.backend.repositories.InvestmentRepository;
import com.wealthai.backend.repositories.UserRepository;
import com.wealthai.backend.services.AIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:5173")
public class ChatController {

    @Autowired
    private AIService aiService;

    @Autowired
    private InvestmentRepository investmentRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/analyze")
    public String getAnalysis(@RequestParam UUID userId, @RequestParam String message) {
        // 1. Fetch user's real holdings
        User user = userRepository.findById(userId).orElseThrow();
        List<Investment> holdings = investmentRepository.findByUser(user);

        // 2. Use AIService to get RAG-powered advice
        return aiService.analyzePortfolio(holdings, message);
    }
}
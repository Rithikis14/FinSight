package com.wealthai.backend.controllers;

import com.wealthai.backend.entities.Investment;
import com.wealthai.backend.entities.User;
import com.wealthai.backend.repositories.InvestmentRepository;
import com.wealthai.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/investments")
@CrossOrigin(origins = "http://localhost:5173")
public class InvestmentController {

    @Autowired
    private InvestmentRepository investmentRepository;

    @Autowired
    private UserRepository userRepository;

    // Add a manual investment
    @PostMapping("/add")
    public ResponseEntity<?> addInvestment(@RequestParam UUID userId, @RequestBody Investment investment) {
        return userRepository.findById(userId).map(user -> {
            investment.setUser(user);
            investmentRepository.save(investment);
            return ResponseEntity.ok("Investment added successfully!");
        }).orElse(ResponseEntity.badRequest().body("User not found"));
    }

    // Get all investments for a user
    @GetMapping("/user/{userId}")
    public List<Investment> getUserInvestments(@PathVariable UUID userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return investmentRepository.findByUser(user);
    }
}
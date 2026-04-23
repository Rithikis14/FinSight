package com.finsight.controller;

import com.finsight.dto.AiDTOs;
import com.finsight.entity.User;
import com.finsight.service.AiService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService;

    @PostMapping("/chat")
    public ResponseEntity<AiDTOs.ChatResponse> chat(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody AiDTOs.ChatRequest request) {
        return ResponseEntity.ok(aiService.chat(user, request));
    }
}

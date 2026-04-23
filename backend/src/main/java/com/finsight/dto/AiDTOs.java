package com.finsight.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

public class AiDTOs {

    @Data
    public static class ChatRequest {
        @NotBlank(message = "Message cannot be empty")
        @Size(max = 2000)
        private String message;
    }

    @Data
    @Builder
    public static class ChatResponse {
        private String response;
        private long processingTimeMs;
    }
}

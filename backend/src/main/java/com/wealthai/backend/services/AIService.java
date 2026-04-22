package com.wealthai.backend.services;

import com.wealthai.backend.entities.Investment;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.QuestionAnswerAdvisor;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AIService {

    private final ChatClient chatClient;
    private final VectorStore vectorStore; // This will hold your RAG data

    public AIService(ChatClient.Builder builder, VectorStore vectorStore) {
        // Fix: Properly initialize the final field
        this.vectorStore = vectorStore;

        // Set up the ChatClient with a System Prompt and the RAG Advisor
        this.chatClient = builder
                .defaultSystem("You are a professional financial advisor. Use the provided context and the user's portfolio to give concise, data-driven advice.")
                .defaultAdvisors(new QuestionAnswerAdvisor(vectorStore)) // Enables RAG retrieval
                .build();
    }

    public String analyzePortfolio(List<Investment> holdings, String userMessage) {
        // 1. Format the user's current holdings into a readable string for the AI context
        String portfolioContext = holdings.stream()
                .map(i -> String.format("%s (%s): %.2f units at ₹%.2f", 
                    i.getAssetName(), i.getTicker(), i.getQuantity(), i.getBuyPrice()))
                .collect(Collectors.joining("\n"));

        // 2. Construct the final prompt combining portfolio data and user query
        String prompt = String.format(
                "Here is my current portfolio:\n%s\n\nQuestion: %s",
                portfolioContext,
                userMessage
        );

        // 3. Call Ollama (locally) and retrieve the generated response
        String response = chatClient.prompt()
                .user(prompt)
                .call()
                .content();

        // 4. Return the response or a fallback message if the AI is silent
        return (response != null) ? response : "I'm sorry, I couldn't generate an analysis at this time.";
    }
}
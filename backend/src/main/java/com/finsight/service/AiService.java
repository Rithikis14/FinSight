package com.finsight.service;

import com.finsight.dto.AiDTOs;
import com.finsight.entity.Investment;
import com.finsight.entity.User;
import com.finsight.repository.InvestmentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.QuestionAnswerAdvisor;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AiService {

    private final ChatClient.Builder chatClientBuilder;
    private final VectorStore vectorStore;
    private final InvestmentRepository investmentRepository;

    private static final String SYSTEM_PROMPT = """
            You are FinSight AI, a professional investment analyst assistant.
            You provide clear, data-driven investment insights based on the user's portfolio.
            Always:
            - Reference specific holdings from the user's portfolio when relevant
            - Provide balanced perspectives on risk and opportunity
            - Add a disclaimer that this is not financial advice
            - Be concise and actionable
            Never:
            - Make guaranteed return promises
            - Recommend specific buy/sell actions without caveats
            """;

    public AiDTOs.ChatResponse chat(User user, AiDTOs.ChatRequest request) {
        long startTime = System.currentTimeMillis();

        // Build portfolio context string
        String portfolioContext = buildPortfolioContext(user);

        // Build enriched user message with portfolio context
        String enrichedMessage = String.format("""
                User Portfolio Context:
                %s
                
                User Question: %s
                """, portfolioContext, request.getMessage());

        ChatClient chatClient = chatClientBuilder
                .defaultSystem(SYSTEM_PROMPT)
                .defaultAdvisors(new QuestionAnswerAdvisor(vectorStore))
                .build();

        String response = chatClient.prompt()
                .user(enrichedMessage)
                .call()
                .content();

        return AiDTOs.ChatResponse.builder()
                .response(response)
                .processingTimeMs(System.currentTimeMillis() - startTime)
                .build();
    }

    private String buildPortfolioContext(User user) {
        List<Investment> investments = investmentRepository
                .findByUserIdOrderByCreatedAtDesc(user.getId());

        if (investments.isEmpty()) {
            return "The user has no investments in their portfolio yet.";
        }

        BigDecimal totalWealth = investments.stream()
                .map(Investment::getCurrentValue)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        String holdings = investments.stream()
                .map(i -> String.format("- %s (%s): %.4f units @ $%.2f avg, current $%.2f, P&L: $%.2f (%.2f%%)",
                        i.getTicker(), i.getAssetType(),
                        i.getQuantity(), i.getAvgBuyPrice(),
                        i.getCurrentPrice(), i.getProfitLoss(), i.getProfitLossPct()))
                .collect(Collectors.joining("\n"));

        return String.format("""
                Total Portfolio Value: $%.2f
                Holdings:
                %s
                """, totalWealth, holdings);
    }
}

package com.wealthai.backend.config;

import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class RAGConfig {

    @Bean
    CommandLineRunner loadKnowledgeBase(VectorStore vectorStore) {
        return args -> {
            // In a production app, you would read this from a PDF or Text file.
            // For now, let's add some core investment principles manually.
            List<Document> documents = List.of(
                new Document("Diversification: Never put more than 20% of your wealth into a single sector like Tech or Finance."),
                new Document("Risk Management: Always keep 10% of your portfolio in Gold or Liquid cash for market crashes."),
                new Document("HDFC Bank is a leading Indian private sector bank known for consistent dividend payouts.")
            );

            System.out.println("--- Loading Knowledge Base into Vector Database ---");
            vectorStore.add(documents);
            System.out.println("--- RAG Initialization Complete ---");
        };
    }
}
package com.finsight.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class RagDataLoader implements CommandLineRunner {

    private final VectorStore vectorStore;

    @Override
    public void run(String... args) {
        log.info("Loading investment knowledge base into vector store...");
        try {
            List<Document> documents = List.of(
                new Document("Diversification is a risk management strategy that mixes different investments in a portfolio. The rationale is that a portfolio of different kinds of investments will, on average, yield higher long-term returns and lower the risk of any individual holding or security."),
                new Document("Dollar-cost averaging (DCA) is an investment strategy where an investor divides up the total amount to be invested across periodic purchases in an effort to reduce the impact of volatility on the overall purchase."),
                new Document("The price-to-earnings ratio (P/E ratio) relates a company's share price to its earnings per share. A high P/E could mean that a stock's price is expensive relative to earnings, while a low P/E suggests the price is cheap."),
                new Document("Volatility refers to how much and how quickly prices move over a given span of time. In the stock market, high volatility is often associated with big swings in either direction and increased risk."),
                new Document("A bear market is when a market experiences prolonged price declines, typically 20% or more from recent highs. Bull markets are periods of rising prices. Understanding market cycles helps investors make informed decisions."),
                new Document("Risk tolerance is an investor's ability and willingness to lose some or all of an investment in exchange for greater potential returns. Age, income, financial goals, and investment timeline all influence risk tolerance."),
                new Document("Exchange-traded funds (ETFs) are baskets of securities that trade on an exchange like a stock. They typically have lower fees than mutual funds and provide instant diversification."),
                new Document("Cryptocurrency investments are highly volatile and speculative. Bitcoin, Ethereum and other cryptocurrencies can experience 50-80% drawdowns. They should represent a small portion of a diversified portfolio for most investors."),
                new Document("Rebalancing is the process of realigning the weightings of a portfolio's assets to maintain an original desired level of asset allocation or risk. It involves periodically buying or selling assets to maintain a target allocation."),
                new Document("Compound interest is interest calculated on the initial principal which also includes all of the accumulated interest of previous periods. Einstein called it the eighth wonder of the world — the longer you invest, the more powerful the compounding effect.")
            );
            vectorStore.add(documents);
            log.info("Successfully loaded {} documents into vector store.", documents.size());
        } catch (Exception e) {
            log.warn("Could not load RAG documents (vector store may not be ready): {}", e.getMessage());
        }
    }
}

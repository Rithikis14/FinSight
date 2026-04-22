package com.wealthai.backend.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "investments")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Investment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String ticker;      // e.g., "RELIANCE", "TATASTEEL"

    @Column(nullable = false)
    private String assetName;   // e.g., "Reliance Industries Ltd"

    @Column(nullable = false)
    private Double quantity;

    @Column(nullable = false)
    private Double buyPrice;    // Average buy price

    private LocalDate purchaseDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;          // Connects this investment to a specific user
}
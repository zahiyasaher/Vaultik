package com.bankapp.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;

    @ManyToOne
    @JoinColumn(name = "from_account", nullable = true)  // ✅ Allow NULL for deposits
    private Account fromAccount; // NULL for deposits

    @ManyToOne
    @JoinColumn(name = "to_account", nullable = true)
    private Account toAccount;

    @Column(nullable = false)
    private double amount;

    @Column(nullable = false)
    private String transactionType; // "Deposit", "Withdrawal", "Transfer"

    @Column(nullable = false)
    private LocalDateTime timestamp = LocalDateTime.now();
}

// Logs deposits, withdrawals, and transfers.
// Transfers have a to_account, withdrawals don’t.


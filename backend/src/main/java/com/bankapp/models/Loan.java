package com.bankapp.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "loans")
public class Loan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long loanId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "loan_type_id", nullable = false)
    private LoanType loanType; // Reference to LoanType entity

    @Column(nullable = false)
    private double amount;

    @Column(nullable = false)
    private int duration; // In months

    @Column(nullable = false)
    private double currentSalary; // New field

    @Column(nullable = false)
    private String status = "Pending"; // Pending, Approved, Rejected

    @Column(nullable = false)
    private double remainingAmount; // New field: Remaining amount to be paid

    @ManyToOne
    @JoinColumn(name = "approved_by")
    private Admin approvedBy; // NULL if not approved

    @Column(nullable = false)
    private LocalDateTime appliedAt = LocalDateTime.now();
}

//Users can apply for loans, and admins approve them.
//The admin who approves the loan is recorded.


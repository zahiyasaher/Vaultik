package com.bankapp.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "loan_types")
public class LoanType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String type;  // e.g., Home Loan, Car Loan, Personal Loan
    
    @Column(nullable = false)
    private double interestRate;  // Fixed interest rate
}

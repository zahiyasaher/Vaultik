package com.bankapp.controllers;

import com.bankapp.models.Loan;
import com.bankapp.models.LoanRepayment;
import com.bankapp.services.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.bankapp.models.LoanType;
import com.bankapp.repositories.LoanTypeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/loans")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true") // Allow requests from
                                                                                                 // React app

public class LoanController {

    @Autowired
    private LoanService loanService;

    @Autowired
    private LoanTypeRepository loanTypeRepository;

    @PostMapping("/apply/{userId}")
    public Loan applyForLoan(
            @PathVariable Long userId,
            @RequestParam String loanType, // Loan type as a request parameter
            @RequestBody Loan loan) {
        return loanService.applyForLoan(loan, userId, loanType);
    }

    @GetMapping("/user/{userId}")
    public List<Loan> getUserLoans(@PathVariable Long userId) {
        return loanService.getUserLoans(userId);
    }


    @PostMapping("/repay/{loanId}")
    public LoanRepayment repayLoan(
            @PathVariable Long loanId,
            @RequestParam double amount) {
        return loanService.repayLoan(loanId, amount);
    }

    @GetMapping("/types")
    public List<LoanType> getAllLoanTypes() {
        return loanTypeRepository.findAll();
    }

    // Fetch repayment history for a specific loan (for users)
    @GetMapping("/repayments/{loanId}")
    public ResponseEntity<?> getLoanRepaymentsForUser(@PathVariable Long loanId, @RequestParam Long userId) {
        try {
            // Fetch the loan to ensure it belongs to the user
            Loan loan = loanService.getLoanById(loanId);
            if (!loan.getUser().getId().equals(userId)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("You are not authorized to view this loan's repayment history.");
            }

            // Fetch the repayment history
            List<LoanRepayment> repayments = loanService.getLoanRepayments(loanId);
            return ResponseEntity.ok(repayments);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/count/{userId}")
    public int countLoansByUserId(@PathVariable Long userId) {
        return loanService.countLoansByUserId(userId);
    }
}
// comment
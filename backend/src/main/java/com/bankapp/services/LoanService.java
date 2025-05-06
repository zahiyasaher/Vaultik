package com.bankapp.services;

import com.bankapp.models.Account;
import com.bankapp.models.Admin;
import com.bankapp.models.Loan;
import com.bankapp.models.LoanRepayment;
import com.bankapp.models.LoanType;
import com.bankapp.models.User;
import com.bankapp.repositories.AccountRepository;
import com.bankapp.repositories.AdminRepository;
import com.bankapp.repositories.LoanRepaymentRepository;
import com.bankapp.repositories.LoanRepository;
import com.bankapp.repositories.LoanTypeRepository;
import com.bankapp.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.math.RoundingMode;

@Service
public class LoanService {

    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private UserRepository userRepository; // Add this dependency

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private LoanTypeRepository loanTypeRepository;

    @Autowired
    private LoanRepaymentRepository loanRepaymentRepository;

    @Autowired
    private AccountRepository accountRepository;

    public Loan applyForLoan(Loan loan, Long userId, String loanType) {
        // Fetch the user from the database
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Fetch the loan type and interest rate from the database
        LoanType type = loanTypeRepository.findByType(loanType);
        if (type == null) {
            throw new RuntimeException("Loan type not found");
        }

        // Set the user in the loan object
        loan.setUser(user);
        loan.setLoanType(type);

        // Save the loan
        return loanRepository.save(loan);
    }

    public List<Loan> getUserLoans(Long userId) {
        // Fetch all loans for the user
        return loanRepository.findByUser_Id(userId);
    }

    // ✅ Admin can view all pending loans
    public List<Loan> getPendingLoans() {
        return loanRepository.findByStatus("Pending");
    }

    // ✅ Admin can view all loans (approved, rejected, pending)
    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }

    // Fetch a loan by its ID
    public Loan getLoanById(Long loanId) {
        return loanRepository.findById(loanId)
                .orElseThrow(() -> new RuntimeException("Loan not found"));
    }

    
    public Loan approveLoan(Long loanId, String status, Long adminId) {
        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new RuntimeException("Loan not found"));

        if (!"Pending".equals(loan.getStatus())) {
            throw new RuntimeException("Loan is not in pending status");
        }

        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        loan.setApprovedBy(admin);
        loan.setStatus(status);

        if ("Approved".equals(status)) {
            Account account = accountRepository.findByUser(loan.getUser())
                    .orElseThrow(() -> new RuntimeException("Account not found"));

            BigDecimal loanAmount = BigDecimal.valueOf(loan.getAmount())
                .setScale(2, RoundingMode.HALF_UP);
            account.setBalance(account.getBalance().add(loanAmount));
            accountRepository.save(account);

            loan.setRemainingAmount(loan.getAmount());
        }

        return loanRepository.save(loan);
    }

    public List<LoanRepayment> getLoanRepayments(Long loanId) {
        return loanRepaymentRepository.findByLoan_LoanId(loanId);
    }

    
    public LoanRepayment repayLoan(Long loanId, double amount) {
        if (amount <= 0) {
            throw new RuntimeException("Repayment amount must be positive");
        }
    
        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new RuntimeException("Loan not found"));
    
        if (!"Approved".equals(loan.getStatus())) {
            throw new RuntimeException("Cannot repay a loan that is not approved");
        }
    
        if (loan.getRemainingAmount() <= 0) {
            throw new RuntimeException("Loan is already fully repaid");
        }
    
        // Reject if user is trying to pay more than remaining
        if (amount > loan.getRemainingAmount()) {
            throw new RuntimeException(String.format(
                "Repayment amount (%.2f) exceeds remaining loan amount (%.2f)",
                amount, loan.getRemainingAmount()
            ));
        }
    
        Account account = accountRepository.findByUser(loan.getUser())
                .orElseThrow(() -> new RuntimeException("Account not found"));
    
        BigDecimal repaymentAmount = BigDecimal.valueOf(amount)
            .setScale(2, RoundingMode.HALF_UP);
        BigDecimal accountBalance = account.getBalance();
    
        if (accountBalance.compareTo(repaymentAmount) < 0) {
            throw new RuntimeException("Insufficient account balance for repayment");
        }
    
        // Deduct from account
        account.setBalance(accountBalance.subtract(repaymentAmount));
        accountRepository.save(account);
    
        // Create repayment record
        LoanRepayment repayment = new LoanRepayment();
        repayment.setLoan(loan);
        repayment.setAmountPaid(amount);
        loanRepaymentRepository.save(repayment);
    
        // Update loan remaining amount
        double newRemaining = loan.getRemainingAmount() - amount;
        loan.setRemainingAmount(Math.max(0, newRemaining));
    
        if (loan.getRemainingAmount() <= 0) {
            loan.setStatus("Repaid");
        }
    
        loanRepository.save(loan);
    
        return repayment;
    }
    

    public int countLoansByUserId(Long userId) {
        return loanRepository.countByUser_Id(userId);
    }
}

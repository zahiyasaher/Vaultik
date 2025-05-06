package com.bankapp.controllers;

import com.bankapp.models.Admin;
import com.bankapp.models.Loan;
import com.bankapp.models.LoanRepayment;
import com.bankapp.services.AdminService;
import com.bankapp.services.LoanService;
import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Map;
import java.math.BigDecimal;
import com.bankapp.services.TransactionService;
import com.bankapp.services.UserService;
import com.bankapp.models.User;

@RestController
@RequestMapping("/api/admins")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true") // Allow requests from
                                                                                                 // React app
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private LoanService loanService;

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private UserService userService;

    // ✅ Admin Login (No Registration)
    @PostMapping("/login")
    public ResponseEntity<?> adminLogin(@RequestParam String username, @RequestParam String password) {
        System.out.println("username: " + username);
        System.out.println("password: " + password);
        Admin admin = adminService.authenticateAdmin(username, password);
        if (admin == null) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
        return ResponseEntity.ok(admin);
    }

    @GetMapping("/repayments/{loanId}")
    public List<LoanRepayment> getLoanRepayments(@PathVariable Long loanId) {
        return loanService.getLoanRepayments(loanId);
    }

    @GetMapping("/users/{userId}/loans")
    public List<Loan> getUserLoans(@PathVariable Long userId) {
        return loanService.getUserLoans(userId);
    }

    // ✅ Admin: View all users
    @GetMapping("/users/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // ✅ Admin: View all loans
    @GetMapping("/loans/all")
    public List<Loan> getAllLoans() {
        return loanService.getAllLoans();
    }

    // ✅ Admin: View pending loans
    @GetMapping("/loans/pending")
    public List<Loan> getPendingLoans() {
        return loanService.getPendingLoans();
    }

    // ✅ Admin: Approve or reject loans
    @PutMapping("/loans/approve/{loanId}")
    public Loan approveLoan(@PathVariable Long loanId, @RequestParam String status, @RequestParam Long adminId) {
        return loanService.approveLoan(loanId, status, adminId);
    }

    @GetMapping("/most-active")
    public List<Object[]> getMostActiveUsers() {
        return userService.getMostActiveUsers();
    }

    @GetMapping("/high-value")
    public List<Object[]> getHighValueTransfers(@RequestParam BigDecimal amount) {
        System.out.println("amount "+ amount);
        return transactionService.getHighValueTransfers(amount);
    }

    // ✅ Fetch total transaction summary (deposits & withdrawals) for each user
    @GetMapping("/transaction-summary")
    public List<Map<String, Object>> getTotalTransactionSummaryForAllUsers() {
        return transactionService.getTotalDepositWithdrawalSummaryForAllUsers();
    }

    @GetMapping("/low-balance")
    public List<Object[]> getUsersWithLowBalance(@RequestParam BigDecimal threshold) {
        return userService.getUsersWithLowBalance(threshold);
    }
}

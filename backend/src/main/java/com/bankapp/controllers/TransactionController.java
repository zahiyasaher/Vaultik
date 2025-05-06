package com.bankapp.controllers;

import com.bankapp.models.Transaction;
import com.bankapp.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true") // Allow requests from React app

public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    // ✅ Deposit Money
    // @PostMapping("/deposit")
    // public Transaction deposit(@RequestBody Transaction transaction) {
    //     transaction.setTransactionType("Deposit"); // Ensure transaction type is set
    //     return transactionService.saveTransaction(transaction);
    // }

    // ✅ Transfer Money
    @PostMapping("/transfer")
    public Transaction transfer(@RequestBody Transaction transaction) {
        //transaction.setTransactionType("Transfer"); // Ensure transaction type is set
        return transactionService.saveTransaction(transaction);
    }

    // ✅ Get Transactions for an Account
    @GetMapping("/account/{id}")
    public List<Transaction> getTransactionsForAccount(@PathVariable long id) {
        return transactionService.getTransactionsForAccount(id);
    }

    // ✅ Admin: View all transactions
    @GetMapping("/all")
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }
}

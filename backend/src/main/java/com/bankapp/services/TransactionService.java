package com.bankapp.services;

import com.bankapp.models.Account;
import com.bankapp.models.MiniStatement;
import com.bankapp.models.Transaction;
import com.bankapp.repositories.AccountRepository;
import com.bankapp.repositories.MiniStatementRepository;
import com.bankapp.repositories.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.Map;
import java.util.HashMap;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AccountRepository accountRepository;
    
     @Autowired
    private MiniStatementRepository miniStatementRepository;

    public Transaction saveTransaction(Transaction transaction) {
        if (transaction.getTransactionType().equalsIgnoreCase("Deposit")) {
            Optional<Account> optionalAccount = accountRepository.findByAccountNumber(transaction.getToAccount().getAccountNumber());
            if (optionalAccount.isEmpty()) {
                throw new RuntimeException("Account not found.");
            }
            Account toAccount = optionalAccount.get();
    
            toAccount.setBalance(toAccount.getBalance().add(BigDecimal.valueOf(transaction.getAmount())));
            accountRepository.save(toAccount);
    
            transaction.setFromAccount(null); // Ensure sender is null for deposit
            transaction.setToAccount(toAccount);
             Transaction savedTransaction = transactionRepository.save(transaction);

            // ✅ Save MiniStatement
            MiniStatement miniStatement = new MiniStatement();
            miniStatement.setAccount(toAccount);
            miniStatement.setTransaction(savedTransaction);
            miniStatement.setDescription("Deposit of ₹" + transaction.getAmount());
            miniStatementRepository.save(miniStatement);

            return savedTransaction;
        }
    
        if (transaction.getTransactionType().equalsIgnoreCase("Transfer")) {
            if (transaction.getFromAccount() == null || transaction.getToAccount() == null) {
                throw new RuntimeException("Both sender and receiver accounts must be provided for a transfer.");
            }
    
            // ✅ Fetch accounts from the database
            Account fromAccount = accountRepository.findByAccountNumber(transaction.getFromAccount().getAccountNumber())
                    .orElseThrow(() -> new RuntimeException("Sender account not found"));
            Account toAccount = accountRepository.findByAccountNumber(transaction.getToAccount().getAccountNumber())
                    .orElseThrow(() -> new RuntimeException("Receiver account not found"));
    
            // ✅ Ensure these objects are attached to the transaction (fixes transient issue)
            transaction.setFromAccount(fromAccount);
            transaction.setToAccount(toAccount);
    
            if (fromAccount.getBalance().compareTo(BigDecimal.valueOf(transaction.getAmount())) < 0) {
                throw new RuntimeException("Insufficient balance.");
            }
    
            fromAccount.setBalance(fromAccount.getBalance().subtract(BigDecimal.valueOf(transaction.getAmount())));
            toAccount.setBalance(toAccount.getBalance().add(BigDecimal.valueOf(transaction.getAmount())));
    
            accountRepository.save(fromAccount);
            accountRepository.save(toAccount);
    
            Transaction savedTransaction = transactionRepository.save(transaction);

            // ✅ Save MiniStatement for Sender
            MiniStatement senderMiniStatement = new MiniStatement();
            senderMiniStatement.setAccount(fromAccount);
            senderMiniStatement.setTransaction(savedTransaction);
            senderMiniStatement.setDescription("Transfer sent of ₹" + transaction.getAmount() + " to A/c " + toAccount.getAccountNumber());
            miniStatementRepository.save(senderMiniStatement);

            // ✅ Save MiniStatement for Receiver
            MiniStatement receiverMiniStatement = new MiniStatement();
            receiverMiniStatement.setAccount(toAccount);
            receiverMiniStatement.setTransaction(savedTransaction);
            receiverMiniStatement.setDescription("Transfer received of ₹" + transaction.getAmount() + " from A/c " + fromAccount.getAccountNumber());
            miniStatementRepository.save(receiverMiniStatement);

            return savedTransaction;
        }
    
         // ✅ Withdrawal Feature (NEWLY ADDED)
         if (transaction.getTransactionType().equalsIgnoreCase("Withdraw")) {
            if (transaction.getFromAccount() == null) {
                throw new RuntimeException("Account must be provided for withdrawal.");
            }

            // Fetch account from database
            Account fromAccount = accountRepository.findByAccountNumber(transaction.getFromAccount().getAccountNumber())
                    .orElseThrow(() -> new RuntimeException("Account not found"));

            if (fromAccount.getBalance().compareTo(BigDecimal.valueOf(transaction.getAmount())) < 0) {
                throw new RuntimeException("Insufficient balance.");
            }

            // Deduct amount from the account
            fromAccount.setBalance(fromAccount.getBalance().subtract(BigDecimal.valueOf(transaction.getAmount())));
            accountRepository.save(fromAccount);

            transaction.setToAccount(null);  // No recipient for withdrawal
            transaction.setFromAccount(fromAccount);
            Transaction savedTransaction = transactionRepository.save(transaction);

            // ✅ Save MiniStatement
            MiniStatement miniStatement = new MiniStatement();
            miniStatement.setAccount(fromAccount);
            miniStatement.setTransaction(savedTransaction);
            miniStatement.setDescription("Withdrawal of ₹" + transaction.getAmount());
            miniStatementRepository.save(miniStatement);

            return savedTransaction;
        }

        return transactionRepository.save(transaction);
    }
    
    
    

    public List<Transaction> getTransactionsForAccount(Long id) {
        return transactionRepository.findTransactionsByAccount(id);
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public List<Map<String, Object>> getTotalDepositWithdrawalSummaryForAllUsers() {
        List<Object[]> results = transactionRepository.getTotalDepositWithdrawalSummaryForAllUsers();
        return results.stream().map(obj -> {
            Map<String, Object> summary = new HashMap<>();
            summary.put("userId", obj[0]);
            summary.put("username", obj[1]);
            summary.put("accountNumber", obj[2]);
            summary.put("totalDeposits", obj[3]);
            summary.put("totalWithdrawals", obj[4]);
            return summary;
        }).toList();
    }

    public List<Object[]> getHighValueTransfers(BigDecimal amount) {
        return transactionRepository.getHighValueTransfers(amount);
    }
}

package com.bankapp.services;

import com.bankapp.models.Account;
import com.bankapp.models.User;
import com.bankapp.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.Optional;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    // ✅ Create account and ensure it's linked to a user
    public Account createAccount(User user) {
        String accountNumber = generateUniqueAccountNumber(); // Generate unique account number
        Account newAccount = new Account(accountNumber, user);
        return accountRepository.save(newAccount);
    }

    // ✅ Fetch account by account number
    public Optional<Account> getAccountByNumber(String accountNumber) {
        return accountRepository.findByAccountNumber(accountNumber);
    }

    // ✅ Generate a unique 10-digit account number
    private String generateUniqueAccountNumber() {
        return String.valueOf((long) (Math.random() * 9000000000L) + 1000000000L);
    }
}

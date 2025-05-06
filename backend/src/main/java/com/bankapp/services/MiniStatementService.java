package com.bankapp.services;

import com.bankapp.models.MiniStatement;
import com.bankapp.repositories.MiniStatementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bankapp.models.Account;
import com.bankapp.repositories.AccountRepository;
import java.util.List;

@Service
public class MiniStatementService {
    
    @Autowired
    private MiniStatementRepository miniStatementRepository;

    @Autowired
    private AccountRepository accountRepository;

    public List<MiniStatement> getMiniStatement(String accountNumber) {
        Account account = accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        return miniStatementRepository.findRecentMiniStatementsByAccountId(account.getId());
    }
}

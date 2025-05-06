package com.bankapp.controllers;

import com.bankapp.models.Account;
import com.bankapp.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.bankapp.models.User;
import com.bankapp.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import java.util.Optional;

@RestController
@RequestMapping("/api/accounts")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true") // Allow requests from React app
public class AccountController {

    // @Autowired
    // private AccountService accountService;

    @Autowired
    private UserService userService; // ✅ Inject UserService

    @GetMapping("/balance")
    public Account getMyAccount(@RequestParam String username) {
        User user = userService.getUserByUsername(username);
        
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }

        Account account = user.getAccount();
        
        if (account == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Account not found");
        }

        return account;
    }
}

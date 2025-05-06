package com.bankapp.controllers;

import com.bankapp.models.MiniStatement;
import com.bankapp.services.MiniStatementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ministatements")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true") // Allow requests from React app

public class MiniStatementController {

    @Autowired
    private MiniStatementService miniStatementService;

    @GetMapping("/{accountNumber}")
    public List<MiniStatement> getMiniStatement(@PathVariable String accountNumber) {
        return miniStatementService.getMiniStatement(accountNumber);
    }
}

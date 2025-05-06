package com.bankapp.controllers;

import com.bankapp.models.User;
import com.bankapp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true") // Allow requests from
                                                                                                 // React app
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @GetMapping("/{username}")
    public User getUserByUsername(@PathVariable String username) {
        return userService.getUserByUsername(username);
    }

    @GetMapping("/account/{accountNumber}")
    public Optional<User> getUserByAccountNumber(@PathVariable String accountNumber) {
        return userService.getUserByAccountNumber(accountNumber);
    }


    // ✅ Fetch user with account details
    @GetMapping("/account-details/{userId}")
    public List<Object[]> getUserWithAccount(@PathVariable Long userId) {
        return userService.getUserWithAccount(userId);
    }

    // ✅ Update Password
    @PutMapping("/update/password")
    public boolean updatePassword(@RequestParam String username, @RequestParam String newPassword) {
        return userService.updateUserPassword(username, newPassword);
    }

    // ✅ Update Address
    @PutMapping("/update/address")
    public boolean updateAddress(@RequestParam String username, @RequestParam String newAddress) {
        return userService.updateUserAddress(username, newAddress);
    }

    // ✅ Update Pincode
    @PutMapping("/update/pincode")
    public boolean updatePincode(@RequestParam String username, @RequestParam String newPincode) {
        return userService.updateUserPincode(username, newPincode);
    }

    // ✅ Update Pincode
    @PutMapping("/update/email")
    public boolean updateEmail(@RequestParam String username, @RequestParam String newEmail) {
        return userService.updateUserEmail(username, newEmail);
    }


}

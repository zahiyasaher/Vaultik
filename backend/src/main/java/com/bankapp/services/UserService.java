package com.bankapp.services;

import com.bankapp.models.User;
import com.bankapp.models.Account;
import com.bankapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.math.BigDecimal;
import com.bankapp.services.AccountService; // ✅ Import AccountService

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountService accountService; // ✅ Inject AccountService

    // ✅ Register user and create an account
    public User registerUser(User user) {
        User savedUser = userRepository.save(user);

        // ✅ Create an account linked to the user
        Account newAccount = accountService.createAccount(savedUser);
        savedUser.setAccount(newAccount);
        userRepository.save(savedUser); // ✅ Save user with the linked account

        return savedUser;
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // ✅ Fetch user by account number via AccountService
    public Optional<User> getUserByAccountNumber(String accountNumber) {
        Optional<Account> account = accountService.getAccountByNumber(accountNumber);
        return account.map(Account::getUser);
    }

    // ✅ Admin can view all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User authenticateUser(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }

    // ✅ Fetch user with account details
    public List<Object[]> getUserWithAccount(Long userId) {
        return userRepository.getUserWithAccount(userId);
    }

    // ✅ Update User Password
    public boolean updateUserPassword(String username, String newPassword) {
        try {
            User user = userRepository.findByUsername(username);
            if (user == null) {
                throw new RuntimeException("User not found");
            }
            user.setPassword(newPassword); // Ensure password is hashed before saving
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // ✅ Update User Password
    public boolean updateUserEmail(String username, String newEmail) {
        try {
            User user = userRepository.findByUsername(username);
            if (user == null) {
                throw new RuntimeException("User not found");
            }
            user.setEmail(newEmail); // Ensure password is hashed before saving
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // ✅ Update User Address
    public boolean updateUserAddress(String username, String newAddress) {
        try {
            User user = userRepository.findByUsername(username);
            if (user == null) {
                throw new RuntimeException("User not found");
            }
            user.setAddress(newAddress);
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean updateUserPincode(String username, String newPincode) {
        try {
            User user = userRepository.findByUsername(username);
            if (user == null) {
                throw new RuntimeException("User not found");
            }
            user.setPincode(newPincode);
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public List<Object[]> getUsersWithLowBalance(BigDecimal threshold) {
        return userRepository.getUsersWithLowBalance(threshold);
    }

    public List<Object[]> getMostActiveUsers() {
        return userRepository.getMostActiveUsers();
    }

}

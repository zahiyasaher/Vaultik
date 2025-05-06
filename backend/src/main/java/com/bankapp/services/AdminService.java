package com.bankapp.services;

import com.bankapp.models.Admin;
import com.bankapp.repositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {
    
    @Autowired
    private AdminRepository adminRepository;

    // ✅ Admin login method (No registration, admins manually added)
    public Admin getAdminByUsername(String username) {
        return adminRepository.findByUsername(username);
    }

    public Admin authenticateAdmin(String username, String password) {
        Admin admin = adminRepository.findByUsername(username);
        if (admin != null && admin.getPassword().equals(password)) {
            return admin;
        }
        return null;
    }
}

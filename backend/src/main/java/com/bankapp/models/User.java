package com.bankapp.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import java.time.LocalDate;


@Entity
@Getter
@Setter
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(unique = true, nullable = false)
    private String phoneNumber;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference // ✅ Prevents recursion
    private Account account;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // ✅ Newly Added Fields
    @Column(nullable = true)
    private LocalDate dateOfBirth; // Format: YYYY-MM-DD

    @Column(length = 10, nullable = true)
    private String gender; // Male, Female, Other

    @Column(nullable = true)
    private String address;

    @Column(length = 6, nullable = true)
    private String pincode;
}

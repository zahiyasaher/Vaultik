package com.bankapp.repositories;

import com.bankapp.models.Account;
import com.bankapp.models.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    //Optional<Account> findByUser(User user); // Find account by user
    @Query("SELECT a FROM Account a WHERE a.user = :user")
    Optional<Account> findByUser(@Param("user") User user);
    
    @Query(value = "SELECT * FROM accounts WHERE account_number = :accountNumber", nativeQuery = true)
    Optional<Account> findByAccountNumber(@Param("accountNumber") String accountNumber);
}

//find user accounts using account numbers.


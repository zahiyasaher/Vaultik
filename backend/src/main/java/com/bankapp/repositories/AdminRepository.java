package com.bankapp.repositories;

import com.bankapp.models.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

    @Query(value = "SELECT * FROM admins WHERE username = :username", nativeQuery = true)
    Admin findByUsername(@Param("username") String username);
}

//Admins are managed separately, with no registration API.
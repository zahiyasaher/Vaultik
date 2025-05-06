package com.bankapp.repositories;

import com.bankapp.models.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Long> {
   // List<Loan> findByUser_Id(Long userId);
    //List<Loan> findByStatus(String status);
    @Query("SELECT l FROM Loan l WHERE l.user.id = :userId")
    List<Loan> findByUser_Id(@Param("userId") Long userId);

    @Query("SELECT l FROM Loan l WHERE l.status = :status")
    List<Loan> findByStatus(@Param("status") String status);

    @Query("SELECT COUNT(l) FROM Loan l WHERE l.user.id = :userId")
    int countByUser_Id(@Param("userId") Long userId);
}

//Fetch loans based on user ID and approval status.
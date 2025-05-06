package com.bankapp.repositories;

import com.bankapp.models.LoanRepayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

@Repository
public interface LoanRepaymentRepository extends JpaRepository<LoanRepayment, Long> {
    //List<LoanRepayment> findByLoan_LoanId(Long loanId); // Fetch repayments by loan ID
    @Query("SELECT r FROM LoanRepayment r WHERE r.loan.loanId = :loanId")
     List<LoanRepayment> findByLoan_LoanId(Long loanId);
}
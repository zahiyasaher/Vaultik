package com.bankapp.repositories;

import com.bankapp.models.LoanType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface LoanTypeRepository extends JpaRepository<LoanType, Long> {
    //LoanType findByType(String type); // Find loan type by name
    @Query("SELECT lt FROM LoanType lt WHERE lt.type = :type")
     LoanType findByType(@Param("type") String type);
}
package com.bankapp.repositories;

import com.bankapp.models.MiniStatement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface MiniStatementRepository extends JpaRepository<MiniStatement, Long> {
    @Query(value = "SELECT * FROM mini_statements WHERE account_id = :accountId ORDER BY timestamp DESC LIMIT 10", nativeQuery = true)
    List<MiniStatement> findRecentMiniStatementsByAccountId(@Param("accountId") Long accountId);
}

//Fetch the last 10 transactions for an account.
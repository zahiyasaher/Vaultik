package com.bankapp.repositories;

import com.bankapp.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.math.BigDecimal;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    @Query(value = "SELECT * FROM transactions WHERE from_account = :id OR to_account = :id", nativeQuery = true)
    List<Transaction> findTransactionsByAccount(@Param("id") Long id);

    @Query("SELECT u.id, u.username, a.accountNumber, " +
            "COALESCE(SUM(CASE WHEN t.toAccount.id = a.id AND t.transactionType = 'Deposit' THEN t.amount ELSE 0 END), 0) AS totalDeposits, "
            +
            "COALESCE(SUM(CASE WHEN t.fromAccount.id = a.id AND t.transactionType = 'Withdraw' THEN t.amount ELSE 0 END), 0) AS totalWithdrawals "
            +
            "FROM User u " +
            "LEFT JOIN u.account a " + // Ensures users without accounts still appear
            "LEFT JOIN Transaction t ON (t.toAccount = a OR t.fromAccount = a) " + // Fix account join condition
            "GROUP BY u.id, u.username, a.accountNumber")
    List<Object[]> getTotalDepositWithdrawalSummaryForAllUsers();

    @Query("SELECT t.transactionId, " +
            "s.username AS senderUsername, sAcc.accountNumber AS senderAccountNumber, " +
            "r.username AS receiverUsername, rAcc.accountNumber AS receiverAccountNumber, " +
            "t.amount, t.timestamp " +
            "FROM Transaction t " +
            "JOIN Account sAcc ON t.fromAccount.id = sAcc.id " +
            "JOIN Account rAcc ON t.toAccount.id = rAcc.id " +
            "JOIN User s ON sAcc.user.id = s.id " +
            "JOIN User r ON rAcc.user.id = r.id " +
            "WHERE t.amount > :amount " +
            "ORDER BY t.amount DESC")
    List<Object[]> getHighValueTransfers(@Param("amount") BigDecimal amount);
}

// Fetch transactions based on account number.
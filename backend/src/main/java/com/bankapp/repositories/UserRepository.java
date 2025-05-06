package com.bankapp.repositories;

import com.bankapp.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import java.math.BigDecimal;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query(value = "SELECT * FROM users WHERE username = ?1", nativeQuery = true)
    User findByUsername(String username);

    @Query(value = "SELECT * FROM users WHERE email = ?1", nativeQuery = true)
    Optional<User> findByEmail(String email);

    // ✅ Update Password
    @Transactional
    @Modifying
    @Query(value = "UPDATE users SET password = ?2 WHERE username = ?1", nativeQuery = true)
    boolean updatePassword(String username, String newPassword);

    // ✅ Update Address
    @Transactional
    @Modifying
    @Query(value = "UPDATE users SET address = ?2 WHERE username = ?1", nativeQuery = true)
    void updateAddress(String username, String newAddress);

    // ✅ Update Pincode
    @Transactional
    @Modifying
    @Query(value = "UPDATE users SET pincode = ?2 WHERE username = ?1", nativeQuery = true)
    void updatePincode(String username, String newPincode);

    // ✅ Fixed User-Account Fetch Query
    @Query("SELECT u.id, u.username, u.email FROM User u JOIN u.account a WHERE u.id = :userId")
    List<Object[]> getUserWithAccount(@Param("userId") Long userId);

    // ✅ Fetch users in the same city as an admin
    // @Query("SELECT u.id, u.username, u.email, u.city FROM User u WHERE u.city =
    // (SELECT a.city FROM Admin a WHERE a.id = :adminId)")
    // List<Object[]> getUsersByAdminCity(@Param("adminId") Long adminId);

    // @Query("SELECT u.id, u.username, u.email, u.phoneNumber,u.city,
    // a.accountNumber " +
    // "FROM User u JOIN Account a ON u.id = a.user.id " +
    // "WHERE u.city = (SELECT a.city FROM Admin a WHERE a.id = :adminId)")
    // List<Object[]> getUsersByAdminCity(@Param("adminId") Long adminId);

    // ✅ Query to fetch users with low balance
    @Query("SELECT u.id, u.username, u.email, u.phoneNumber, a.accountNumber, a.balance " +
            "FROM User u JOIN Account a ON u.id = a.user.id " +
            "WHERE a.balance < :threshold")
    List<Object[]> getUsersWithLowBalance(@Param("threshold") BigDecimal threshold);

    // ✅ Fetch the most active users with their account number
    @Query("SELECT u.id, u.username, u.email, u.phoneNumber, a.accountNumber, COUNT(t.transactionId) AS transactionCount "
            +
            "FROM User u " +
            "JOIN Account a ON u.id = a.user.id " +
            "JOIN Transaction t ON (a.id = t.fromAccount.id OR a.id = t.toAccount.id) " + // ✅ Count both sent &
                                                                                          // received transactions
            "GROUP BY u.id, u.username, a.accountNumber " +
            "ORDER BY transactionCount DESC")
    List<Object[]> getMostActiveUsers();
}
// Find users by username and account number.
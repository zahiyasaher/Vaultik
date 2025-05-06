import React, { useState, useEffect } from "react";
import { admin } from "../utils/api";

const TransactionSummary = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch transaction summary data
  useEffect(() => {
    const fetchTransactionSummary = async () => {
      try {
        const response = await admin.getTransactionsSummary();
        setTransactions(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch transaction summary");
        setLoading(false);
        console.error("Error fetching transaction summary:", err);
      }
    };

    fetchTransactionSummary();
  }, []);

  // Filter transactions based on search input
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.accountNumber.includes(searchTerm) ||
    transaction.userId.toString().includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-gray-700">Loading transaction summary...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header with Search Bar */}
      <div className="bg-white shadow-md p-4 flex justify-between items-center rounded">
        <h1 className="text-2xl font-bold text-blue-700">📊 Transaction Summary</h1>
        <input
          type="text"
          placeholder="🔍 Search"
          className="border border-gray-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Transaction Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="p-4 border border-gray-300">User ID</th>
              <th className="p-4 border border-gray-300">Username</th>
              <th className="p-4 border border-gray-300">Account No</th>
              <th className="p-4 border border-gray-300">Total Deposits</th>
              <th className="p-4 border border-gray-300">Total Withdrawals</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <tr key={`${transaction.userId}-${transaction.accountNumber}`} className="border border-gray-300 text-gray-700 hover:bg-gray-100">
                  <td className="p-4 border border-gray-300">{transaction.userId}</td>
                  <td className="p-4 border border-gray-300 font-medium">{transaction.username}</td>
                  <td className="p-4 border border-gray-300">{transaction.accountNumber}</td>
                  <td className="p-4 border border-gray-300 text-green-600 font-bold">
                    ₹{transaction.totalDeposits.toFixed(2)}
                  </td>
                  <td className="p-4 border border-gray-300 text-red-600 font-bold">
                    ₹{transaction.totalWithdrawals.toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 p-4">
                  {transactions.length === 0 ? "No transaction data available" : "❌ No matching results found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionSummary;
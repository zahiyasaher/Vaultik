import React, { useEffect, useState } from "react";
import { transactions } from "../utils/api"; // Import the transactions API

const ViewAllTransactions = () => {
  const [usertransactions, setUsertransactions] = useState([]); // State to store transactions
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(""); // State to handle errors

  // Fetch transaction history from the backend
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Get the logged-in user's account number from localStorage
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if (!loggedInUser || !loggedInUser.account) {
          throw new Error("User not logged in or account not found");
        }

        // Fetch the transaction history for the user's account
        const response = await transactions.getForAccount(
          loggedInUser.account.id
        );
        setUsertransactions(response.data.reverse()); // Set the transactions
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError("Failed to fetch transactions. Please try again.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchTransactions();
  }, []);

  // Show loading state while data is being fetched
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-gray-700">Loading...</p>
      </div>
    );
  }

  // Show error state if there's an error
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Centered Heading */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-xl w-full max-w-7xl text-center shadow-lg mb-10">
        <h1 className="text-3xl font-bold">ALL TRANSACTIONS</h1>
      </div>

      {/* Transactions Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {transactions.length === 0 ? (
          <p className="text-gray-600 text-center p-6">No transactions found.</p>
        ) : (
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-xl w-full max-w-3xl text-center shadow-lg">
                <th className="p-3 border border-gray-300">Transaction ID</th>
                <th className="p-3 border border-gray-300">Type</th>
                <th className="p-3 border border-gray-300">Amount</th>
                <th className="p-3 border border-gray-300">From Account</th>
                <th className="p-3 border border-gray-300">To Account</th>
                <th className="p-3 border border-gray-300">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {usertransactions.map((txn, index) => (
                <tr
                  key={txn.transactionId}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="p-3 border border-gray-300">{txn.transactionId}</td>
                  <td className="p-3 border border-gray-300">{txn.transactionType}</td>
                  <td className="p-3 border border-gray-300 font-semibold">
                    ₹{txn.amount.toFixed(2)}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {txn.fromAccount ? txn.fromAccount.accountNumber : "-"}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {txn.toAccount ? txn.toAccount.accountNumber : "-"}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {new Date(txn.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ViewAllTransactions;
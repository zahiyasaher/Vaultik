import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ministatements } from "../utils/api";

const MiniStatementPage = () => {
  const [transactions, setTransactions] = useState([]); // State to store transactions
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(""); // State to handle errors
  const navigate = useNavigate();

  // Fetch mini-statement from the backend
  useEffect(() => {
    const fetchMiniStatement = async () => {
      try {
        // Get the logged-in user's account number from localStorage
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if (!loggedInUser || !loggedInUser.account) {
          throw new Error("User not logged in or account not found");
        }

        // Fetch the mini-statement for the user's account
        const response = await ministatements.getMiniStatement(
          loggedInUser.account.accountNumber
        );
        setTransactions(response.data); // Set the transactions
      } catch (error) {
        console.error("Error fetching mini-statement:", error);
        setError("Failed to fetch mini-statement. Please try again.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchMiniStatement();
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-xl w-full max-w-3xl text-center shadow-lg">
        <h1 className="text-3xl font-bold">Mini Statement</h1>
        <p className="text-blue-100 mt-2">Your recent transactions at a glance.</p>
      </div>

      <div className="bg-white shadow-md rounded-lg w-full max-w-3xl p-6 text-center mb-6 mt-6">
        <h2 className="text-xl font-semibold text-gray-700">View all Transactions</h2>
        <button onClick={() => navigate("/viewts")} // Redirect to /viewts
          className="bg-green-500 text-white px-4 py-2 rounded-lg text-lg font-medium hover:bg-green-600 transition duration-200 mt-2">
          View
        </button>
      </div>

      {/* Mini Statement Table */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recent Transactions</h2>
        {transactions.length === 0 ? (
          <p className="text-gray-600 text-center">No transactions found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-xl w-full max-w-3xl text-center">
                  <th className="border p-3 text-white-700">Timestamp</th>
                  <th className="border p-3 text-white-700">Transaction ID</th>
                  <th className="border p-3 text-white-700">Description</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr key={txn.id} className="text-center">
                    <td className="border p-3">
                      {new Date(txn.timestamp).toLocaleString()}
                    </td>
                    <td className="border p-3 font-bold text-blue-600">
                      TXN{txn.transaction.transactionId}
                    </td>
                    <td className="border p-3">{txn.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniStatementPage;

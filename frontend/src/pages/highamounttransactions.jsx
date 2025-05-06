import React, { useState, useEffect } from "react";
import { admin } from "../utils/api";

const HighAmountTransactions = ({ amount }) => {
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await admin.getHighValueTransfers(amount||0);
        const transformedData = response.data.map((item) => ({
          id: item[0],
          sender: item[1],
          senderAccount: item[2],
          receiver: item[3],
          receiverAccount: item[4],
          amount: item[5],
          date: item[6],
        }));
        setTransactions(transformedData);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [amount]);

  // Filter transactions based on search query
  const filteredTransactions = transactions.filter((transaction) => {
    // Safely check if fields exist before calling .toLowerCase()
    const sender = transaction.sender || "";
    const receiver = transaction.receiver || "";
    const senderAccount = transaction.senderAccount || "";
    const receiverAccount = transaction.receiverAccount || "";

    return (
      sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      receiver.toLowerCase().includes(searchQuery.toLowerCase()) ||
      senderAccount.includes(searchQuery) ||
      receiverAccount.includes(searchQuery)
    );
  });
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="bg-white shadow-md p-4 flex justify-between items-center rounded">
        <h1 className="text-2xl font-bold text-blue-700">💰 High Amount Transactions</h1>
        <p className="text-sm text-gray-600">List of transactions above ₹{amount}.</p>
      </div>

      {/* Search Bar */}
      <div className="mt-4 flex justify-end">
        <input
          type="text"
          placeholder="🔍 Search "
          className="p-2 border border-gray-300 rounded w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Transactions Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="p-4 border border-gray-300">Transaction ID</th>
              <th className="p-4 border border-gray-300">Sender</th>
              <th className="p-4 border border-gray-300">Sender Account</th>
              <th className="p-4 border border-gray-300">Receiver</th>
              <th className="p-4 border border-gray-300">Receiver Account</th>
              <th className="p-4 border border-gray-300">Amount (₹)</th>
              <th className="p-4 border border-gray-300">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border border-gray-300 text-gray-700 hover:bg-gray-100">
                  <td className="p-4 border border-gray-300 font-medium">{transaction.id}</td>
                  <td className="p-4 border border-gray-300">{transaction.sender}</td>
                  <td className="p-4 border border-gray-300">{transaction.senderAccount}</td>
                  <td className="p-4 border border-gray-300">{transaction.receiver}</td>
                  <td className="p-4 border border-gray-300">{transaction.receiverAccount}</td>
                  <td className="p-4 border border-gray-300 font-bold text-green-600">₹{transaction.amount}</td>
                  <td className="p-4 border border-gray-300">{new Date(transaction.date).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HighAmountTransactions;
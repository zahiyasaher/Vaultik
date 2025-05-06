import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { transactions, accounts } from "../utils/api";


const WithdrawPage = () => {
  const [amount, setAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Load account number from localStorage on component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.account && user.account.accountNumber) {
      setAccountNumber(user.account.accountNumber);
    }
  }, []);

  const handleWithdraw = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Prepare the transaction payload
      const transactionData = {
        transactionType: "Withdraw",
        fromAccount: {
          accountNumber: accountNumber,
        },
        amount: parseFloat(amount),
      };

      // Call the API
      const response = await transactions.withdraw(transactionData);

      // Handle success
      alert(`Withdrawal of ₹${amount} was successful!\nTransaction ID: ${response.data.transactionId}`);
      navigate("/dash"); // Redirect to dashboard
    } catch (error) {
      console.error("Withdrawal Error:", error);
      setError("Failed to process withdrawal. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const [balance, setBalance] = useState(null);

  const handleCheckBalance = async () => {
    try {
      const loggedInUser = JSON.parse(localStorage.getItem("user"));
      if (!loggedInUser || !loggedInUser.username) {
        alert("User not logged in");
        return;
      }

      const response = await accounts.getMyAccount(loggedInUser.username);
      const balanceAmount = response.data.balance;
      setBalance(balanceAmount);
    } catch (error) {
      console.error("Error fetching balance:", error);
      alert("Failed to fetch balance");
    }
  };





  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 md:p-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-xl w-full max-w-4xl text-center shadow-lg">
        <h1 className="text-3xl font-bold">Withdraw Funds</h1>
        <p className="text-blue-100 mt-2">
          Securely withdraw funds from your account in just a few steps
        </p>
      </div>

      {/* Withdrawal Form */}
      <div className="mt-6 flex justify-center flex-col bg-white p-6 md:p-8 rounded-xl shadow-md w-full max-w-4xl">
        <div className="flex items-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">Withdrawal Procedure</h2>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
          <p className="text-gray-700">
            <span className="font-semibold">Note:</span> Please ensure your account has sufficient balance before making a withdrawal.
            Standard processing time is 1-2 business days.
          </p>
        </div>

        <img
          src="https://www.shutterstock.com/image-vector/money-coming-out-atm-slot-600nw-2380618545.jpg"
          alt="Withdrawal Process Illustration"
          className="w-1/2 h-auto rounded-lg mb-6 object-cover mx-auto"
        />

        <form onSubmit={handleWithdraw} className="space-y-5">
          {/* Account Number Input */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Account Number</label>
            <div className="relative">
              <input
                type="text"
                value={accountNumber}
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Amount to Withdraw</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">₹</span>
              </div>
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                min="1"
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Notes (Optional)</label>
            <textarea
              placeholder="Purpose of withdrawal or special instructions"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}

          {/* Withdraw Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-6 rounded-lg text-lg font-semibold transition-colors ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Withdraw Now'
            )}
          </button>
        </form>

        {/* Check Balance Section */}
        <div className="mt-8 text-center bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Account Balance</h3>
          <button
            type="button"
            onClick={handleCheckBalance}
            className="inline-flex items-center bg-green-100 text-green-700 px-5 py-2.5 rounded-lg font-medium hover:bg-green-200 transition duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Check Current Balance
          </button>

          {balance !== null && (
            <div className="mt-4">
              <p className="text-2xl font-bold text-green-600">
                ₹{balance.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="text-sm text-gray-500 mt-1">Available Balance</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WithdrawPage;

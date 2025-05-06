import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { users } from "../utils/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // State to store user data
  const [account, setAccount] = useState(null); // State to store account data
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    const fetchUserAndAccount = async () => {
      try {
        // Get the logged-in user's data from localStorage
        const loggedInUser = JSON.parse(localStorage.getItem("user"));

        if (!loggedInUser) {
          throw new Error("User not found in localStorage");
        }

        // Set the user state
        setUser(loggedInUser);

        // Fetch account details using the account number from the logged-in user
        const accountResponse = await users.getByAccountNumber(
          loggedInUser.account.accountNumber
        );

        // Set the account state
        setAccount(accountResponse.data);
      } catch (error) {
        console.error("Error fetching user or account data:", error);
        alert("Failed to fetch user or account data. Please try again.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUserAndAccount();
  }, []);

  // Show loading state while data is being fetched
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-gray-700">Loading...</p>
      </div>
    );
  }

  // Show error state if user or account data is not available
  if (!user || !account) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-red-600">Failed to load user or account data.</p>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 px-6 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            {/* User Info */}
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Welcome back, <span className="text-blue-200">{user.username}!</span>
              </h1>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm md:text-base">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {user.email}
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {user.phoneNumber}
                </div>
              </div>
            </div>

            {/* Account Summary */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-blue-100">Account Number</span>
                <span className="font-mono text-blue-50">{account.account.accountNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-100">Member Since: </span>
                <span className="text-blue-50">
                  {new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 p-3 rounded-lg">
              <p className="text-xs text-blue-200">Available Balance</p>
              <p className="text-xl font-bold">₹{account.account.balance.toFixed(2)}</p>
            </div>
            <div className="bg-white/10 p-3 rounded-lg">
              <p className="text-xs text-blue-200">Account Type</p>
              <p className="text-xl font-bold">Savings</p>
            </div>
            <div className="bg-white/10 p-3 rounded-lg">
              <p className="text-xs text-blue-200">Last Login</p>
              <p className="text-xl font-bold">Today</p>
            </div>
            <div className="bg-white/10 p-3 rounded-lg">
              <p className="text-xs text-blue-200">Status</p>
              <p className="text-xl font-bold text-green-300">Active</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-10">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-10">Banking Services</h2>

        {/* Grid Layout for Banking Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Withdraw Money */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <img src="https://cdn5.vectorstock.com/i/1000x1000/99/44/money-withdrawal-machine-graphic-vector-19529944.jpg" alt="Withdraw" className="w-full h-40 object-cover mb-4 rounded" />
            <h3 className="text-xl font-semibold mb-2">Withdraw Money</h3>
            <p className="text-gray-600 mb-4">Easily withdraw cash from your account at any time.</p>
            <button className="w-full bg-blue-600 text-white py-2 rounded" onClick={() => navigate("/withdraw")}>Withdraw</button>
          </div>

          {/* Deposit Money */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <img src="https://cdn3.vectorstock.com/i/1000x1000/84/57/cash-deposit-vector-39008457.jpg" alt="Deposit" className="w-full h-40 object-cover mb-4 rounded" />
            <h3 className="text-xl font-semibold mb-2">Deposit Money</h3>
            <p className="text-gray-600 mb-4">Add funds to your account securely and instantly.</p>
            <button className="w-full bg-blue-600 text-white py-2 rounded" onClick={() => navigate("/deposit")}>Deposit</button>
          </div>

          {/* Transfer Money */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <img src="https://www.shutterstock.com/image-vector/hands-hold-cash-money-financial-600nw-740578237.jpg" alt="Transfer" className="w-full h-40 object-cover mb-4 rounded" />
            <h3 className="text-xl font-semibold mb-2">Transfer Money</h3>
            <p className="text-gray-600 mb-4">Send money to anyone instantly with secure transactions.</p>
            <button className="w-full bg-blue-600 text-white py-2 rounded" onClick={() => navigate("/transfer")}>Transfer</button>
          </div>

          {/* Apply for Loan */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <img src="https://www.shutterstock.com/image-vector/loan-agreement-borrow-money-bank-600nw-2345022885.jpg" alt="Loan" className="w-full h-40 object-cover mb-4 rounded" />
            <h3 className="text-xl font-semibold mb-2">Apply for Loan</h3>
            <p className="text-gray-600 mb-4">Get loans at the best interest rates with easy approvals.</p>
            <button className="w-full bg-blue-600 text-white py-2 rounded" onClick={() => navigate("/loanapply")}>Apply Now</button>
          </div>

          {/* Mini Statement */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <img src="https://static.vecteezy.com/system/resources/previews/002/998/662/non_2x/online-bank-statement-vector.jpg" alt="Mini Statement" className="w-full h-40 object-cover mb-4 rounded" />
            <h3 className="text-xl font-semibold mb-2">Mini Statement</h3>
            <p className="text-gray-600 mb-4">View your recent transactions and account summary.</p>
            <button className="w-full bg-blue-600 text-white py-2 rounded" onClick={() => navigate("/minist")}>View Statement</button>
          </div>

          {/* Apply for Loan */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <img src="https://www.shutterstock.com/image-vector/loan-agreement-borrow-money-bank-600nw-2345022885.jpg" alt="Loan" className="w-full h-40 object-cover mb-4 rounded" />
            <h3 className="text-xl font-semibold mb-2">View your Loans</h3>
            <p className="text-gray-600 mb-4">View all your loans, loan payments, loan approvals, status</p>
            <button className="w-full bg-blue-600 text-white py-2 rounded" onClick={() => navigate("/viewloans")}>View</button>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Dashboard;

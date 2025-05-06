import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { transactions, accounts } from "../utils/api";

const TransferPage = () => {
  const [formData, setFormData] = useState({
    senderAccount: "",
    recipientAccount: "",
    amount: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [sendaccountNumber, setSendaccountNumber] = useState("");

  const navigate = useNavigate();

  // Load account number from localStorage on component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.account && user.account.accountNumber) {
      setSendaccountNumber(user.account.accountNumber);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Prepare the transaction payload
      const transactionData = {
        transactionType: "Transfer",
        fromAccount: {
          accountNumber: sendaccountNumber,
        },
        toAccount: {
          accountNumber: formData.recipientAccount,
        },
        amount: parseFloat(formData.amount),
      };

      // Call the API
      const response = await transactions.transfer(transactionData);

      // Handle success
      alert("Transfer initiated successfully!");
      navigate("/dash"); // Redirect to dashboard
    } catch (error) {
      console.error("Transfer Error:", error);
      setError("Failed to process transfer. Please try again.");
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Page Header */}
      <div className="bg-white shadow-md rounded-lg w-full max-w-3xl p-6 text-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Transfer Funds</h1>
        <p className="text-gray-600">Securely transfer funds between accounts in just a few steps.</p>
      </div>

      {/* Important Notice */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 w-full max-w-3xl rounded-lg mb-6">
        <p className="font-semibold">⚠ Important Notice:</p>
        <p>Transfers may take up to <strong>24 hours</strong> to reflect in the recipient's account. Ensure all details are correct before proceeding.</p>
      </div>

      {/* Transfer Form Section */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Transfer Procedure</h2>
        <p className="text-gray-600 mb-6">
          Ensure you enter the correct recipient details before proceeding. Transfers may take up to 24 hours to process.
        </p>

        {/* Placeholder for Image */}
        <div className="w-full flex justify-center my-4">
          <img src="https://www.shutterstock.com/image-vector/hands-hold-cash-money-financial-600nw-740578237.jpg" className="w-96 h-48 bg-gray-300 flex items-center justify-center text-gray-500 rounded-lg">

          </img>
        </div>

        {/* Transfer Form */}
        <form onSubmit={handleTransfer}>
          <div className="mb-4">
            <label className="block text-gray-700">Sender's Account Number</label>
            <input
              type="text"
              name="senderAccount"
              value={sendaccountNumber}
              disabled
              placeholder="Enter your account number"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Recipient's Account Number</label>
            <input
              type="text"
              name="recipientAccount"
              value={formData.recipientAccount}
              onChange={handleChange}
              placeholder="Enter recipient's account number"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount to transfer"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700">Transaction Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Optional: Enter reason for transfer"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Transfer & Check Balance Buttons */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-200 disabled:bg-blue-300"
            >
              {loading ? "Processing..." : "Transfer Now"}
            </button>
          </div>
        </form>


        <div className="mt-6 text-center">
          <h3 className="text-lg font-medium text-gray-800">Want to check your balance?</h3>
          <button
            type="button"
            onClick={handleCheckBalance}
            className="bg-green-500 text-white px-4 py-2 rounded-lg text-lg font-medium hover:bg-green-600 transition duration-200 mt-2"
          >
            Check Balance
          </button>

          {balance !== null && (
            <p className="text-green-700 font-semibold mt-2">
              Current Balance: ₹{balance.toLocaleString("en-IN")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransferPage;

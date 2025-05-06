import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loans } from "../utils/api";

const PayLoan = () => {
  const { loanId } = useParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [remainingBalance, setRemainingBalance] = useState(0);

  useEffect(() => {
    const fetchLoanDetails = async () => {
      try {
        // Assuming the loanId is part of the user's loans
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if (!loggedInUser) {
          throw new Error("User not logged in");
        }

        // Fetch the user's loans
        const userLoans = await loans.getUserLoans(loggedInUser.id);

        const currentLoan = userLoans.data.find(loan => loan.loanId === parseInt(loanId));

        
        if (currentLoan) {
          setRemainingBalance(currentLoan.remainingAmount);
        }else {
          console.error("Loan not found");
        }
      } catch (error) {
        console.error("Error fetching loan details:", error);
      }
    };

    fetchLoanDetails();
  }, [loanId]);

  const handleRepay = async () => {
    try {
      if (!amount || isNaN(amount)) {
        throw new Error("Please enter a valid amount.");
      }

      const paymentAmount = parseFloat(amount);
      if (paymentAmount <= 0) {
        throw new Error("Payment amount must be greater than 0");
      }

      setIsProcessing(true);
      setError("");
      setSuccess("");

      await loans.repayLoan(loanId, paymentAmount);

      // Refresh the remaining balance after successful payment

      const loggedInUser = JSON.parse(localStorage.getItem("user"));
      if (!loggedInUser) {
        throw new Error("User not logged in");
      }

      // Fetch the user's loans
      const updatedLoans = await loans.getUserLoans(loggedInUser.id);

      const updatedLoan = updatedLoans.data.find(loan => loan.loanId === parseInt(loanId));

      
      setRemainingBalance(updatedLoan.remainingAmount);

      setSuccess(`Payment of ₹${paymentAmount.toLocaleString('en-IN')} processed successfully!`);
      setAmount("");
    } catch (error) {
      console.error("Error repaying loan:", error);
      setError(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 md:p-8">
      {/* Header Section */}
      <div className="w-full max-w-6xl text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">Loan Repayment</h1>
        <p className="text-gray-600">Make a payment towards your outstanding loan</p>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-md">
        {/* Balance Summary */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6 border border-gray-200">
          <div className="p-6">
            <p className="text-sm text-gray-500 mb-1">Current Outstanding Balance</p>
            <p className="text-3xl font-bold text-gray-800">
              ₹{remainingBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="amount">
                Enter Payment Amount (₹)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter amount"
                  min="0.01"
                  step="0.01"
                />
              </div>
            </div>

            {/* Status Messages */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                <p>{error}</p>
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-500 text-green-700 rounded">
                <p>{success}</p>
                <p className="mt-1 text-sm">New Balance: ₹{remainingBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleRepay}
                disabled={isProcessing || !amount}
                className={`flex-1 px-6 py-3 rounded-lg font-medium text-white ${isProcessing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                  } shadow-md transition-colors`}
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Make Payment'
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayLoan;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loans } from "../utils/api";


const LoanRepaymentHistory = () => {
  const { loanId } = useParams(); // Get the loanId from the URL
  const [repayments, setRepayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRepayments = async () => {
      try {
        // Get the logged-in user's ID from localStorage
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if (!loggedInUser) {
          throw new Error("User not logged in");
        }

        // Fetch the repayment history for the loan
        const response = await loans.getLoanRepayments(loanId, loggedInUser.id);
        setRepayments(response.data);
      } catch (error) {
        console.error("Error fetching repayment history:", error);
        setError("Failed to fetch repayment history. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRepayments();
  }, [loanId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-gray-700">Loading...</p>
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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 md:p-8">
      {/* Header Section */}
      <div className="w-full max-w-6xl text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">Repayment History</h1>
        <p className="text-gray-600">Track all your loan repayments in one place</p>
      </div>
  
      {/* Summary Cards */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
          <h3 className="text-gray-500 text-sm font-medium mb-1">Total Repaid</h3>
          <p className="text-2xl font-bold text-gray-800">
            ₹{repayments.reduce((sum, r) => sum + r.amountPaid, 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm font-medium mb-1">Total Payments</h3>
          <p className="text-2xl font-bold text-gray-800">{repayments.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-indigo-500">
          <h3 className="text-gray-500 text-sm font-medium mb-1">Last Payment</h3>
          <p className="text-2xl font-bold text-gray-800">
            {repayments.length > 0 ? 
              new Date(repayments[0].repaymentDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              }) : 
              'N/A'}
          </p>
        </div>
      </div>
  
      {/* Repayment History Table */}
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="overflow-x-auto">
          {repayments.length === 0 ? (
            <div className="p-8 text-center">
              <div className="mx-auto w-24 h-24 text-gray-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-1">No repayment history found</h3>
              <p className="text-gray-500">Your repayment records will appear here once you make payments</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-medium">Payment ID</th>
                  <th className="px-6 py-4 text-left font-medium">Amount</th>
                  <th className="px-6 py-4 text-left font-medium">Date</th>
                  <th className="px-6 py-4 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {repayments.map((repayment) => (
                  <tr key={repayment.repaymentId} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      #{repayment.repaymentId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      ₹{repayment.amountPaid.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(repayment.repaymentDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Completed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanRepaymentHistory;
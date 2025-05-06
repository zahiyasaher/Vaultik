import React, { useState, useEffect } from "react";
import { admin, loans } from "../utils/api";

const PendingLoans = () => {
  const [pendingLoans, setPendingLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPendingLoans = async () => {
      try {
        const response = await admin.getLoans();
        setPendingLoans(response.data);
      } catch (error) {
        console.error("Error fetching pending loans:", error);
        setError("Failed to fetch pending loans. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPendingLoans();
  }, []);

  const handleLoanAction = async (loanId, status) => {
    try {
      const adminId = JSON.parse(localStorage.getItem("admin")).id;
      const response = await admin.approveLoan(loanId, status, adminId);

      if (response.data) {
        alert(`Loan ${status.toLowerCase()} successfully!`);
        setPendingLoans((prevLoans) =>
          prevLoans.filter((loan) => loan.loanId !== loanId)
        );
      } else {
        alert(`Failed to ${status.toLowerCase()} loan. Please try again.`);
      }
    } catch (error) {
      console.error("Error updating loan status:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-lg text-gray-700">Loading loan applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Pending Loan Applications
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Review and manage all pending loan requests
          </p>
        </div>

        {/* Loans List */}
        {pendingLoans.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No pending loans</h3>
            <p className="mt-1 text-gray-500">All loan applications have been processed.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {pendingLoans.map((loan) => (
              <LoanCard
                key={loan.loanId}
                loan={loan}
                onApprove={() => handleLoanAction(loan.loanId, "Approved")}
                onReject={() => handleLoanAction(loan.loanId, "Rejected")}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const LoanCard = ({ loan, onApprove, onReject }) => {
  const [userLoans, setUserLoans] = useState([]);
  const [loanCount, setLoanCount] = useState(0);
  const [loadingLoans, setLoadingLoans] = useState(true);

  useEffect(() => {
    const fetchUserLoans = async () => {
      try {
        const loansResponse = await loans.getUserLoans(loan.user.id);
        setUserLoans(loansResponse.data);
        const countResponse = await loans.getLoanCount(loan.user.id);
        setLoanCount(countResponse.data);
      } catch (error) {
        console.error("Error fetching user loans:", error);
      } finally {
        setLoadingLoans(false);
      }
    };

    fetchUserLoans();
  }, [loan.user.id]);

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
      {/* Card Header */}
      <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-blue-800">{loan.loanType.type} Application</h2>
            <p className="text-sm text-blue-600">Loan ID: {loan.loanId}</p>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            {loan.status}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="px-6 py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Loan Details */}
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                <svg className="inline-block w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                User Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{loan.user.username}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{loan.user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{loan.user.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Account No</p>
                  <p className="font-medium">{loan.user.account.accountNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Balance</p>
                  <p className="font-medium">₹{loan.user.account.balance.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                <svg className="inline-block w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Loan Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="font-medium">₹{loan.amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">{loan.duration} months</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Interest Rate</p>
                  <p className="font-medium">{loan.loanType.interestRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Applied Date</p>
                  <p className="font-medium">{new Date(loan.appliedAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={onApprove}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-md flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Approve
              </button>
              <button
                onClick={onReject}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                Reject
              </button>
            </div>
          </div>

          {/* Right Column - Loan History */}
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                <svg className="inline-block w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                User's Loan History
              </h3>
              {loadingLoans ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-2">
                  {userLoans.length > 0 ? (
                    <ul className="space-y-1/4">
                      {userLoans.map((userLoan) => (
                        <li key={userLoan.loanId} className="flex justify-between items-center p-2 bg-white rounded-md shadow-sm">
                          <div>
                            <span className="font-medium">Loan #{userLoan.loanId}</span>
                            <span className="text-sm text-gray-500 ml-2">({userLoan.loanType.type})</span>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            userLoan.status === "Approved" ? "bg-green-100 text-green-800" :
                            userLoan.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                            "bg-red-100 text-red-800"
                          }`}>
                            {userLoan.status}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No previous loans found</p>
                  )}
                </div>
              )}
            </div>

            <div>
              <h5 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                <svg className="inline-block w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                Loan Statistics
              </h5>
              <div className="bg-blue-50 rounded-lg p-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-blue-600">Total Loans Taken:    </span>
                    <span className="text-2xl font-bold text-blue-800">{loanCount}</span>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingLoans;
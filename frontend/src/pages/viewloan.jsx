import React, { useEffect, useState } from "react";
import { loans } from "../utils/api";
import { useNavigate } from "react-router-dom";

const ViewLoans = () => {
  const [userloans, setuserLoans] = useState([]); // State to store loan data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(""); // State to handle errors
  const navigate = useNavigate();


  // Fetch user loans from the backend
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        // Get the logged-in user's ID from localStorage
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if (!loggedInUser) {
          throw new Error("User not logged in");
        }

        // Fetch the user's loans
        const response = await loans.getUserLoans(loggedInUser.id);
        setuserLoans(response.data); // Set the loan data
      } catch (error) {
        console.error("Error fetching loans:", error);
        setError("Failed to fetch loans. Please try again.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchLoans();
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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 md:p-8">
      {/* Header Section */}
      <div className="w-full max-w-6xl text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">Your Loan Details</h1>
        <p className="text-gray-600">View and manage all your active loans in one place</p>
      </div>
  
      {/* Hero Image */}
      <div className="w-full max-w-6xl mb-8 rounded-xl overflow-hidden shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          alt="Loan Overview"
          className="w-full h-48 md:h-64 object-cover"
        />
      </div>
  
      {/* Loan Details Table */}
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-medium">Loan ID</th>
                <th className="px-6 py-4 text-left font-medium">Applied Date</th>
                <th className="px-6 py-4 text-left font-medium">Loan Type</th>
                <th className="px-6 py-4 text-left font-medium">Amount</th>
                <th className="px-6 py-4 text-left font-medium">Duration</th>
                <th className="px-6 py-4 text-left font-medium">Status</th>
                <th className="px-6 py-4 text-left font-medium">Remaining</th>
                <th className="px-6 py-4 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {userloans.map((loan) => (
                <tr key={loan.loanId} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">L{loan.loanId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(loan.appliedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{loan.loanType.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">₹{loan.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{loan.duration} months</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      loan.status === "Approved" || loan.status ==="Repaid" ? "bg-green-100 text-green-800" :
                      loan.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {loan.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">₹{loan.remainingAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <button
                      onClick={() => navigate(`/loans/${loan.loanId}/repayments`)}
                      className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors text-sm font-medium"
                    >
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/loans/${loan.loanId}/pay`)}
                      className="px-3 py-1.5 bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors text-sm font-medium"
                    >
                      Repay
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  
      {/* Bottom CTA Section */}
      <div className="w-full max-w-6xl bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 md:p-8 shadow-md">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">Need another loan?</h2>
            <p className="text-gray-600">Apply for a new loan with competitive interest rates</p>
          </div>
          <button
            onClick={() => navigate('/loanapply')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg"
          >
            Apply for New Loan
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewLoans;
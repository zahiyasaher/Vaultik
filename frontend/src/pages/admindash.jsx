import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const adminData = JSON.parse(localStorage.getItem("admin"));


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-8 px-6 shadow-xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            {/* Admin Info */}
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Welcome, <span className="text-blue-200">{adminData.username}</span>
              </h1>
              <div className="flex items-center space-x-4">
                <span className="flex items-center text-blue-100">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                  Admin Dashboard
                </span>
                <span className="text-sm bg-blue-600 px-3 py-1 rounded-full">ID: {adminData.id}</span>
              </div>
            </div>
  
            {/* Admin Stats */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-sm">
              <div className="flex items-center justify-between space-x-6">
                <div className="text-center">
                  <span className="text-xs text-blue-100 block">Last Login</span>
                  <span className="text-blue-50 font-medium">Today</span>
                </div>
                <div className="h-8 w-px bg-white/30"></div>
                <div className="text-center">
                  <span className="text-xs text-blue-100 block">Status</span>
                  <span className="text-green-300 font-medium">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
  
      {/* Dashboard Content */}
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12 relative">
          <span className="bg-white px-4 relative z-10">Admin Controls</span>
          <span className="absolute left-0 right-0 top-1/2 h-px bg-gray-200 -z-0"></span>
        </h2>
  
        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* View Users Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100">
            <div className="p-6">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-lg mb-4 mx-auto">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">View All Users</h3>
              <p className="text-gray-600 text-center text-sm mb-6">
                Manage registered users, view details, and take necessary actions.
              </p>
              <button
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
                onClick={() => navigate("/admin/users")}
              >
                View Users
              </button>
            </div>
          </div>
  
          {/* Pending Loans Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100">
            <div className="p-6">
              <div className="flex items-center justify-center w-16 h-16 bg-amber-100 rounded-lg mb-4 mx-auto">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">Pending Loan Applications</h3>
              <p className="text-gray-600 text-center text-sm mb-6">
                Review loan applications and approve/reject them accordingly.
              </p>
              <button
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-lg font-medium hover:from-amber-600 hover:to-amber-700 transition-all shadow-md"
                onClick={() => navigate("/admin/loans")}
              >
                View Loans
              </button>
            </div>
          </div>
  
          {/* Bank Reports Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100">
            <div className="p-6">
              <div className="flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-lg mb-4 mx-auto">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">Bank Reports</h3>
              <p className="text-gray-600 text-center text-sm mb-6">
                View overall banking reports, analyze performance and view summary.
              </p>
              <button
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-lg font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-md"
                onClick={() => navigate("/admin/reports")}
              >
                View Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Dashboard from "./pages/dashboard";
import WithdrawPage from "./pages/withdraw";
import DepositPage from "./pages/deposit";
import TransferPage from "./pages/transfer";
import MiniStatementPage from "./pages/minist";
import LoanApplication from "./pages/loanapplication";
import ProfilePage from "./pages/viewacc";
import AdminLogin from "./pages/adminlogin";
import ViewLoans from "./pages/viewloan";
import AdminDashboard from "./pages/admindash";
import AdminUsers from "./pages/adminusers";
import PendingLoans from "./pages/adminloans";
import ViewAllTransactions from "./pages/viewtransactions";
import LoanRepaymentHistory from "./pages/loanrepaymenthistory";
import PayLoan from "./pages/payloan";
import Header from "./pages/header";
import Footer from "./pages/footer";
import TransactionSummary from "./pages/transactionsum";

const AuthRoutes = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const isAdminAuthenticated = localStorage.getItem("isAdminAuthenticated");
  
  // If any type of user is logged in, redirect them to their respective dashboard
  if (isAuthenticated) {
    return <Navigate to="/dash" replace />;
  }
  if (isAdminAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  
  return children;
};

// ProtectedRoute Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated"); // Check if user is logged in
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// AdminProtectedRoute Component (for admin-only routes)
const AdminProtectedRoute = ({ children }) => {
  const isAdminAuthenticated = localStorage.getItem("isAdminAuthenticated"); // Check if admin is logged in
  return isAdminAuthenticated ? children : <Navigate to="/adminlogin" replace />;
};

function App() {
  return (
    <Router>
    <Header />
    <div className="min-h-screen">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
            <AuthRoutes>
              <HomePage />
            </AuthRoutes>
          } />
          <Route path="/login" element={
            <AuthRoutes>
              <LoginPage />
            </AuthRoutes>
          } />
          <Route path="/register" element={
            <AuthRoutes>
              <RegisterPage />
            </AuthRoutes>
          } />
          <Route path="/adminlogin" element={
            <AuthRoutes>
              <AdminLogin />
            </AuthRoutes>
          } />

        {/* Protected Routes (User Routes) */}
        <Route
          path="/dash"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/withdraw"
          element={
            <ProtectedRoute>
              <WithdrawPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/deposit"
          element={
            <ProtectedRoute>
              <DepositPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transfer"
          element={
            <ProtectedRoute>
              <TransferPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/minist"
          element={
            <ProtectedRoute>
              <MiniStatementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/loanapply"
          element={
            <ProtectedRoute>
              <LoanApplication />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewloans"
          element={
            <ProtectedRoute>
              <ViewLoans />
            </ProtectedRoute>
          }
        />
        <Route
          path="/loans/:loanId/repayments"
          element={
            <ProtectedRoute>
              <LoanRepaymentHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/loans/:loanId/pay"
          element={
            <ProtectedRoute>
              <PayLoan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewts"
          element={
            <ProtectedRoute>
              <ViewAllTransactions />
            </ProtectedRoute>
          }
        />

        {/* Admin-Protected Routes */}
        <Route
          path="/admindash"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminProtectedRoute>
              <AdminUsers />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/loans"
          element={
            <AdminProtectedRoute>
              <PendingLoans />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <AdminProtectedRoute>
              <TransactionSummary />
            </AdminProtectedRoute>
          }
        />

      </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
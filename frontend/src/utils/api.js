// src/api.js
import axios from 'axios';

// Configure axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend base URL
  withCredentials: true, // Include cookies in requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth API
export const auth = {
  register: (userData) => api.post('/users/register', userData),
  login: (username, password) => api.post('/auth/login', null, {
    params: { username, password }
  }),
  adminLogin: (username, password) => api.post('/admins/login', null, {
    params: { username, password }
  }),
};

// Users API
export const users = {
  getAll: () => api.get('/users/all'),
  getByUsername: (username) => api.get(`/users/${username}`),
  getByAccountNumber: (accountNumber) => api.get(`/users/account/${accountNumber}`),
  updateUserDetails: (endpoint, payload) => api.put(endpoint, null, { params: payload }),
};

// Accounts API
export const accounts = {
  getMyAccount: (username) => api.get('/accounts/balance', {
    params: { username }
  }),
};

// Loans API
export const loans = {
  applyForLoan: (userId, loanType, loanData) =>
    api.post(`/loans/apply/${userId}`, loanData, {
      params: { loanType },
    }),
  getUserLoans: (userId) => api.get(`/loans/user/${userId}`),
  repayLoan: (loanId, amount) =>
    api.post(`/loans/repay/${loanId}`, null, {
      params: { amount },
    }),
  // getLoanRepayments: (loanId) => api.get(`/loans/repayments/${loanId}`),
  getLoanTypes: () => api.get('/loans/types'), // Add this method
  getLoanRepayments: (loanId, userId) => api.get(`/loans/repayments/${loanId}`, {
    params: { userId },
  }), // Add this method
  getLoanCount: (userId) => api.get(`/loans/count/${userId}`), // New method
};

// Transactions API
export const transactions = {
  deposit: (transactionData) => api.post('/transactions/transfer', transactionData),
  withdraw: (transactionData) => api.post('/transactions/transfer', transactionData),
  transfer: (transactionData) => api.post('/transactions/transfer', transactionData),
  getAll: () => api.get('/transactions/all'),
  getForAccount: (id) => api.get(`/transactions/account/${id}`),
};

// Admin API
export const admin = {
  getUsers: () => api.get('/admins/users/all'),
  getLoans: () => api.get('/admins/loans/pending'),
  getAllLoans: () => api.get('/admins/loans/all'),
  approveLoan: (loanId, status, adminId) =>
    api.put(`/admins/loans/approve/${loanId}`, null, {
      params: { status, adminId },
    }),
  getHighValueTransfers: (amount) => api.get('/admins/high-value', { params: { amount } }),
  getUsersWithLowBalance: (threshold) => api.get('/admins/low-balance', { params: { threshold } }),
  getMostActiveUsers: () => api.get('/admins/most-active'),
  getTransactionsSummary: () => api.get('/admins/transaction-summary'),
};

export const ministatements = {
  getMiniStatement: (accountNumber) => api.get(`/ministatements/${accountNumber}`)
}


// Add response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
export default api;
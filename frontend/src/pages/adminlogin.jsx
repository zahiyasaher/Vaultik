import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/api";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await auth.adminLogin(username, password);
      if (response.data) {
        localStorage.setItem("isAdminAuthenticated", true); // Set authentication state
        localStorage.setItem("admin", JSON.stringify(response.data)); // Store user data
        console.log("Login Successful!", response.data);
        navigate("/admindash"); // Redirect to dashboard
      }
    } catch (error) {
      console.error("Login Error", error);
      alert("Login Failed! Check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
          Admin Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded"
              placeholder="Enter admin username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          For authorized personnel only.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;

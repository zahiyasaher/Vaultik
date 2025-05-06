import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/api";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await auth.login(username, password);
      if (response.data) {
        // After successful login
        localStorage.setItem("isAuthenticated", true); // Set authentication state
        localStorage.setItem("user", JSON.stringify(response.data)); // Store user data
        console.log("Login Successful!", response.data);
        navigate("/dash"); // Redirect to dashboard
      }
    } catch (error) {
      console.error("Login Error", error);
      alert("Login Failed! Check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Login to Your Account</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded"
              placeholder="Enter your username"
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded">Login</button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Don't have an account? <a href="#" className="text-blue-500">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { users, loans } from "../utils/api";

const ProfilePage = () => {
  // Sample user data
  const [user, setUser] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    pincode: "",
    createdAt: "",
    accountNumber: "",
    accountType: "",
    balance: "",
    loanStatus: "",
  });

  const [editField, setEditField] = useState(null);
  const [updatedValue, setUpdatedValue] = useState("");
  const [loading, setLoading] = useState(true); // State to handle loading
  const [account, setAccount] = useState(null); // State to store account data
  const [loanCount, setLoanCount] = useState("Loading..."); // State for loan status




  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndAccount = async () => {
      try {
        // Get the logged-in user's data from localStorage
        const loggedInUser = JSON.parse(localStorage.getItem("user"));

        if (!loggedInUser) {
          throw new Error("User not found in localStorage");
        }

        console.log("loggedInUser ", loggedInUser);

        // Set the user state
        setUser(loggedInUser);

        // Fetch account details using the account number from the logged-in user
        const accountResponse = await users.getByAccountNumber(
          loggedInUser.account.accountNumber
        );

        // Set the account state
        setAccount(accountResponse.data);

        const loanCount = await loans.getLoanCount(loggedInUser.id);
        setLoanCount(loanCount.data);
      } catch (error) {
        console.error("Error fetching user or account data:", error);
        alert("Failed to fetch user or account data. Please try again.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUserAndAccount();
  }, []);


  // Show loading state while data is being fetched
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-gray-700">Loading...</p>
      </div>
    );
  }

  // Show error state if user or account data is not available
  if (!user || !account) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-red-600">Failed to load user or account data.</p>
      </div>
    );
  }

  // Handle edit click
  const handleEditClick = (field, value) => {
    setEditField(field);
    setUpdatedValue(value);
  };

  // Handle save click
  const handleSave = async () => {
    try {
      const username = user.username; // Assuming username is stored in the user object
      let endpoint = "";
      let payload = {};

      switch (editField) {
        case "email":
          endpoint = "/users/update/email";
          payload = { username: username, newEmail: updatedValue };
          break;
        case "address":
          endpoint = "/users/update/address";
          payload = { username: username, newAddress: updatedValue };
          break;
        case "pincode":
          endpoint = "/users/update/pincode";
          payload = { username: username, newPincode: updatedValue };
          break;
        case "password":
          endpoint = "/users/update/password";
          payload = { username: username, newPassword: updatedValue };
          break;
        default:
          throw new Error("Invalid field");
      }

      // Call the API to update the details
      const response = await users.updateUserDetails(endpoint, payload);

      // If the update is successful, show an alert
      if (response.data === true) {
        alert(`${editField} updated successfully!`);
        // Update the user object
        const updatedUser = { ...user, [editField]: updatedValue };

        // Update localStorage with the new user data
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // Update the user state
        setUser(updatedUser);
        setEditField(null); // Reset the edit field
      } else {
        alert(`Failed to update ${editField}. Please try again.`);
      }
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  // Handle loan application click
  const handleLoanApply = () => {
    navigate("/loanapply");
  };

  // Reusable ProfileField component
  const ProfileField = ({ label, value, editField, fieldName, onEdit, onSave, updatedValue, setUpdatedValue, type = 'text', readOnly = false, valueClassName = '' }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
      {readOnly ? (
        <p className={`text-gray-800 ${valueClassName}`}>{value}</p>
      ) : (
        editField === fieldName ? (
          <div className="flex items-center">
            <input
              type={type}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={updatedValue}
              onChange={(e) => setUpdatedValue(e.target.value)}
            />
            <button
              onClick={onSave}
              className="ml-2 bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            <p className={`flex-1 text-gray-800 ${valueClassName}`}>{value}</p>
            <button
              onClick={() => onEdit(fieldName, value)}
              className="ml-2 text-blue-500 hover:text-blue-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          </div>
        )
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
          <h2 className="text-2xl font-bold">Profile Details</h2>
          <p className="text-blue-100">Manage your personal and account information</p>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* User Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information Card */}
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Personal Information
              </h3>

              <ProfileField
                label="Email"
                value={user.email}
                editField={editField}
                fieldName="email"
                onEdit={handleEditClick}
                onSave={handleSave}
                updatedValue={updatedValue}
                setUpdatedValue={setUpdatedValue}
                type="email"
              />

              <ProfileField
                label="Password"
                value="********"
                editField={editField}
                fieldName="password"
                onEdit={handleEditClick}
                onSave={handleSave}
                updatedValue={updatedValue}
                setUpdatedValue={setUpdatedValue}
                type="password"
              />

              <ProfileField
                label="Phone Number"
                value={user.phoneNumber}
                readOnly
              />

              <ProfileField
                label="Date of Birth"
                value={user.dateOfBirth}
                readOnly
              />

              <ProfileField
                label="Gender"
                value={user.gender}
                readOnly
              />
            </div>

            {/* Address & Account Information Card */}
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Address & Account
              </h3>

              <ProfileField
                label="Address"
                value={user.address}
                editField={editField}
                fieldName="address"
                onEdit={handleEditClick}
                onSave={handleSave}
                updatedValue={updatedValue}
                setUpdatedValue={setUpdatedValue}
              />

              <ProfileField
                label="Pincode"
                value={user.pincode}
                editField={editField}
                fieldName="pincode"
                onEdit={handleEditClick}
                onSave={handleSave}
                updatedValue={updatedValue}
                setUpdatedValue={setUpdatedValue}
              />

              <ProfileField
                label="Account Number"
                value={account.account.accountNumber}
                readOnly
              />

              <ProfileField
                label="Account Balance"
                value={`₹${account.account.balance.toLocaleString('en-IN')}`}
                readOnly
                valueClassName="text-green-600 font-medium"
              />
            </div>
          </div>

          {/* Loan Application Section */}
          <div className="mt-8 bg-blue-50 p-5 rounded-lg border border-blue-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Loan Application</h3>
                <p className="text-gray-600 mt-1">
                  Apply for a loan with competitive interest rates and flexible repayment options.
                </p>
                <div className="mt-3 flex items-center">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {loanCount} {loanCount === 1 ? 'Loan' : 'Loans'} Applied
                  </span>
                </div>
              </div>
              <button
                className="mt-4 md:mt-0 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-md transition-all"
                onClick={handleLoanApply}
              >
                Apply for New Loan
              </button>
            </div>
          </div>

          {/* Note Section */}
          <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Note:</strong> Loan approvals are subject to bank policies, income verification, and credit history. Additional documents may be required during the verification process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

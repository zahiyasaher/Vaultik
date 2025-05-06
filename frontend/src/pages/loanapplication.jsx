import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loans } from "../utils/api";

const LoanApplication = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    loanAmount: "",
    loanType: "",
    duration: "",
    employmentStatus: "",
    annualIncome: "",
    purpose: "",
    address: "",
    pincode: "",
    dob: "",
    gender: "",
    termsAccepted: false,
  });
  const [loanTypes, setLoanTypes] = useState([]); // State to store loan types
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();


    // Prefill form fields with user data from localStorage
    useEffect(() => {
      const loggedInUser = JSON.parse(localStorage.getItem("user"));
      if (loggedInUser) {
        setFormData((prevData) => ({
          ...prevData,
          fullName: loggedInUser.username || "",
          email: loggedInUser.email || "",
          phoneNumber: loggedInUser.phoneNumber || "",
          duration: loggedInUser.duration || "",
          address: loggedInUser.address || "",
          pincode: loggedInUser.pincode || "",
          dob: loggedInUser.dateOfBirth || "",
          gender: loggedInUser.gender || "Male",
        }));
      }
    }, []);
      // Fetch loan types from the backend
  useEffect(() => {
    const fetchLoanTypes = async () => {
      try {
        const response = await loans.getLoanTypes();
        setLoanTypes(response.data); // Set loan types in state
      } catch (error) {
        console.error("Error fetching loan types:", error);
        setError("Failed to fetch loan types. Please try again.");
      }
    };

    fetchLoanTypes();
  }, []);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    // Special handling for loanAmount input
    if (name === "loanAmount") {
      // Allow only digits and optional decimal point
      const numericValue = value.replace(/[^\d.]/g, "");
  
      setFormData({
        ...formData,
        [name]: numericValue,
      });
    } else if (name === "duration" || name === "annualIncome") {
      // Allow only digits (whole numbers) for duration and annual income
      const numericValue = value.replace(/\D/g, "");
      setFormData({
        ...formData,
        [name]: numericValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Get the logged-in user's ID from localStorage
      const loggedInUser = JSON.parse(localStorage.getItem("user"));
      if (!loggedInUser) {
        throw new Error("User not logged in");
      }

      // Prepare the loan data (only include fields required by the backend)
      const loanData = {
        amount: parseFloat(formData.loanAmount),
        duration: parseInt(formData.duration),
        currentSalary: parseFloat(formData.annualIncome),   
      };

      // Call the API to apply for the loan
      const response = await loans.applyForLoan(
        loggedInUser.id, // User ID
        formData.loanType, // Loan type
        loanData // Loan details
      );

      // Handle success
      alert("Loan application submitted successfully!");
      navigate("/dash"); // Redirect to dashboard
    } catch (error) {
      console.error("Loan Application Error:", error);
      setError("Failed to submit loan application. Please try again.");
    }finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600">Apply for a Loan</h1>
        <p className="text-gray-600 text-center mt-2">
          Secure your future with our easy loan application process. Fill out the form below and submit your request.
        </p>

        {/* Dummy Image Section */}
        <div className="flex justify-center my-6">
          <img
            src="https://www.shutterstock.com/image-vector/loan-agreement-borrow-money-bank-600nw-2345022885.jpg"
            alt="Loan Application"
            className="rounded-lg w-1/2 mx-auto shadow-md"
          />
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block font-semibold">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter your email"
              disabled 
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block font-semibold">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter your phone number"
              disabled 
            />
          </div>

          {/* Loan Amount */}
          <div>
            <label className="block font-semibold">Loan Amount</label>
            <input
              type="text"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter loan amount (in INR)"
            />
          </div>


          <div>
            <label className="block font-semibold">Duration</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter loan repayment duration (in months)"
            />
          </div>

          {/* Loan Type */}
          <div>
            <label className="block font-semibold">Loan Type</label>
            <select
              name="loanType"
              value={formData.loanType}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
            >
              <option value="" disabled>Select a loan type</option>
              {loanTypes.map((loanType) => (
                <option key={loanType.id} value={loanType.type}>
                  {loanType.type} ({loanType.interestRate}% interest)
                </option>
              ))}
            </select>
          </div>

          {/* Employment Status */}
          <div>
            <label className="block font-semibold">Employment Status</label>
            <select
              name="employmentStatus"
              value={formData.employmentStatus}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
            >
              <option>Employed</option>
              <option>Self-Employed</option>
              <option>Unemployed</option>
              <option>Student</option>
              <option>Retired</option>
            </select>
          </div>

          {/* Annual Income */}
          <div>
            <label className="block font-semibold">Annual Income (INR)</label>
            <input
              type="text"
              name="annualIncome"
              value={formData.annualIncome}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter your annual income"
            />
          </div>

          {/* Purpose of Loan */}
          <div>
            <label className="block font-semibold">Purpose of Loan</label>
            <input
              type="text"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
              placeholder="Explain why you need this loan"
            />
          </div>

          {/* Address */}
          <div className="col-span-2">
            <label className="block font-semibold">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter your residential address"
              disabled 
            />
          </div>

          {/* Pincode */}
          <div>
            <label className="block font-semibold">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter your area pincode"
              disabled 
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block font-semibold">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
              disabled 
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block font-semibold">Gender</label>
            <input
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
              disabled 
            >
            </input>
          </div>

          {/* Terms & Conditions */}
          <div className="col-span-2 flex items-center">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              required
              className="mr-2"
            />
            <span className="text-gray-700">
              I agree to the{" "}
              <a href="#" className="text-blue-600">
                terms and conditions
              </a>{" "}
              of loan approval.
            </span>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm col-span-2">{error}</p>}

          {/* Submit Button */}
          <div className="col-span-2 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded"
            >
              {loading ? "Submitting..." : "Apply Now"}
            </button>
          </div>
        </form>

        {/* Loan Approval Notice */}
        <p className="mt-6 text-gray-700 text-sm text-center">
          📌 Loan approvals are subject to eligibility criteria, credit checks, and bank policies.
        </p>
      </div>
    </div>
  );
};

export default LoanApplication;

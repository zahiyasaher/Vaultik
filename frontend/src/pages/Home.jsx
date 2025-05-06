import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans bg-white">
      {/* Hero Section */}
      <section className="relative text-white py-32 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
          backgroundPosition: "center 30%"
        }}>
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Welcome To <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent drop-shadow-lg">Vaultik</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-200 font-medium">
            Seamless, Secure, and Smart Banking - Anytime, Anywhere!
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate("/register")}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:to-red-600 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            >
              Create Account
            </button>
            <button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-sky-500 via-indigo-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            >
              Login
            </button>
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "💰", title: "Money Transfer", desc: "Instant transfers between accounts" },
              { icon: "🏧", title: "Withdrawal", desc: "Easy cash access at ATMs" },
              { icon: "🏦", title: "Bank Deposit", desc: "Secure deposits anytime" },
              { icon: "📜", title: "Mini Statements", desc: "Quick transaction history" }
            ].map((service, index) => (
              <div key={index} className={`p-8 rounded-xl shadow-md ${index === 1 ? "bg-gradient-to-r from-blue-500 to-blue-800 text-white " : "bg-white"} transition-transform hover:scale-105`}>
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className={`text-gray-600 ${index === 1 ? "text-white" : ""}`}>
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-6">About Vaultik</h2>
            <p className="text-gray-600 mb-6">
              We are dedicated to providing a secure, efficient, and user-friendly banking experience.
              Our goal is to make financial transactions simple, fast, and accessible for everyone.
            </p>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
              <ul className="space-y-2">
                {[
                  "Effortless - Instant access to your funds",
                  "Secure - Advanced encryption for safe transactions",
                  "Accessible - Banking at your fingertips, anytime"
                ].map((item, i) => (
                  <li key={i} className="flex items-start text-gray-600">
                    <span className="text-green-500 mr-2">✔</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300">
              Contact Us
            </button>
          </div>

          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"
              alt="Banking Meeting"
              className="rounded-lg shadow-lg object-cover h-64 w-full"
            />
            <img
              src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Customer Support"
              className="rounded-lg shadow-lg object-cover h-64 w-full"
            />
          </div>
        </div>
      </section>

      {/* Services Highlight */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Premium <span className="text-blue-600">Banking Services</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: "📥", title: "Deposit/Withdrawals", desc: "Easy money management" },
              { icon: "🏠", title: "Loans", desc: "Competitive rates for all needs" },
              { icon: "🔄", title: "Zero Charge Transfers", desc: "Free internal transfers" }
            ].map((service, index) => (
              <div key={index} className={`p-8 rounded-xl shadow-md ${index === 1 ? "bg-gradient-to-r from-blue-500 to-blue-800 text-white" : "bg-white"} transition-transform hover:scale-105`}>
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className={`text-gray-600 ${index === 1 ? "text-white" : ""}`}>
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                question: "How do I register for online banking?",
                answer: "Click on 'Register', fill in your details, and follow the instructions to complete your registration."
              },
              {
                question: "How can I transfer money?",
                answer: "Go to 'Fund Transfer', enter recipient details, amount, and confirm the transaction."
              },
              {
                question: "How do I apply for a loan?",
                answer: "Navigate to 'Loan Application', fill out the form with required documents, and submit your request."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 w-full text-center shadow-lg">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-xl font-bold mb-4">Admin Access</h3>
          <button
            onClick={() => navigate("/adminlogin")}
            className="bg-gradient-to-r from-gray-700 via-gray-800 to-black hover:from-gray-800 hover:to-gray-900 px-8 py-3 rounded-xl text-white font-semibold shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            Admin Login
          </button>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
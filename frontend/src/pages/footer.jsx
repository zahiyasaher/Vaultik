import React from "react";

const Footer = () => {
  return (
    <footer className="text-white">
      {/* Need Assistance Section */}
      <div className="bg-gray-100 py-6 px-6 text-center rounded-md shadow-md mx-auto max-w-3xl mt-8">
        <h2 className="text-2xl font-semibold text-gray-800">Need Assistance?</h2>
        <p className="text-gray-600 mt-2">
          If you encounter any issues, please reach out to our support team.
        </p>
      </div>

      {/* Footer Section */}
      <div className="bg-blue-900 py-12 mt-8 relative">
        {/* Image inside the blue section */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?cs=srgb&dl=pexels-pixabay-302769.jpg&fm=jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-8 text-gray-300">
          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p>
              Vaultik is dedicated to providing secure and convenient banking solutions. 
              With a commitment to customer satisfaction, we offer innovative services 
              tailored to your financial needs.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p>123, 1st Main Road, Bengaluru</p>
            <p>Office No 3457</p>
            <p>info@?bank.com</p>
            <p>1-800-356-6522</p>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <p>Withdrawal</p>
            <p>Deposits</p>
            <p>Transfers</p>
            <p>Loans</p>
            <p>Ministatment</p>
          </div>
        </div>

        {/* Social Media Icons (Non-Clickable) */}
        <div className="relative z-10 flex justify-center mt-6 space-x-6 text-gray-400">
          <span className="text-2xl"><i className="fab fa-facebook"></i></span>
          <span className="text-2xl"><i className="fab fa-instagram"></i></span>
          <span className="text-2xl"><i className="fab fa-twitter"></i></span>
          <span className="text-2xl"><i className="fab fa-youtube"></i></span>
        </div>

        {/* Copyright */}
        <div className="relative z-10 text-center text-gray-300 mt-8 border-t border-gray-600 pt-4">
          © 2025 Vaultik. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

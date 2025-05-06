import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  // Check authentication status
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const isAdminAuthenticated = localStorage.getItem("isAdminAuthenticated");
  const isLoggedIn = isAuthenticated || isAdminAuthenticated;

  // Get user data if available
  const user = isAuthenticated ? JSON.parse(localStorage.getItem("user")) : null;
  const admin = isAdminAuthenticated ? JSON.parse(localStorage.getItem("admin")) : null;
  const displayName = user?.username || admin?.username || "Account";

  const handleProfileClick = () => {
    navigate(isAdminAuthenticated ? "/admin/dashboard" : "/profile");
  };

  const handleLogout = () => {
    // Clear all auth-related data
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isAdminAuthenticated");
    localStorage.removeItem("account");

    // Redirect to login page and prevent back navigation

    navigate("/", {
      replace: true,
      state: { from: "logout" }
    });

    // Force reload to clear any cached state
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Section */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/images/logo2.png"
            alt="Bank Logo"
            className="h-10 w-auto mt-1 scale-150"
          />
          <span className="ml-3 mb-1 text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
            Vaultik
          </span>
        </div>

        {/* Right Side Navigation */}
        <div className="flex items-center space-x-6 mr-3">
          {/* Contact Info */}
          <div className="hidden md:flex items-center space-x-2 text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>1-800-BANK-HELP</span>
          </div>

          {/* Profile Section */}
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div
                  className="flex items-center cursor-pointer group"
                  onClick={handleProfileClick}
                >
                  <div className="relative">
                    <img
                      src={user?.profileImage || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                      alt="Profile"
                      className="h-9 w-9 rounded-full object-cover border-2 border-blue-100 group-hover:border-blue-300 transition-all"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700 hidden md:inline">
                    {displayName}
                  </span>
                </div>
              ) : null}

              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-red-600 hover:text-white hover:bg-red-500 rounded-md transition-all duration-200 border border-red-100 hover:border-red-500"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          ) : null }
        </div>
      </div>
    </header>
  );
};

export default Header;
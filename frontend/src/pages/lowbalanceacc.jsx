import React, { useState, useEffect } from "react";
import { admin } from "../utils/api";


const LowBalanceAccounts = ({ threshold }) => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch low balance accounts when the threshold changes
  useEffect(() => {
    const fetchLowBalanceUsers = async () => {
      try {
        const response = await admin.getUsersWithLowBalance(threshold||200);
        const transformedData = response.data.map((item) => ({
          id: item[0],
          username: item[1],
          email: item[2],
          phoneNumber: item[3],
          accountNumber: item[4],
          balance: item[5]
        }));
        setUsers(transformedData);
        console.log(response.data);

      } catch (error) {
        console.error("Error fetching low balance users:", error);
      }
    };

    fetchLowBalanceUsers();
  }, [threshold]);

  // Filter users based on search query
  const filteredUsers = users.filter((user) => {
    return (
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phoneNumber.includes(searchQuery) ||
      user.accountNumber.includes(searchQuery)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header & Search */}
      <div className="bg-white shadow-md p-4 flex justify-between items-center rounded">
        <h1 className="text-2xl font-bold text-red-600">⚠️ Low Balance Accounts</h1>
        <input
          type="text"
          placeholder="🔍 Search "
          className="border p-2 rounded w-80 outline-none focus:ring-2 focus:ring-red-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Low Balance Users Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded border-collapse border border-gray-300">
          <thead>
            <tr className="bg-red-600 text-white text-left">
              <th className="p-4 border border-gray-300">Username</th>
              <th className="p-4 border border-gray-300">Email</th>
              <th className="p-4 border border-gray-300">Phone</th>
              <th className="p-4 border border-gray-300">Account No</th>
              <th className="p-4 border border-gray-300">Balance</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border border-gray-300 text-gray-700 hover:bg-gray-100">
                  <td className="p-4 border border-gray-300 font-medium">{user.username}</td>
                  <td className="p-4 border border-gray-300">{user.email}</td>
                  <td className="p-4 border border-gray-300">{user.phoneNumber}</td>
                  <td className="p-4 border border-gray-300">{user.accountNumber}</td>
                  <td className="p-4 border border-gray-300 text-red-500 font-semibold">
                    ₹{user.balance.toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No matching results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LowBalanceAccounts;

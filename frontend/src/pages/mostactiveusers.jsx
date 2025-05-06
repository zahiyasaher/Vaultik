import React, { useState,useEffect } from "react";
import { admin } from "../utils/api";

const MostActiveUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch most active users when the component mounts
  useEffect(() => {
    const fetchMostActiveUsers = async () => {
      try {
        const response = await admin.getMostActiveUsers();
        const transformedData = response.data.map((item) => ({
          id: item[0],
          username: item[1],
          email: item[2],
          phoneNumber: item[3],
          accountNumber: item[4],
          transactions: item[5]
        }));
        setUsers(transformedData);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching most active users:", error);
      }
    };

    fetchMostActiveUsers();
  }, []);

  // Filter users based on search input
  const filteredUsers = users.filter((user) =>{
    return (
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phoneNumber.includes(searchTerm) ||
      user.accountNumber.includes(searchTerm)
    )
});

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="bg-white shadow-md p-4 flex justify-between items-center rounded">
        <h1 className="text-2xl font-bold text-blue-700">🔥 Most Active Users</h1>
        <input
          type="text"
          placeholder="🔍 Search "
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* User Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="p-4 border border-gray-300">User ID</th>
              <th className="p-4 border border-gray-300">Username</th>
              <th className="p-4 border border-gray-300">Email</th>
              <th className="p-4 border border-gray-300">Phone</th>
              <th className="p-4 border border-gray-300">Account No</th>
              <th className="p-4 border border-gray-300">Total Transactions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border border-gray-300 text-gray-700 hover:bg-gray-100">
                  <td className="p-4 border border-gray-300 font-medium">{user.id}</td>
                  <td className="p-4 border border-gray-300">{user.username}</td>
                  <td className="p-4 border border-gray-300">{user.email}</td>
                  <td className="p-4 border border-gray-300">{user.phoneNumber}</td>
                  <td className="p-4 border border-gray-300">{user.accountNumber}</td>
                  <td className="p-4 border border-gray-300 font-bold text-blue-600">{user.transactions}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No matching users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MostActiveUsers;

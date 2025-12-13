// admin/pages/UsersPage.jsx
import React, { useState, useEffect } from "react";
import UserTable from "../components/UserTable";
import Button from "../../components/ui/Button";
import { getAllUsers } from "../../api/admin"; // Assuming you create this API function
import LoadingSpinner from "../../components/common/LoadingSpinner";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers);
      } catch (err) {
        setError("Failed to fetch users. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleBan = (id) => {
    // Note: This is an optimistic update.
    // In a real app, you'd call an API to ban the user and then update the state.
    setUsers(users.map(u => u._id === id ? { ...u, isBanned: !u.isBanned } : u));
  };

  const handleDelete = (id) => {
    // Note: This is an optimistic update.
    // In a real app, you'd call an API to delete the user.
    if (window.confirm("Are you sure you want to permanently delete this user?")) {
      setUsers(users.filter(u => u._id !== id));
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;


  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-400">Users</h1>
        <Button>Export CSV</Button>
      </div>
      <UserTable users={users} onToggleBan={handleBan} onDelete={handleDelete} />
    </div>
  );
};

export default UsersPage;
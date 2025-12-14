// admin/pages/UsersPage.jsx
import React, { useState, useEffect } from "react";
import UserTable from "../components/UserTable";
import Button from "../../components/ui/Button";
import { getAllUsers, banUser, deleteUser } from "../../api/admin";
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

  const handleBan = async (id) => {
    const userToBan = users.find(u => u._id === id);
    if (userToBan && userToBan.role === 'admin') {
      alert("Admins cannot be banned.");
      return;
    }
    try {
      await banUser(id);
      setUsers(users.map(u => u._id === id ? { ...u, isBanned: !u.isBanned } : u));
    } catch (err) {
      setError("Failed to update user status.");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const userToDelete = users.find(u => u._id === id);
    if (userToDelete && userToDelete.role === 'admin') {
      alert("Admins cannot be deleted.");
      return;
    }
    if (window.confirm("Are you sure you want to permanently delete this user?")) {
      try {
        await deleteUser(id);
        setUsers(users.filter(u => u._id !== id));
      } catch (err) {
        setError("Failed to delete user.");
        console.error(err);
      }
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
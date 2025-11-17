// admin/pages/UsersPage.jsx
import React, { useState } from "react";
import UserTable from "../components/UserTable";
import Button from "../../components/ui/Button";

const UsersPage = () => {
  const [users, setUsers] = useState([
    { _id: 1, name: "John Doe", email: "john@example.com", role: "user", isBanned: false, createdAt: new Date() },
    { _id: 2, name: "Artist X", email: "artist@example.com", role: "artist", isBanned: false, createdAt: new Date() },
    { _id: 3, name: "Spammer", email: "spam@bad.com", role: "user", isBanned: true, createdAt: new Date() },
  ]);

  const handleBan = (id) => {
    setUsers(users.map(u => u._id === id ? { ...u, isBanned: !u.isBanned } : u));
  };

  const handleDelete = (id) => {
    if (confirm("Delete this user permanently?")) {
      setUsers(users.filter(u => u._id !== id));
    }
  };

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
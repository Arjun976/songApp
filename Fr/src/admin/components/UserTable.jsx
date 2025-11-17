// src/admin/components/UserTable.jsx
import React from "react";
import { FaBan, FaCheck, FaTrash } from "react-icons/fa";
import Avatar from "../../components/ui/Avatar";
import Badge from "../../components/ui/Badge";

const UserTable = ({ users = [], onToggleBan, onDelete }) => {
  return (
    <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl border border-gray-700/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-black/40">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">User</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Role</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Joined</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-800/50 transition">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <Avatar src={user.avatar} alt={user.name} size="sm" />
                    <div>
                      <p className="font-medium text-white">{user.name}</p>
                      <p className="text-sm text-gray-400">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge 
                    variant={
                      user.role === "admin" ? "purple" : 
                      user.role === "artist" ? "green" : "default"
                    }
                  >
                    {user.role}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={user.isBanned ? "red" : "green"}>
                    {user.isBanned ? "Banned" : "Active"}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {/* Ban/Unban */}
                    <button
                      onClick={() => onToggleBan(user._id)}
                      className={user.isBanned ? "text-green-400 hover:text-green-300" : "text-yellow-400 hover:text-yellow-300"}
                      title={user.isBanned ? "Unban" : "Ban"}
                    >
                      {user.isBanned ? <FaCheck /> : <FaBan />}
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => onDelete(user._id)}
                      className="text-red-400 hover:text-red-300"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
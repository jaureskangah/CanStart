import React, { useState } from 'react';
import { Search, Filter, MoreVertical, UserPlus } from 'lucide-react';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joinedAt: string;
};

export function UserManager() {
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'User',
      status: 'active',
      joinedAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Admin',
      status: 'active',
      joinedAt: '2024-01-10'
    }
  ]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">User Management</h2>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <button className="p-2 text-gray-600 hover:text-gray-900">
            <Filter className="h-5 w-5" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            <UserPlus className="h-5 w-5" />
            Add User
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 px-4 font-medium text-gray-900">Name</th>
              <th className="text-left py-4 px-4 font-medium text-gray-900">Email</th>
              <th className="text-left py-4 px-4 font-medium text-gray-900">Role</th>
              <th className="text-left py-4 px-4 font-medium text-gray-900">Status</th>
              <th className="text-left py-4 px-4 font-medium text-gray-900">Joined</th>
              <th className="text-left py-4 px-4 font-medium text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <span className="font-medium text-gray-900">{user.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-600">{user.email}</td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    user.role === 'Admin'
                      ? 'bg-red-100 text-red-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    user.status === 'active'
                      ? 'bg-green-100 text-green-600'
                      : user.status === 'inactive'
                      ? 'bg-gray-100 text-gray-600'
                      : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-600">
                  {new Date(user.joinedAt).toLocaleDateString()}
                </td>
                <td className="py-4 px-4">
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
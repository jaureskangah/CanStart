import React, { useState } from 'react';
import { Bell, Send, Filter } from 'lucide-react';

type Notification = {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  createdAt: string;
  sent: boolean;
};

export function NotificationCenter() {
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'System Update',
      message: 'The system will be undergoing maintenance tonight.',
      type: 'info',
      createdAt: '2024-02-14T10:00:00Z',
      sent: true
    },
    {
      id: '2',
      title: 'New Feature',
      message: 'Business section is now available for all users.',
      type: 'success',
      createdAt: '2024-02-13T15:30:00Z',
      sent: true
    }
  ]);

  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    type: 'info' as const
  });

  const handleSend = () => {
    // TODO: Implement notification sending
    console.log('Sending notification:', newNotification);
  };

  return (
    <div className="space-y-6">
      {/* Create Notification */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Create Notification</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={newNotification.title}
              onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
              className="w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              value={newNotification.message}
              onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
              className="w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <select
              value={newNotification.type}
              onChange={(e) => setNewNotification({ ...newNotification, type: e.target.value as 'info' | 'success' | 'warning' | 'error' })}
              className="w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
            >
              <option value="info">Info</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>
          <button
            onClick={handleSend}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <Send className="h-5 w-5" />
            Send Notification
          </button>
        </div>
      </div>

      {/* Notification History */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Notification History</h2>
          <button className="p-2 text-gray-600 hover:text-gray-900">
            <Filter className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg ${
                notification.type === 'info' ? 'bg-blue-50' :
                notification.type === 'success' ? 'bg-green-50' :
                notification.type === 'warning' ? 'bg-yellow-50' :
                'bg-red-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Bell className={`h-5 w-5 ${
                      notification.type === 'info' ? 'text-blue-600' :
                      notification.type === 'success' ? 'text-green-600' :
                      notification.type === 'warning' ? 'text-yellow-600' :
                      'text-red-600'
                    }`} />
                    <h3 className="font-medium text-gray-900">{notification.title}</h3>
                  </div>
                  <p className="mt-1 text-gray-600">{notification.message}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(notification.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
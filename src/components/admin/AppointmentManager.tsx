import React, { useState } from 'react';
import { Calendar, Clock, User, MapPin, Check, X } from 'lucide-react';

type Appointment = {
  id: string;
  userId: string;
  userName: string;
  type: string;
  date: string;
  time: string;
  location: string;
  status: 'pending' | 'confirmed' | 'cancelled';
};

export function AppointmentManager() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      userId: 'user1',
      userName: 'John Doe',
      type: 'Immigration Consultation',
      date: '2024-02-15',
      time: '10:00',
      location: 'Toronto',
      status: 'pending'
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Jane Smith',
      type: 'Business Advisory',
      date: '2024-02-16',
      time: '14:00',
      location: 'Vancouver',
      status: 'confirmed'
    }
  ]);

  const handleStatusChange = (id: string, status: Appointment['status']) => {
    setAppointments(appointments.map(app =>
      app.id === id ? { ...app, status } : app
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Appointment Management</h2>
        <div className="flex gap-4">
          <select className="rounded-lg border-gray-300 text-sm focus:ring-red-500 focus:border-red-500">
            <option value="all">All Types</option>
            <option value="immigration">Immigration</option>
            <option value="business">Business</option>
            <option value="housing">Housing</option>
          </select>
          <select className="rounded-lg border-gray-300 text-sm focus:ring-red-500 focus:border-red-500">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className={`p-4 rounded-lg border ${
              appointment.status === 'confirmed' ? 'border-green-200 bg-green-50' :
              appointment.status === 'cancelled' ? 'border-red-200 bg-red-50' :
              'border-yellow-200 bg-yellow-50'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{appointment.type}</h3>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="h-4 w-4" />
                    <span>{appointment.userName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{appointment.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{appointment.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{appointment.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {appointment.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                      className="p-2 text-green-600 hover:bg-green-100 rounded-lg"
                    >
                      <Check className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
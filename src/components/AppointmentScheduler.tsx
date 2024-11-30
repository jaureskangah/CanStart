import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

type Appointment = {
  id: string;
  date: string;
  time: string;
  type: string;
  location: string;
  notes: string;
  status: 'scheduled' | 'completed' | 'cancelled';
};

type AppointmentType = {
  id: string;
  title: string;
  description: string;
  duration: number;
};

export function AppointmentScheduler() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    date: '',
    time: '',
    type: '',
    notes: '',
    location: ''
  });

  const appointmentTypes: AppointmentType[] = [
    {
      id: 'immigration',
      title: 'Immigration Consultation',
      description: 'Get expert guidance on immigration processes and requirements',
      duration: 60
    },
    {
      id: 'business',
      title: 'Business Advisory',
      description: 'Consultation for starting and growing your business in Canada',
      duration: 60
    },
    {
      id: 'housing',
      title: 'Housing Assistance',
      description: 'Help with finding and securing suitable accommodation',
      duration: 45
    },
    {
      id: 'employment',
      title: 'Career Guidance',
      description: 'Job search strategy and career planning assistance',
      duration: 45
    }
  ];

  const handleSchedule = () => {
    if (!newAppointment.date || !newAppointment.time || !newAppointment.type) {
      toast.error('Please fill in all required fields');
      return;
    }

    const appointment: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      ...newAppointment,
      status: 'scheduled'
    };

    setAppointments([...appointments, appointment]);
    setShowForm(false);
    setNewAppointment({ date: '', time: '', type: '', notes: '', location: '' });
    toast.success('Appointment scheduled successfully');
  };

  const updateStatus = (id: string, status: Appointment['status']) => {
    setAppointments(apps => 
      apps.map(app => 
        app.id === id ? { ...app, status } : app
      )
    );
    toast.success(`Appointment ${status}`);
  };

  return (
    <div className="space-y-6">
      {/* Appointment Types */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {appointmentTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => {
              setShowForm(true);
              setNewAppointment(prev => ({ ...prev, type: type.id }));
            }}
            className={`p-4 text-left rounded-lg border transition-colors ${
              newAppointment.type === type.id
                ? 'border-red-600 bg-red-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <h3 className="font-medium text-gray-900 mb-1">{type.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{type.description}</p>
            <div className="text-sm text-gray-500">
              Duration: {type.duration} minutes
            </div>
          </button>
        ))}
      </div>

      {showForm && (
        <div className="bg-white rounded-lg p-6 border">
          <h3 className="font-medium text-gray-900 mb-4">Schedule Appointment</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={newAppointment.date}
                onChange={e => setNewAppointment({ ...newAppointment, date: e.target.value })}
                className="w-full rounded-md border-gray-300 focus:border-red-500 focus:ring-red-500"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <select
                value={newAppointment.time}
                onChange={e => setNewAppointment({ ...newAppointment, time: e.target.value })}
                className="w-full rounded-md border-gray-300 focus:border-red-500 focus:ring-red-500"
              >
                <option value="">Select time</option>
                {Array.from({ length: 8 }, (_, i) => i + 9).map(hour => (
                  <option key={hour} value={`${hour}:00`}>
                    {hour}:00
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Current Location
              </label>
              <input
                type="text"
                value={newAppointment.location}
                onChange={e => setNewAppointment({ ...newAppointment, location: e.target.value })}
                placeholder="City, Province"
                className="w-full rounded-md border-gray-300 focus:border-red-500 focus:ring-red-500"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes
              </label>
              <textarea
                value={newAppointment.notes}
                onChange={e => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                placeholder="Any specific questions or concerns?"
                className="w-full rounded-md border-gray-300 focus:border-red-500 focus:ring-red-500"
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              onClick={handleSchedule}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Schedule Appointment
            </button>
          </div>
        </div>
      )}

      {/* Upcoming Appointments */}
      <div>
        <h3 className="font-medium text-gray-900 mb-4">Your Appointments</h3>
        <div className="space-y-4">
          {appointments.map((app) => (
            <div
              key={app.id}
              className={`p-4 rounded-lg ${
                app.status === 'completed' ? 'bg-green-50' :
                app.status === 'cancelled' ? 'bg-gray-50' :
                'bg-blue-50'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">
                    {appointmentTypes.find(t => t.id === app.type)?.title}
                  </h4>
                  <div className="space-y-1 mt-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(app.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{app.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{app.location}</span>
                    </div>
                    {app.notes && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MessageSquare className="h-4 w-4" />
                        <span>{app.notes}</span>
                      </div>
                    )}
                  </div>
                </div>

                {app.status === 'scheduled' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(app.id, 'completed')}
                      className="text-green-600 hover:text-green-700"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => updateStatus(app.id, 'cancelled')}
                      className="text-red-600 hover:text-red-700"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {appointments.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No appointments scheduled
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export function ContactPage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Implement contact form submission
      toast.success('Message sent successfully!');
      setFormData({ ...formData, subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-red-100 text-lg max-w-2xl mx-auto">
            Have questions about starting your journey in Canada? We're here to help!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <Mail className="h-6 w-6 text-red-600" />
                <h3 className="font-semibold text-gray-900">Email</h3>
              </div>
              <p className="text-gray-600">support@canstart.ca</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <Phone className="h-6 w-6 text-red-600" />
                <h3 className="font-semibold text-gray-900">Phone</h3>
              </div>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="h-6 w-6 text-red-600" />
                <h3 className="font-semibold text-gray-900">Office</h3>
              </div>
              <p className="text-gray-600">
                123 Business Street<br />
                Toronto, ON M5V 2T6<br />
                Canada
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="h-5 w-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Live Chat Section */}
        <div className="mt-12 bg-white rounded-xl p-8 shadow-sm text-center">
          <div className="inline-flex p-3 bg-red-100 rounded-full text-red-600 mb-4">
            <MessageSquare className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Need Immediate Help?</h2>
          <p className="text-gray-600 mb-6">
            Our support team is available 24/7 to assist you with any questions.
          </p>
          <button className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors">
            Start Live Chat
          </button>
        </div>
      </div>
    </div>
  );
}
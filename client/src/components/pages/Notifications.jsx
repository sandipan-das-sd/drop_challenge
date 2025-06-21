import React, { useState, useEffect } from 'react';
import { Bell, Smartphone, Mail, Globe, Camera, Save, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import toast from 'react-hot-toast';
import Header from '../../components/common/Header';

const Notifications = () => {
  const { user, updateUser } = useAuth();
  const [settings, setSettings] = useState({
    sms: false,
    email: true,
    push: true,
    phone: ''
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotificationSettings();
  }, []);

  const fetchNotificationSettings = async () => {
    try {
      if (user) {
        setSettings({
          sms: user.notificationSettings?.sms || false,
          email: user.notificationSettings?.email || true,
          push: user.notificationSettings?.push || true,
          phone: user.phone || ''
        });
      }
    } catch (error) {
      console.error('Error fetching notification settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handlePhoneChange = (e) => {
    setSettings(prev => ({
      ...prev,
      phone: e.target.value
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      const response = await api.put('/users/notifications', settings);
      
      // Update user context
      updateUser({
        notificationSettings: {
          sms: settings.sms,
          email: settings.email,
          push: settings.push
        },
        phone: settings.phone
      });

      setSaveSuccess(true);
      toast.success('Notification settings updated successfully!');
      
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      toast.error('Failed to update notification settings');
      console.error('Save settings error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const notificationTypes = [
    {
      id: 'new_challenges',
      title: 'New Challenges',
      description: 'Get notified when new challenges are available',
      icon: Camera,
      color: 'text-purple-600'
    },
    {
      id: 'challenge_reminders',
      title: 'Challenge Reminders',
      description: 'Reminders before challenges end',
      icon: Bell,
      color: 'text-blue-600'
    },
    {
      id: 'leaderboard_updates',
      title: 'Leaderboard Updates',
      description: 'When your ranking changes or you achieve milestones',
      icon: Globe,
      color: 'text-green-600'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading settings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center space-x-3">
              <Bell className="w-10 h-10 text-purple-600" />
              <span>Notification Settings</span>
            </h1>
            <p className="text-xl text-gray-600">Customize how you receive updates and alerts</p>
          </div>

          {/* Success Message */}
          {saveSuccess && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-medium">Settings saved successfully!</span>
            </div>
          )}

          {/* Main Settings Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Notification Methods */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Notification Methods</h2>
              
              {/* SMS Notifications */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">SMS Notifications</h3>
                      <p className="text-gray-600">Receive text messages for important updates</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle('sms')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                      settings.sms ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.sms ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Phone Number Input */}
                {settings.sms && (
                  <div className="ml-16 bg-gray-50 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number (for SMS)
                    </label>
                    <input
                      type="tel"
                      value={settings.phone}
                      onChange={handlePhoneChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                )}

                {/* Email Notifications */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Email Notifications</h3>
                      <p className="text-gray-600">Receive email updates and summaries</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle('email')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                      settings.email ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.email ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Push Notifications */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Bell className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Push Notifications</h3>
                      <p className="text-gray-600">Receive browser notifications</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle('push')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                      settings.push ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.push ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Notification Types */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">What You'll Receive</h2>
              
              <div className="space-y-4">
                {notificationTypes.map((type) => (
                  <div key={type.id} className="bg-gray-50 rounded-lg p-4 flex items-center space-x-4">
                    <div className={`w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm`}>
                      <type.icon className={`w-5 h-5 ${type.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{type.title}</h3>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSaving ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Save Settings</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">📱 About Notifications</h3>
            <div className="space-y-2 text-sm text-blue-700">
              <p>• You'll receive notifications for new challenges, reminders, and ranking updates</p>
              <p>• SMS notifications require a valid phone number and may incur standard messaging rates</p>
              <p>• You can change these settings anytime from your profile</p>
              <p>• Push notifications require browser permission - you'll be prompted if needed</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <button 
              onClick={() => navigate('/home')}
              className="bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-all"
            >
              Back to Challenges
            </button>
            <button 
              onClick={() => navigate('/leaderboard')}
              className="bg-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-purple-700 transition-all"
            >
              View Leaderboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
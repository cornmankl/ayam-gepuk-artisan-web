import React from 'react';
import { SettingsProvider } from './contexts/SettingsContext';
import SettingsPanel from './components/SettingsPanel';

const AdminDashboard: React.FC = () => {
  return (
    <SettingsProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <SettingsPanel />
            </div>
          </div>
        </main>
      </div>
    </SettingsProvider>
  );
};

export default AdminDashboard;
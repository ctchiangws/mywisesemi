
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminTabs from '@/components/admin/AdminTabs';
import Login from '@/components/admin/Login';
import { ConfigurationProvider } from '@/contexts/ConfigurationContext';

const ADMIN_PASSWORD = 'admin123'; // In a real app, this would be environment-based

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <Login 
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    );
  }

  return (
    <ConfigurationProvider>
      <AdminLayout>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-wisesemi-dark">Admin Dashboard</h1>
          <p className="text-gray-600">Manage content and configure system settings</p>
        </div>

        <AdminTabs />
      </AdminLayout>
    </ConfigurationProvider>
  );
};

export default AdminPage;

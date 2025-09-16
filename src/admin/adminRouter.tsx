import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';

// Admin routes
export const adminRouter = createBrowserRouter([
  {
    path: '/admin',
    element: <AdminDashboard />,
  },
]);

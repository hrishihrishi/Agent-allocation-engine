import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddAgent from './components/AddAgent';
import UploadCSV from './components/UploadCSV';
import ViewTasks from './components/ViewTasks';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login onLogin={() => window.location.href='/dashboard'} />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/add-agent" element={<PrivateRoute><AddAgent /></PrivateRoute>} />
        <Route path="/upload-csv" element={<PrivateRoute><UploadCSV /></PrivateRoute>} />
        <Route path="/view-tasks" element={<PrivateRoute><ViewTasks /></PrivateRoute>} />

      </Routes>
    </BrowserRouter>
  );
}

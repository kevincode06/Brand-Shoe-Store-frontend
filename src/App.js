import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext/AuthContext';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateShoe from './pages/CreateShoe';
import AdminUsers from './pages/AdminUsers';
import ProtectedRoute from './routes/ProtectedRoute'; 
import Navbar from './components/Navbar';
import ShoeGallery from './components/ShoeGallery/ShoeGallery';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/gallery" element={<ShoeGallery />} />
          <Route path="/gallery/:brand" element={<ShoeGallery />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/shoes/create" element={<CreateShoe />} />
            <Route path="/admin/users" element={<AdminUsers />} />
          </Route>

          {/* Redirects */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
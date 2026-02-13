import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import ServicePage from './pages/ServicePage';
import BillingPage from './pages/BillingPage';
import BookingHistory from './pages/BookingHistory';
import CompanyPage from './pages/CompanyPage';
import ServicesListPage from './pages/ServicesListPage';
import PartnerLogin from './pages/PartnerLogin';
import PartnerDashboard from './pages/PartnerDashboard';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/history" element={<BookingHistory />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesListPage />} />
        <Route path="/service/:type" element={<ServicePage />} />
        <Route path="/billing/:bookingId" element={<BillingPage />} />
        <Route path="/company/:id" element={<CompanyPage />} />
        <Route path="/partner/login" element={<PartnerLogin />} />
        <Route path="/partner/dashboard" element={<PartnerDashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

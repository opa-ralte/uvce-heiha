import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Alumni from './pages/Alumni';
import Gallery from './pages/Gallery';
import StudentCorner from './pages/StudentCorner';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminAlumni from './admin/AdminAlumni';
import AdminGallery from './admin/AdminGallery';
import AdminEvents from './admin/AdminEvents';
import ProtectedRoute from './admin/ProtectedRoute';
import { AuthProvider } from './admin/AuthContext';
import './index.css';

function PublicLayout({ children }) {
  return (
    <>
      <div className="crt-overlay"></div>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public site */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/alumni" element={<PublicLayout><Alumni /></PublicLayout>} />
          <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
          <Route path="/student-corner" element={<PublicLayout><StudentCorner /></PublicLayout>} />

          {/* Admin portal */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/alumni" element={<ProtectedRoute><AdminAlumni /></ProtectedRoute>} />
          <Route path="/admin/gallery" element={<ProtectedRoute><AdminGallery /></ProtectedRoute>} />
          <Route path="/admin/events" element={<ProtectedRoute><AdminEvents /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

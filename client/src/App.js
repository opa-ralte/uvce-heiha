import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Alumni from './pages/Alumni';
import Gallery from './pages/Gallery';
import StudentCorner from './pages/StudentCorner';
import Admin from './pages/Admin';
import './index.css';

function AppInner() {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';
  return (
    <>
      <div className="crt-overlay"></div>
      {!isAdmin && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/alumni" element={<Alumni />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/student-corner" element={<StudentCorner />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      {!isAdmin && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppInner />
    </Router>
  );
}

export default App;

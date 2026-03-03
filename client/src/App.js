import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Alumni from './pages/Alumni';
import Gallery from './pages/Gallery';
import StudentCorner from './pages/StudentCorner';
import './index.css';

function App() {
  return (
    <Router>
      <div className="crt-overlay"></div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/alumni" element={<Alumni />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/student-corner" element={<StudentCorner />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

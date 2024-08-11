// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// npm install framer-motion

import Header from './components/Header';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<AboutUs />} /> 
        <Route path="/services" element={<Services />} />
        {/* <Route path="/work" element={<OurWork />} />
        <Route path="/contact" element={<ContactUs />} />  */}
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;

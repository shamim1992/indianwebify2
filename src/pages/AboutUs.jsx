// src/pages/AboutUs.jsx
import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <div className="p-10">
      <motion.h1
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-5"
      >
        About Us
      </motion.h1>
      <p>Indian Webify is a leading web and app development company...</p>
    </div>
  );
};

export default AboutUs;

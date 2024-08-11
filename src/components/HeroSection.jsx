// src/components/HeroSection.jsx
import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <div className="hero min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white relative">
      <motion.div
        className="hero-content text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-md">
          <motion.h1
            className="text-5xl font-bold"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            Welcome to Indian Webify
          </motion.h1>
          <motion.p
            className="py-6"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
          >
            Your one-stop solution for web and app development. We craft digital experiences that drive business success.
          </motion.p>
          <motion.button
            className="btn btn-primary"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            Get Started
          </motion.button>
        </div>
      </motion.div>
      <motion.div
        className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-white to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      />
    </div>
  );
};

export default HeroSection;

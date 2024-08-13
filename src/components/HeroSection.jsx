import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <div
      className="min-h-screen relative overflow-hidden z-0 bg-no-repeat bg-cover bg-fixed"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
      }}
    >
      {/* Background design elements */}
      <motion.div
        className="herodesign relative h-[800px] -left-96 lg:-left-40 w-[300px] rounded-3xl bg-blue-500 rotate-45 overflow-hidden -top-48 lg:-top-60"
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
      ></motion.div>
      <motion.div
        className="herodesign absolute -bottom-60 -right-96 lg:-right-44 h-[800px] w-[300px] rounded-3xl -z-20 bg-blue-500 rotate-45 overflow-hidden"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
      ></motion.div>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row justify-center items-center absolute inset-0 mt-6">
        <motion.div
          className="flex flex-col justify-center items-center p-10 lg:p-24 mt-24 lg:mt-0 glass lg:w-[50%] text-white rounded-3xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-2xl lg:text-4xl text-center font-extrabold">
            Welcome to Indian Webify
          </h1>
          <p className="lg:px-0 text-center mt-6 px-4">
            Transforming ideas into powerful web solutions. We craft stunning
            websites and robust web applications tailored to your needs.
          </p>
          <div className="flex justify-center items-center gap-4">
            <motion.button
              className="bg-blue-500 hover:bg-indigo-500 mt-10 px-4 py-2 rounded-3xl text-white font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Appointment
            </motion.button>
            <motion.button
              className="hover:bg-blue-500 bg-indigo-500 mt-10 px-4 py-2 rounded-3xl text-white font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              About Us
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;

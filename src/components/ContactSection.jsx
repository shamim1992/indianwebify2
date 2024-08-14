import React from 'react';
import { motion } from 'framer-motion';

const ContactSection = () => {
  return (
    <div className="p-10  text-center">
      <motion.div
        className="max-w-lg mx-auto"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
        <p className="mb-6">
          We’d love to hear from you! Whether you have a project in mind or just want to say hi, feel free to reach out.
        </p>
        <motion.button
          className="btn btn-primary"
          whileHover={{ scale: 1.1, boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)' }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          Get in Touch
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ContactSection;

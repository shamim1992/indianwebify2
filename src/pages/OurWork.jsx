import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'E-commerce Website',
    description: 'A sleek and modern e-commerce platform with advanced features and a user-friendly interface.',
    image: 'ecommerce.jpg',
  },
  {
    title: 'Hospital Management System',
    description: 'A comprehensive system to manage hospital operations, from patient care to administration.',
    image: 'hospital.jpg',
  },
  {
    title: 'Billing Software',
    description: 'An efficient billing system that streamlines invoicing, payment tracking, and financial management.',
    image: 'billing.jpg',
  },
  {
    title: 'Social Media App',
    description: 'A feature-rich social media application with real-time messaging and community features.',
    image: 'social-media.jpg',
  },
  {
    title: 'AI Chatbot',
    description: 'An AI-powered chatbot for customer service, lead generation, and user interaction.',
    image: 'chatbot.jpg',
  },
];

const OurWork = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <section className="py-20 text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Our Work
        </motion.h1>
        <motion.p
          className="text-xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover the projects we've crafted with precision and creativity.
        </motion.p>
      </section>

      <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-lg bg-gray-800"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <img
              src={`/images/${project.image}`}
              alt={project.title}
              className="w-full h-48 object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center p-4">
              <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
              <p className="text-gray-300">{project.description}</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-gray-900 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
          </motion.div>
        ))}
      </section>

      <div className="text-center py-16">
        <motion.a
          href="/contact"
          className="btn btn-outline btn-light"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          Contact Us
        </motion.a>
      </div>
    </div>
  );
};

export default OurWork;

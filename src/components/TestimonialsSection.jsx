// src/components/TestimonialsSection.jsx
import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  { name: 'Client A', feedback: 'Great service and excellent team!' },
  { name: 'Client B', feedback: 'The project was delivered on time and met all expectations.' },
  { name: 'Client C', feedback: 'Highly professional and easy to work with.' },
];

const TestimonialsSection = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="p-10 bg-base-100 text-center">
      <h2 className="text-4xl font-bold mb-6">Testimonials</h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {testimonials.map((testimonial, index) => (
          <motion.div key={index} className="card bg-base-200 shadow-xl" variants={item}>
            <div className="card-body">
              <p>{testimonial.feedback}</p>
              <p className="font-bold mt-4">- {testimonial.name}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TestimonialsSection;

// src/components/OurWorkSection.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ecom from '../assets/ecommerce.png'
import hospital from '../assets/hospital.png'
import banking from '../assets/banking.png'
import fitness from '../assets/fitness.png'
import restaurant from '../assets/restaurant.png'
import lms from '../assets/lms.png'

const OurWorkSection = () => {
  const [showAll, setShowAll] = useState(true);

  const portfolioItems = [
    { title: 'E-commerce Platform', image: ecom, category: 'Web Development' },
    { title: 'Hospital Manager', image: hospital, category: 'Web Development' },
    { title: 'Mobile Banking App', image: banking, category: 'Mobile App' },
    { title: 'Fitness Tracking App', image: fitness, category: 'Mobile App' },
    { title: 'Online Learning Platform', image: lms, category: 'Web Development' },
    { title: 'Restaurant Booking System', image: restaurant, category: 'Web Development' },
  ];

  const visibleItems = showAll ? portfolioItems : portfolioItems.slice(0, 3);

  return (
    <section className="py-6 bg-[#101827] text-white border-base-300 border-t">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">Our <span className="text-indigo-500">Work</span> </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {visibleItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className=" rounded-lg overflow-hidden border-2 border-[#595f82]"
              >
                <div className="relative group">
                  <img src={item.image} alt={item.title} className="w-full h-64 object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className=" text-black py-2 px-4 rounded-full hover:bg-opacity-80 transition-colors duration-300">
                      View More
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.category}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {!showAll && (
          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 text-white py-3 px-6 rounded-full hover:bg-blue-700 transition-colors duration-300"
              onClick={() => setShowAll(true)}
            >
              View All Projects
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default OurWorkSection;
// src/components/ServicesSection.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDesktop, FaMobileAlt, FaSearchDollar, FaCogs } from 'react-icons/fa';

const services = [
  {
    category: 'Website Development',
    icon: <FaDesktop className="text-4xl mb-4" />,
    items: ['Ecommerce Website', 'Hospital Website', 'Billing Website', 'CMS Website', 'AI Website']
  },
  {
    category: 'App Development',
    icon: <FaMobileAlt className="text-4xl mb-4" />,
    items: ['ECommerce App', 'Hospital App', 'Billing App', 'AI App', 'Social Media App']
  },
  {
    category: 'Digital Marketing',
    icon: <FaSearchDollar className="text-4xl mb-4" />,
    items: ['Google & Facebook Ads', 'Search Engine Optimization', 'Social Media Optimization', 'Search Engine Marketing', 'Email Marketing']
  },
  {
    category: 'Other Services',
    icon: <FaCogs className="text-4xl mb-4" />,
    items: ['Payment Gateway Integration', 'Content Writing', 'Figma Design', 'PSD to HTML design', 'AI Chatbot']
  }
];

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-100 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
        
        <div className="flex flex-wrap justify-center mb-8">
          {services.map((service, index) => (
            <button
              key={service.category}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 m-2 rounded-full transition-colors duration-300 ${
                activeTab === index
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {service.category}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-xl p-8"
          >
            <div className="text-center mb-8">
              {services[activeTab].icon}
              <h3 className="text-2xl font-semibold">{services[activeTab].category}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services[activeTab].items.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow duration-300"
                >
                  <h4 className="font-semibold mb-2">{item}</h4>
                  <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ServicesSection;
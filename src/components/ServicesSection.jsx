// src/components/ServicesSection.jsx
import React from 'react';
import { motion } from 'framer-motion';

const services = [
    {
      category: 'Website Development',
      items: ['Ecommerce Website', 'Hospital Website', 'Billing Website', 'CMS Website', 'AI Website']
    },
    {
      category: 'App Developemt',
      items: ['ECommerce App', 'Hospiatl App', 'Billing App', 'AI App', 'Social Media App']
    },
    {
      category: 'Digital Marketing',
      items: ['Google & Facebook Ads', 'Search Engine Optimization', 'Social Media Optimization', 'Search Engine Marketing', 'Email Marketing']
    },
    {
      category: 'Other Services',
      items: ['Payment Gateway Integration', 'Content Writing', 'Figma Design', 'PSD to HTML design','AI Chatbot']
    }
  ];

const ServicesSection = () => {
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="">
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((serviceCategory, index) => (
              <motion.div
                key={serviceCategory.category}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="card-body">
                  <h3 className="card-title text-2xl mb-4">{serviceCategory.category}</h3>
                  <ul className="list-disc list-inside">
                    {serviceCategory.items.map((item, itemIndex) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + itemIndex * 0.05 }}
                        className="mb-2"
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                  <div className="card-actions justify-end mt-4">
                    <button className="btn btn-primary btn-sm">Learn More</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesSection;

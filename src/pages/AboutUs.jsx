// src/components/AboutUs.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaLightbulb, FaHandshake, FaRocket } from 'react-icons/fa';

const AboutUs = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4 text-center"
            {...fadeIn}
          >
            About Indian Webify
          </motion.h1>
          <motion.p 
            className="text-xl text-center max-w-3xl mx-auto"
            {...fadeIn}
            transition={{ delay: 0.2 }}
          >
            Empowering businesses with cutting-edge web solutions since 2015
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold mb-8 text-center"
            {...fadeIn}
          >
            Our Story
          </motion.h2>
          <motion.p 
            className="text-lg mb-6 max-w-3xl mx-auto"
            {...fadeIn}
            transition={{ delay: 0.2 }}
          >
            Founded in 2015, Indian Webify began as a small team of passionate developers with a vision to transform the digital landscape for businesses across India. Over the years, we've grown into a full-service web development company, serving clients from startups to established enterprises.
          </motion.p>
          <motion.p 
            className="text-lg max-w-3xl mx-auto"
            {...fadeIn}
            transition={{ delay: 0.3 }}
          >
            Our journey has been marked by continuous learning, innovation, and a commitment to delivering excellence in every project we undertake. Today, we're proud to be at the forefront of web and mobile app development, digital marketing, and emerging technologies like AI integration.
          </motion.p>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center"
            {...fadeIn}
          >
            Our Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <FaCode />, title: "Technical Excellence", description: "We strive for the highest standards in our code and development practices." },
              { icon: <FaLightbulb />, title: "Innovation", description: "We constantly explore new technologies and creative solutions for our clients." },
              { icon: <FaHandshake />, title: "Client Partnership", description: "We build long-lasting relationships based on trust and mutual success." },
              { icon: <FaRocket />, title: "Results-Driven", description: "We focus on delivering solutions that drive real business growth for our clients." }
            ].map((value, index) => (
              <motion.div 
                key={value.title}
                className="text-center"
                {...fadeIn}
                transition={{ delay: 0.1 * index }}
              >
                <div className="text-4xl mb-4 text-blue-600">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Expertise */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold mb-8 text-center"
            {...fadeIn}
          >
            Our Expertise
          </motion.h2>
          <motion.p 
            className="text-lg mb-8 max-w-3xl mx-auto text-center"
            {...fadeIn}
            transition={{ delay: 0.2 }}
          >
            At Indian Webify, we offer a comprehensive range of services to meet all your digital needs:
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "Custom Website Development",
              "E-commerce Solutions",
              "Mobile App Development",
              "CMS Development",
              "UI/UX Design",
              "Digital Marketing",
              "AI Integration",
              "Cloud Solutions"
            ].map((service, index) => (
              <motion.div 
                key={service}
                className="bg-gray-200 rounded-lg p-4"
                {...fadeIn}
                transition={{ delay: 0.1 * index }}
              >
                {service}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl font-bold mb-4"
            {...fadeIn}
          >
            Ready to Start Your Project?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8"
            {...fadeIn}
            transition={{ delay: 0.2 }}
          >
            Let's collaborate to bring your digital vision to life.
          </motion.p>
          <motion.button 
            className="bg-white text-blue-600 py-2 px-6 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Us
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
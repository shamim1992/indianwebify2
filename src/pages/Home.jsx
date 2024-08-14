

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ServicesSection from '../components/ServicesSection';
import OurWorkSection from '../components/OurWorkSection';
import TestimonialsSection from '../components/TestimonialsSection';
import HeroSection from '../components/HeroSection';



const Home = () => {


  return (
    <div className="home font-sans">
      {/* Hero Section */}
    
      <HeroSection />

      {/* Services Overview */}
      <ServicesSection />

      {/* Portfolio Showcase */}

      <OurWorkSection />
      {/* Testimonials */}

      <TestimonialsSection />
      {/* Team Section */}
     



      {/* Call to Action */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Left Side: Image or Graphic */}
          

          {/* Right Side: Text and Button */}
          <div className="mx-auto text-center">
            <h2 className="text-3xl font-extrabold mb-6 leading-tight">
              Ready to Start <span className="text-indigo-500">Your Project?</span>
            </h2>
            <p className="mb-8 text-lg md:text-xl text-gray-300">
              We're excited to help you bring your vision to life. Reach out today to get started with a free consultation.
            </p>
            <Link to="/contact">
              <button className=" bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg text-lg shadow-lg"
              >
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;

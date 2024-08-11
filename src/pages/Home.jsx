// src/pages/Home.jsx
// import React from 'react';
// import { motion } from 'framer-motion';
// import HeroSection from '../components/HeroSection';
// import ServicesSection from '../components/ServicesSection';
// import OurWorkSection from '../components/OurWorkSection';
// import TestimonialsSection from '../components/TestimonialsSection';
// import ContactSection from '../components/ContactSection';

// const Home = () => {
//     return (

//         <div>
//             <HeroSection />
//             <ServicesSection />
//             <OurWorkSection />
//             <TestimonialsSection />
//             <ContactSection />
//         </div>
//     );
// };

// export default Home;

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
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/2653362/pexels-photo-2653362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Project Visualization"
                className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 max-w-md mx-auro"
              />
              {/* Optional overlay or badge */}
              <div className="absolute top-4 left-4 bg-indigo-600 px-4 py-2 rounded-full shadow-md">
                <span className="text-sm font-semibold">New Project</span>
              </div>
            </div>
          </div>

          {/* Right Side: Text and Button */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-5xl font-extrabold mb-6 leading-tight">
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

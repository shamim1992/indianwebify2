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



const Home = () => {
  



  const teamMembers = [
    { name: 'Arjun Sharma', role: 'Founder & CEO', image: 'https://picsum.photos/seed/arjun/200' },
    { name: 'Priya Patel', role: 'Lead Developer', image: 'https://picsum.photos/seed/priya/200' },
    { name: 'Rahul Gupta', role: 'UX Designer', image: 'https://picsum.photos/seed/rahul/200' },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="hero min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
      >
        <div className="hero-content text-center">
          <div className="max-w-md">
            <motion.h1 
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
              className="text-5xl font-bold mb-8"
            >
              Welcome to Indian Webify
            </motion.h1>
            <motion.p 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="py-6 text-lg"
            >
              Transforming ideas into powerful web solutions. We craft stunning websites and robust web applications tailored to your needs.
            </motion.p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-secondary btn-lg"
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* Services Overview */}
     <ServicesSection/>

      {/* Portfolio Showcase */}
      
<OurWorkSection/>
      {/* Testimonials */}
      
<TestimonialsSection/>
      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="card bg-base-100 shadow-xl"
              >
                <figure className="px-10 pt-10">
                  <img src={member.image} alt={member.name} className="rounded-full w-32 h-32 object-cover" />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{member.name}</h2>
                  <p>{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to start your project?</h2>
          <p className="mb-8 text-xl">Let's turn your vision into reality. Contact us today for a free consultation.</p>
          <Link to="/contact">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-secondary btn-lg"
            >
              Contact Us
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle, Code, Users, BarChart, Globe, Lightbulb, Brain, Microscope } from 'lucide-react';

const AboutUsSection = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stats = [
    { value: '5+', label: 'Years Experience' },
    { value: '200+', label: 'Projects Completed' },
    { value: '150+', label: 'Happy Clients' },
    { value: '24/7', label: 'Support' }
  ];

  const expertise = [
    { text: 'Custom Web Development', icon: <Code size={16} className="text-[#e6961d]" /> },
    { text: 'Mobile App Solutions', icon: <Globe size={16} className="text-[#e6961d]" /> },
    { text: 'AI Development & ML Models', icon: <Brain size={16} className="text-[#e6961d]" /> },
    { text: 'Research Project Support', icon: <Microscope size={16} className="text-[#e6961d]" /> },
    { text: 'Digital Marketing Strategies', icon: <BarChart size={16} className="text-[#e6961d]" /> },
    { text: 'E-commerce Platforms', icon: <Users size={16} className="text-[#e6961d]" /> },
    { text: 'UI/UX Design', icon: <Lightbulb size={16} className="text-[#e6961d]" /> },
    { text: 'Technical Support', icon: <CheckCircle size={16} className="text-[#e6961d]" /> }
  ];

  return (
    <section className="py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex flex-col lg:flex-row gap-12 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Left Column - Image */}
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#e6961d] rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#6d123f] rounded-full opacity-20"></div>
              <div className="w-full h-96 bg-gray-200 rounded-lg relative overflow-hidden shadow-lg">
                <Image 
                  src="/indianwebify.png" 
                  alt="Indian Webify Team" 
                  fill
                  className="object-contain"
                />
                {/* This is a placeholder - replace with your actual image */}
                {/* <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg text-gray-500">Image of Indian Webify Team</span>
                </div> */}
              </div>
            </div>
          </motion.div>
          
          {/* Right Column - Content */}
          <div className="w-full lg:w-1/2">
            <motion.h2
              className="text-4xl font-bold mb-6"
              {...fadeIn}
              transition={{ delay: 0.1 }}
            >
              About <span className="text-[#6d123f]">Indian Webify</span>
            </motion.h2>
            
            <motion.p 
              className="text-gray-700 mb-6"
              {...fadeIn}
              transition={{ delay: 0.2 }}
            >
              Indian Webify is a premier web development, AI development, and digital services company dedicated to transforming your digital presence. We combine technical expertise with creative innovation to deliver solutions that drive business growth and enhance user experiences.
            </motion.p>
            
            <motion.p 
              className="text-gray-700 mb-8"
              {...fadeIn}
              transition={{ delay: 0.3 }}
            >
              Founded with a vision to empower businesses through technology, we have grown into a team of passionate professionals committed to excellence in every project we undertake. Our approach blends cutting-edge technology including AI development and research-based solutions with strategic insights to create digital solutions that stand out in today&apos;s competitive landscape.
            </motion.p>
            
            {/* Stats Row */}
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-3 rounded-lg bg-gray-50 shadow-sm">
                  <h3 className="text-2xl font-bold text-[#e6961d]">{stat.value}</h3>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </motion.div>
            
            {/* Expertise Grid */}
            <motion.h3 
              className="text-xl font-semibold mb-4 text-[#6d123f]"
              {...fadeIn}
              transition={{ delay: 0.5 }}
            >
              Our Expertise
            </motion.h3>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {expertise.map((item, index) => (
                <div key={index} className="flex items-center gap-2 bg-white p-3 rounded shadow-sm">
                  {item.icon}
                  <span className="text-gray-800">{item.text}</span>
                </div>
              ))}
            </motion.div>
            
            {/* CTA Button */}
            <motion.button
              className="px-8 py-3 bg-[#e6961d] text-white font-bold rounded-full hover:bg-[#6d123f] transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Learn More About Our Journey
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUsSection;
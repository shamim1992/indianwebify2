import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Award, Users, ThumbsUp } from 'lucide-react';

const OurClientsSection = () => {
  // Sample client logos (replace with actual client logos)
  const clientLogos = [
    { id: 1, name: 'Client 1', logo: '/logos/logo2.png' },
    { id: 2, name: 'Client 2', logo: '/logos/logo2.png' },
    { id: 3, name: 'Client 3', logo: '/logos/logo2.png' },
    { id: 4, name: 'Client 4', logo: '/logos/logo2.png' },
    { id: 5, name: 'Client 5', logo: '/logos/logo2.png' },
    { id: 6, name: 'Client 6', logo: '/logos/logo2.png' },
    { id: 7, name: 'Client 7', logo: '/logos/logo2.png' },
    { id: 8, name: 'Client 8', logo: '/logos/logo2.png' }
  ];

  // Sample testimonials
  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      position: 'CEO',
      company: 'TechStartup India',
      image: '/client1.jpg', // Replace with actual image path
      stars: 5,
      text: 'Indian Webify transformed our online presence completely. Their team delivered a website that exceeded our expectations in both design and functionality. The e-commerce integration was seamless, and we\'ve seen a 40% increase in online sales since launch.',
      icon: <Award className="w-8 h-8" />
    },
    {
      id: 2,
      name: 'Rajesh Patel',
      position: 'Marketing Director',
      company: 'Healthcare Solutions',
      image: '/client2.jpg', // Replace with actual image path
      stars: 5,
      text: 'Working with Indian Webify on our hospital management system was a fantastic experience. They understood our complex requirements and delivered a solution that has streamlined our operations significantly. Their support team is incredibly responsive.',
      icon: <Users className="w-8 h-8" />
    },
    {
      id: 3,
      name: 'Ananya Desai',
      position: 'Founder',
      company: 'DesaiRetail',
      image: '/client3.jpg', // Replace with actual image path
      stars: 5,
      text: 'The mobile app developed by Indian Webify has been game-changing for our business. The user interface is intuitive, and the backend integration with our existing systems was handled expertly. We continue to receive positive feedback from our customers.',
      icon: <ThumbsUp className="w-8 h-8" />
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Autoplay functionality
  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  // Background animation variants
  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 1.5,
        staggerChildren: 0.3
      }
    }
  };

  const circleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 0.1, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 -z-10"
        variants={backgroundVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={circleVariants} className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#6d123f] opacity-5"></motion.div>
        <motion.div variants={circleVariants} className="absolute bottom-40 right-20 w-80 h-80 rounded-full bg-[#e6961d] opacity-5"></motion.div>
        <motion.div variants={circleVariants} className="absolute top-40 right-1/4 w-40 h-40 rounded-full bg-[#6d123f] opacity-5"></motion.div>
      </motion.div>

      <div className="container mx-auto px-4">
        {/* Section Title with animated underline */}
        <div className="text-center mb-16 relative">
          <motion.h2
            className="text-5xl font-bold relative inline-block"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our <span className="text-[#6d123f]">Clients</span>
            <motion.span 
              className="absolute bottom-0 left-0 h-1 bg-[#e6961d] w-0"
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </motion.h2>
          <motion.p
            className="text-gray-600 mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Trusted by leading businesses across industries to deliver exceptional digital experiences
          </motion.p>
        </div>

        {/* Client Logos - Fixed to be properly visible */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="py-8 px-4 bg-white rounded-xl shadow"
          >
            <h3 className="text-2xl font-bold text-center mb-8 text-[#6d123f]">Trusted By</h3>
            
            {/* Static grid for larger screens */}
            <div className="hidden md:grid grid-cols-4 gap-6">
              {clientLogos.map((client) => (
                <motion.div
                  key={client.id}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="h-32 flex items-center justify-center bg-white border border-gray-100 rounded-lg p-4 shadow"
                >
                  <img 
                    src={client.logo} 
                    alt={`${client.name} Logo`} 
                    className="max-h-24 max-w-full object-contain"
                  />
                </motion.div>
              ))}
            </div>
            
            {/* Marquee for mobile */}
            <div className="md:hidden overflow-hidden relative">
              <div className="flex py-4 gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                {clientLogos.map((client) => (
                  <motion.div
                    key={client.id}
                    whileHover={{ scale: 1.05 }}
                    className="flex-shrink-0 snap-center w-64 h-32 flex items-center justify-center bg-white border border-gray-100 rounded-lg p-4 shadow mx-2"
                  >
                    <img 
                      src={client.logo} 
                      alt={`${client.name} Logo`} 
                      className="max-h-24 max-w-full object-contain"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Testimonials Section with 3D card effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-4xl font-bold text-center mb-12">
            Client <span className="text-[#6d123f]">Testimonials</span>
          </h3>

          <div 
            className="relative max-w-4xl mx-auto"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, rotateY: -20, scale: 0.9 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: 20, scale: 0.9 }}
                transition={{ duration: 0.6 }}
                className="bg-white p-8 rounded-2xl shadow relative overflow-hidden"
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
              >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#e6961d] opacity-10 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#6d123f] opacity-10 rounded-tr-full"></div>
                
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Testimonial Image & Details Column */}
                  <div className="w-full md:w-1/3 flex flex-col items-center text-center">
                    <div className="w-32 h-32 relative mb-4">
                      <div className="w-full h-full rounded-full border-4 border-[#e6961d] p-1">
                        <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                          {/* Client image with proper fallback */}
                          {/* <img 
                            src={testimonials[currentTestimonial].image} 
                            alt={testimonials[currentTestimonial].name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/placeholder-profile.jpg';
                            }}
                          /> */}
                        </div>
                      </div>
                      <motion.div
                        className="absolute -bottom-2 -right-2 bg-[#e6961d] rounded-full p-3"
                        animate={{ 
                          rotate: [0, 10, 0, -10, 0],
                          scale: [1, 1.1, 1, 1.1, 1]
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 5, 
                          repeatType: "loop" 
                        }}
                      >
                        {testimonials[currentTestimonial].icon}
                      </motion.div>
                    </div>
                    <h4 className="font-bold text-xl text-[#6d123f] mt-4">{testimonials[currentTestimonial].name}</h4>
                    <p className="text-gray-600 text-sm">{testimonials[currentTestimonial].position}</p>
                    <p className="text-gray-800 font-semibold">{testimonials[currentTestimonial].company}</p>
                    
                    <div className="flex mt-3 gap-1">
                      {[...Array(testimonials[currentTestimonial].stars)].map((_, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                        >
                          <Star size={18} className="text-[#e6961d] fill-[#e6961d]" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Testimonial Text Column */}
                  <div className="w-full md:w-2/3 relative">
                    <Quote size={40} className="text-[#6d123f] opacity-10 absolute -top-2 -left-2" />
                    <motion.p 
                      className="text-gray-700 text-lg italic leading-relaxed relative z-10 px-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      &quot;{testimonials[currentTestimonial].text}&quot;
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons - more stylized */}
            <div className="flex justify-between items-center mt-8">
              <motion.button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-white text-[#6d123f] shadow border border-gray-200"
                whileHover={{ scale: 1.1, backgroundColor: "#6d123f", color: "#fff" }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={24} />
              </motion.button>
              
              <div className="flex gap-3 items-center">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentTestimonial === index 
                        ? 'bg-[#e6961d] w-12' 
                        : 'bg-gray-300'
                    }`}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>
              
              <motion.button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-white text-[#6d123f] shadow border border-gray-200"
                whileHover={{ scale: 1.1, backgroundColor: "#6d123f", color: "#fff" }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>
            
            {/* Autoplay indicator */}
            <div className="flex justify-center mt-4">
              <motion.div 
                className="h-1 bg-gray-200 rounded-full w-full max-w-md overflow-hidden"
              >
                <motion.div 
                  className="h-full bg-[#e6961d]"
                  initial={{ width: "0%" }}
                  animate={{ width: autoplay ? "100%" : "0%" }}
                  transition={{ 
                    duration: autoplay ? 5 : 0.3,
                    repeat: autoplay ? Infinity : 0,
                    repeatType: "loop"
                  }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          className="text-center mt-16 bg-gradient-to-r from-[#6d123f] to-[#8a1d50] p-12 rounded-2xl shadow relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <motion.div 
              className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white opacity-5"
              animate={{ 
                x: [0, 20, 0],
                y: [0, -20, 0],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div 
              className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-white opacity-5"
              animate={{ 
                x: [0, -30, 0],
                y: [0, 20, 0],
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />
          </div>
          
          <motion.h3 
            className="text-3xl font-bold mb-4 text-white relative z-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            Ready to Join Our Success Stories?
          </motion.h3>
          
          <motion.p 
            className="text-gray-100 max-w-2xl mx-auto mb-8 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Partner with Indian Webify to transform your digital presence and achieve your business goals with innovative web solutions tailored to your unique needs.
          </motion.p>
          
          <motion.button
            className="px-10 py-4 bg-[#e6961d] text-white font-bold rounded-full shadow relative z-10 overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Schedule a Consultation</span>
            <motion.span 
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              whileHover={{ scale: 1.5, opacity: 0.2 }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default OurClientsSection;
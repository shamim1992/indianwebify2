import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const OurClientsSection = () => {
  // Sample client logos (replace with actual client logos)
  const clientLogos = [
    { id: 1, name: 'Client 1' },
    { id: 2, name: 'Client 2' },
    { id: 3, name: 'Client 3' },
    { id: 4, name: 'Client 4' },
    { id: 5, name: 'Client 5' },
    { id: 6, name: 'Client 6' },
    { id: 7, name: 'Client 7' },
    { id: 8, name: 'Client 8' }
  ];

  // Sample testimonials
  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      position: 'CEO, TechStartup India',
      company: 'TechStartup India',
      image: '/client1.jpg', // Replace with actual image path
      stars: 5,
      text: 'Indian Webify transformed our online presence completely. Their team delivered a website that exceeded our expectations in both design and functionality. The e-commerce integration was seamless, and we have seen a 40% increase in online sales since launch.'
    },
    {
      id: 2,
      name: 'Rajesh Patel',
      position: 'Marketing Director',
      company: 'Healthcare Solutions',
      image: '/client2.jpg', // Replace with actual image path
      stars: 5,
      text: 'Working with Indian Webify on our hospital management system was a fantastic experience. They understood our complex requirements and delivered a solution that has streamlined our operations significantly. Their support team is incredibly responsive.'
    },
    {
      id: 3,
      name: 'Ananya Desai',
      position: 'Founder',
      company: 'DesaiRetail',
      image: '/client3.jpg', // Replace with actual image path
      stars: 5,
      text: 'The mobile app developed by Indian Webify has been game-changing for our business. The user interface is intuitive, and the backend integration with our existing systems was handled expertly. We continue to receive positive feedback from our customers.'
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our <span className="text-[#6d123f]">Clients</span>
        </motion.h2>

        {/* Client Logos */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {clientLogos.map((client) => (
              <motion.div
                key={client.id}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center h-32"
              >
                {/* Replace with actual client logos */}
                <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded">
                  <span className="text-gray-500">{client.name} Logo</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <h3 className="text-3xl font-bold text-center mb-10">
            Client <span className="text-[#6d123f]">Testimonials</span>
          </h3>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-lg shadow-lg"
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  {/* Testimonial Image */}
                  <div className="w-24 h-24 md:w-32 md:h-32 relative flex-shrink-0">
                    <div className="w-full h-full rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
                      {/* Replace with actual client image */}
                      <span className="text-gray-600 text-sm">Client Photo</span>
                    </div>
                    <motion.div
                      className="absolute -bottom-2 -right-2 bg-[#e6961d] rounded-full p-2"
                      animate={{ rotate: [0, 15, 0] }}
                      transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
                    >
                      <Quote size={16} className="text-white" />
                    </motion.div>
                  </div>

                  {/* Testimonial Content */}
                  <div className="flex-1">
                    <div className="flex mb-2">
                      {[...Array(testimonials[currentTestimonial].stars)].map((_, index) => (
                        <Star key={index} size={16} className="text-[#e6961d] fill-[#e6961d]" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">&quot;{testimonials[currentTestimonial].text}&quot;</p>
                    <div className="mt-4">
                      <h4 className="font-bold text-lg text-[#6d123f]">{testimonials[currentTestimonial].name}</h4>
                      <p className="text-sm text-gray-600">{testimonials[currentTestimonial].position}</p>
                      <p className="text-sm font-semibold">{testimonials[currentTestimonial].company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-center mt-8 gap-4">
              <motion.button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-[#6d123f] text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={24} />
              </motion.button>
              <div className="flex gap-2 items-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full ${
                      currentTestimonial === index ? 'bg-[#e6961d]' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <motion.button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-[#6d123f] text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Join Our Success Stories?</h3>
          <p className="text-gray-700 max-w-2xl mx-auto mb-8">
            Partner with Indian Webify to transform your digital presence and achieve your business goals with innovative web solutions.
          </p>
          <button className="px-8 py-3 bg-[#e6961d] text-white font-bold rounded-full hover:bg-[#6d123f] transition-colors duration-300">
            Schedule a Consultation
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default OurClientsSection;
import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Contact = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 text-center"
            {...fadeIn}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className="text-xl text-center max-w-3xl mx-auto mb-12"
            {...fadeIn}
            transition={{ delay: 0.2 }}
          >
            We're here to help you. Get in touch with us through any of the following methods.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-gray-800 p-8 rounded-lg shadow-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <FaPhoneAlt className="text-3xl mb-4 text-indigo-500 mx-auto" />
              <h3 className="text-xl font-semibold">Phone</h3>
              <p className="mt-2 text-gray-400">+91 8050741797</p>
            </motion.div>

            <motion.div
              className="bg-gray-800 p-8 rounded-lg shadow-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <FaEnvelope className="text-3xl mb-4 text-indigo-500 mx-auto" />
              <h3 className="text-xl font-semibold">Email</h3>
              <p className="mt-2 text-gray-400">contact@indianwebify.com</p>
            </motion.div>

            <motion.div
              className="bg-gray-800 p-8 rounded-lg shadow-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <FaMapMarkerAlt className="text-3xl mb-4 text-indigo-500 mx-auto" />
              <h3 className="text-xl font-semibold">Address</h3>
              <p className="mt-2 text-gray-400">Dinnur main Road, Bengaluru, India</p>
            </motion.div>
          </div>

          <motion.div
            className="mt-16 bg-gray-800 p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-gray-900 text-gray-200 border border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 bg-gray-900 text-gray-200 border border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Your Email"
                  />
                </div>
              </div>
              <div className="mt-8">
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  className="w-full px-4 py-2 bg-gray-900 text-gray-200 border border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  rows="6"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <div className="mt-8 text-center">
                <motion.button
                  className="btn btn-primary"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  Send Message
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

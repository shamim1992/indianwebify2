import React from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/header/Navbar';
import FooterSection from '@/components/footer/FooterSection';

const Custom404 = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4">
        <motion.div
          className="container mx-auto max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center">
            {/* 404 Number */}
            <motion.div
              variants={itemVariants}
              className="mb-8"
            >
              <motion.h1
                className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-[#e6961d] to-[#6d123f] bg-clip-text text-transparent"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                404
              </motion.h1>
            </motion.div>

            {/* Error Message */}
            <motion.div variants={itemVariants} className="mb-8">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Page Not Found
              </motion.h2>
              <motion.p
                className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Oops! The page you&apos;re looking for seems to have wandered off. 
                Don&apos;t worry, let&apos;s get you back on track.
              </motion.p>
            </motion.div>

            {/* Icon */}
            <motion.div
              variants={itemVariants}
              className="mb-12"
            >
              <motion.div
                className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r from-[#e6961d] to-[#6d123f] mb-6"
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <HelpCircle className="w-16 h-16 text-white" />
              </motion.div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Link href="/">
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-[#e6961d] to-[#6d123f] text-white font-bold rounded-full flex items-center gap-2 hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Home className="w-5 h-5" />
                  Go to Homepage
                </motion.button>
              </Link>

              <button
                onClick={() => window.history.back()}
                className="px-8 py-4 bg-white text-[#6d123f] font-bold rounded-full border-2 border-[#6d123f] flex items-center gap-2 hover:bg-[#6d123f] hover:text-white transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                Go Back
              </button>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              variants={itemVariants}
              className="mt-16"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Popular Pages
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/"
                  className="px-6 py-3 bg-white rounded-lg shadow-sm hover:shadow-md text-gray-700 hover:text-[#6d123f] transition-all duration-300 flex items-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Link>
                <Link
                  href="/services/website-development"
                  className="px-6 py-3 bg-white rounded-lg shadow-sm hover:shadow-md text-gray-700 hover:text-[#6d123f] transition-all duration-300"
                >
                  Services
                </Link>
                <Link
                  href="/portfolio"
                  className="px-6 py-3 bg-white rounded-lg shadow-sm hover:shadow-md text-gray-700 hover:text-[#6d123f] transition-all duration-300"
                >
                  Portfolio
                </Link>
                <Link
                  href="/about"
                  className="px-6 py-3 bg-white rounded-lg shadow-sm hover:shadow-md text-gray-700 hover:text-[#6d123f] transition-all duration-300"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-white rounded-lg shadow-sm hover:shadow-md text-gray-700 hover:text-[#6d123f] transition-all duration-300"
                >
                  Contact
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <FooterSection />
    </div>
  );
};

export default Custom404;


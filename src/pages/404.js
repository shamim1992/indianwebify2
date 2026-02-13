import React from 'react';
import { Home, ArrowLeft, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/header/Navbar';
import FooterSection from '@/components/footer/FooterSection';
import SEO from '@/components/SEO';

const Custom404 = () => {
  return (
    <>
      <SEO
        title="404 - Page Not Found | Indian Webify"
        description="The page you are looking for could not be found. Return to Indian Webify homepage or browse our services."
        url="/404"
        noindex={true}
        nofollow={true}
      />
      <div className="min-h-screen flex flex-col">
        <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4">
        <div className="container mx-auto max-w-4xl animate-fade-in-up">
          <div className="text-center">
            {/* 404 Number */}
            <div className="mb-8">
              <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-[#e6961d] to-[#6d123f] bg-clip-text text-transparent animate-pulse-ring">
                404
              </h1>
            </div>

            {/* Error Message */}
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 animate-fade-in-up delay-200">
                Page Not Found
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up delay-300">
                Oops! The page you&apos;re looking for seems to have wandered off.
                Don&apos;t worry, let&apos;s get you back on track.
              </p>
            </div>

            {/* Icon */}
            <div className="mb-12 animate-fade-in-up delay-400">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r from-[#e6961d] to-[#6d123f] mb-6">
                <HelpCircle className="w-16 h-16 text-white" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up delay-500">
              <Link href="/">
                <button className="px-8 py-4 bg-gradient-to-r from-[#e6961d] to-[#6d123f] text-white font-bold rounded-full flex items-center gap-2 hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95">
                  <Home className="w-5 h-5" />
                  Go to Homepage
                </button>
              </Link>

              <button
                onClick={() => window.history.back()}
                className="px-8 py-4 bg-white text-[#6d123f] font-bold rounded-full border-2 border-[#6d123f] flex items-center gap-2 hover:bg-[#6d123f] hover:text-white transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                Go Back
              </button>
            </div>

            {/* Quick Links */}
            <div className="mt-16 animate-fade-in-up delay-600">
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
            </div>
          </div>
        </div>
      </div>
        <FooterSection />
      </div>
    </>
  );
};

export default Custom404;

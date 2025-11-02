import React from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube, 
  ArrowRight, 
  Send,
  Heart,
  Calendar,
  FileText,
  Shield,
  Headphones
} from 'lucide-react';

const FooterSection = () => {
  const currentYear = new Date().getFullYear();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  // Quick links for footer
  const quickLinks = [
    { name: 'Home', url: '/' },
    { name: 'About Us', url: '/about' },
    { name: 'Services', url: '/services' },
    { name: 'Portfolio', url: '/portfolio' },
    { name: 'Blog', url: '/blog' },
    { name: 'Contact', url: '/contact' }
  ];

  // Services links
  const servicesLinks = [
    { name: 'Website Development', url: '/services/website-development' },
    { name: 'Mobile App Development', url: '/services/app-development' },
    { name: 'AI Development', url: '/services/ai-development' },
    { name: 'Research Projects', url: '/services/research-projects' },
    { name: 'Digital Marketing', url: '/services/digital-marketing' },
    { name: 'E-commerce Solutions', url: '/services/ecommerce' },
    { name: 'UI/UX Design', url: '/services/ui-ux-design' }
  ];

  // Recent blog posts
  const recentPosts = [
    { 
      title: 'Top 10 Web Design Trends in 2025',
      date: 'March 28, 2025',
      url: '/blog/web-design-trends-2025'
    },
    { 
      title: 'How AI is Transforming App Development',
      date: 'March 15, 2025',
      url: '/blog/ai-transforming-app-development'
    },
    { 
      title: 'Essential SEO Strategies for Small Businesses',
      date: 'March 02, 2025',
      url: '/blog/seo-strategies-small-businesses'
    }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-[#16071f] text-gray-100 pt-16 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#6d123f] opacity-10"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#e6961d] opacity-5"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Company Information */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-6 text-white relative inline-block">
              Indian Webify
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#e6961d]"></span>
            </h3>
            <p className="text-gray-300 mb-6">
              Transforming businesses through innovative digital solutions. We specialize in web development, mobile apps, AI development, research projects, and digital marketing services.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-[#e6961d] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Call Us</p>
                  <a href="tel:+919876543210" className="text-white hover:text-[#e6961d] transition-colors duration-300">
                    +91 98765 43210
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-[#e6961d] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Email Us</p>
                  <a href="mailto:info@indianwebify.com" className="text-white hover:text-[#e6961d] transition-colors duration-300">
                    info@indianwebify.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#e6961d] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <address className="text-white not-italic">
                    123 Tech Park, Sector 15<br />
                    Gurugram, Haryana 122001
                  </address>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-6 text-white relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#e6961d]"></span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index} className="group">
                  <a 
                    href={link.url} 
                    className="flex items-center text-gray-300 hover:text-[#e6961d] transition-colors duration-300"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-bold mt-8 mb-6 text-white relative inline-block">
              Our Services
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#e6961d]"></span>
            </h3>
            <ul className="space-y-3">
              {servicesLinks.map((link, index) => (
                <li key={index} className="group">
                  <a 
                    href={link.url} 
                    className="flex items-center text-gray-300 hover:text-[#e6961d] transition-colors duration-300"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Recent Posts */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-6 text-white relative inline-block">
              Recent Posts
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#e6961d]"></span>
            </h3>
            <div className="space-y-4">
              {recentPosts.map((post, index) => (
                <a 
                  key={index} 
                  href={post.url}
                  className="block group"
                >
                  <div className="p-4 bg-gray-800 bg-opacity-40 rounded-lg group-hover:bg-opacity-70 transition-all duration-300">
                    <h4 className="font-medium text-white group-hover:text-[#e6961d] transition-colors duration-300">
                      {post.title}
                    </h4>
                    <div className="flex items-center mt-2 text-gray-400 text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      {post.date}
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <a 
              href="/blog" 
              className="inline-flex items-center text-[#e6961d] mt-4 hover:text-white transition-colors duration-300"
            >
              View all posts
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </motion.div>

          {/* Newsletter & Social */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-6 text-white relative inline-block">
              Stay Connected
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#e6961d]"></span>
            </h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter to receive updates and valuable insights.
            </p>
            <form className="mb-8">
              <div className="flex items-center">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-gray-800 bg-opacity-50 text-white px-4 py-3 rounded-l-lg w-full outline-none focus:ring-2 focus:ring-[#e6961d] border-none"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-[#e6961d] hover:bg-[#6d123f] px-4 py-3 rounded-r-lg transition-colors duration-300"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
            
            <h3 className="text-xl font-bold mb-4 text-white">Follow Us</h3>
            <div className="flex space-x-3">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#e6961d] transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#e6961d] transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#e6961d] transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#e6961d] transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#e6961d] transition-colors duration-300"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Features Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-8 border-t border-gray-800">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
              <Heart className="w-6 h-6 text-[#e6961d]" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Client Satisfaction</h4>
              <p className="text-sm text-gray-400">Our top priority</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
              <Shield className="w-6 h-6 text-[#e6961d]" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Secure Solutions</h4>
              <p className="text-sm text-gray-400">Top-notch security</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
              <FileText className="w-6 h-6 text-[#e6961d]" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Custom Projects</h4>
              <p className="text-sm text-gray-400">Tailored to your needs</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
              <Headphones className="w-6 h-6 text-[#e6961d]" />
            </div>
            <div>
              <h4 className="font-semibold text-white">24/7 Support</h4>
              <p className="text-sm text-gray-400">Always here to help</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center py-8 border-t border-gray-800 text-sm">
          <p className="text-gray-400 mb-4 md:mb-0">
           Copyright © {currentYear} Indian Webify. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center space-x-4">
            <a href="/privacy-policy" className="text-gray-400 hover:text-[#e6961d] transition-colors duration-300 mb-2 md:mb-0">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="text-gray-400 hover:text-[#e6961d] transition-colors duration-300 mb-2 md:mb-0">
              Terms of Service
            </a>
            <a href="/sitemap" className="text-gray-400 hover:text-[#e6961d] transition-colors duration-300 mb-2 md:mb-0">
              Sitemap
            </a>
          </div>
        </div>
      </div>
      
      {/* Back to top button */}
      <motion.a
        href="#top"
        className="w-12 h-12 rounded-full bg-[#e6961d] fixed bottom-8 right-8 flex items-center justify-center shadow-lg z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowRight className="w-6 h-6 text-white transform rotate-270" />
      </motion.a>
    </footer>
  );
};

export default FooterSection;
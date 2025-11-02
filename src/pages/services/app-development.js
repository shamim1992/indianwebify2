import React from 'react';
import Navbar from '@/components/header/Navbar';
import FooterSection from '@/components/footer/FooterSection';
import { motion } from 'framer-motion';
import { Smartphone, CheckCircle, ArrowRight, ShoppingCart, Building, FileText, Brain, Users } from 'lucide-react';

const AppDevelopment = () => {
  const services = [
    {
      icon: <ShoppingCart className="w-8 h-8 text-[#e6961d]" />,
      title: 'ECommerce App',
      description: 'Create mobile apps for online shopping, offering features like product catalogs, secure checkout, and customer accounts, optimized for iOS and Android.',
      features: ['Product Catalog', 'Secure Checkout', 'User Accounts', 'Order Tracking', 'Push Notifications']
    },
    {
      icon: <Building className="w-8 h-8 text-[#e6961d]" />,
      title: 'Hospital App',
      description: 'Develop mobile applications for healthcare providers, facilitating patient management, appointment scheduling, and telemedicine services.',
      features: ['Appointment Booking', 'Patient Records', 'Telemedicine', 'Prescription Management', 'Emergency Alerts']
    },
    {
      icon: <FileText className="w-8 h-8 text-[#e6961d]" />,
      title: 'Billing App',
      description: 'Build mobile billing solutions for businesses, enabling easy invoicing, payment processing, and financial tracking on the go.',
      features: ['Invoice Creation', 'Payment Processing', 'Financial Reports', 'Client Management', 'Offline Sync']
    },
    {
      icon: <Brain className="w-8 h-8 text-[#e6961d]" />,
      title: 'AI App',
      description: 'Design apps with AI-powered features, such as virtual assistants, image recognition, and predictive analytics, tailored to your specific business needs.',
      features: ['AI Chatbots', 'Image Recognition', 'Predictive Analytics', 'Voice Commands', 'Smart Recommendations']
    },
    {
      icon: <Users className="w-8 h-8 text-[#e6961d]" />,
      title: 'Social Media App',
      description: 'Develop social media platforms or apps with engaging features, including user profiles, content sharing, messaging, and social networking.',
      features: ['User Profiles', 'Content Sharing', 'Real-time Messaging', 'Social Networking', 'Content Discovery']
    }
  ];

  const technologies = [
    { name: 'React Native', description: 'Cross-platform mobile development' },
    { name: 'Flutter', description: 'Google\'s UI toolkit for mobile apps' },
    { name: 'iOS Native', description: 'Swift and Objective-C development' },
    { name: 'Android Native', description: 'Kotlin and Java development' },
    { name: 'Progressive Web Apps', description: 'Web-based mobile experiences' },
    { name: 'Hybrid Apps', description: 'Ionic and Cordova solutions' }
  ];

  return (
    <div className="min-h-screen bg-[#6d123f] ">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-[#6d123f] text-[#e6961d]">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <Smartphone className="w-16 h-16 text-[#e6961d]" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Mobile App Development
            </h1>
            <p className="text-xl md:text-2xl text-[#e6961d] mb-8">
              Build powerful mobile apps that engage users and drive business growth
            </p>
            <p className="text-lg text-white max-w-3xl mx-auto">
              We create native and cross-platform mobile applications that deliver exceptional user experiences across iOS and Android devices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#6d123f] mb-4">
              Our App Development Services
            </h2>
            <div className="w-20 h-1 bg-[#e6961d] mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              From simple utility apps to complex enterprise solutions, we deliver mobile applications that meet your business objectives.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border-l-4 border-[#e6961d]"
              >
                <div className="flex items-center mb-4">
                  {service.icon}
                  <h3 className="text-xl font-bold text-[#6d123f] ml-3">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-700 mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#6d123f] mb-4">
              Technologies We Use
            </h2>
            <div className="w-20 h-1 bg-[#e6961d] mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We use the latest technologies and frameworks to build high-performance mobile applications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg p-8 text-center hover:bg-[#e6961d] hover:text-white transition-colors duration-300 shadow-lg border border-gray-200"
              >
                <h3 className="text-xl font-bold text-[#6d123f] mb-2">
                  {tech.name}
                </h3>
                <p className="text-gray-700">
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#6d123f] text-white">
        <div className="container mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#e6961d]">
              Ready to Build Your Mobile App?
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Let's discuss your app idea and create a mobile solution that engages your users and drives business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-[#e6961d] text-white rounded-full font-bold hover:bg-white hover:text-[#6d123f] transition-colors duration-300 flex items-center justify-center shadow-lg"
              >
                Get Free Quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 border-2 border-[#e6961d] text-[#e6961d] rounded-full font-bold hover:bg-[#e6961d] hover:text-white transition-colors duration-300 shadow-lg"
              >
                View Portfolio
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default AppDevelopment;

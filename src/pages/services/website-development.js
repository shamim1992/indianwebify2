import React from 'react';
import Navbar from '@/components/header/Navbar';
import FooterSection from '@/components/footer/FooterSection';
import { motion } from 'framer-motion';
import { Computer, CheckCircle, ArrowRight, Code, Globe, ShoppingCart, Building, FileText, Brain } from 'lucide-react';

const WebsiteDevelopment = () => {
  const services = [
    {
      icon: <ShoppingCart className="w-8 h-8 text-[#e6961d]" />,
      title: 'Ecommerce Website',
      description: 'Develop feature-rich online stores with seamless user experience and secure payment gateways, tailored to boost your sales and customer engagement.',
      features: ['Shopping Cart', 'Payment Integration', 'Inventory Management', 'Order Tracking', 'Customer Accounts']
    },
    {
      icon: <Building className="w-8 h-8 text-[#e6961d]" />,
      title: 'Hospital Website',
      description: 'Create responsive and user-friendly websites for healthcare facilities, offering online appointment scheduling, patient portals, and information management systems.',
      features: ['Appointment Booking', 'Patient Portal', 'Doctor Profiles', 'Medical Records', 'Emergency Contact']
    },
    {
      icon: <FileText className="w-8 h-8 text-[#e6961d]" />,
      title: 'Billing Website',
      description: 'Build efficient billing systems that streamline invoicing, payment tracking, and financial management, customized to suit your business needs.',
      features: ['Invoice Generation', 'Payment Tracking', 'Financial Reports', 'Client Management', 'Automated Billing']
    },
    {
      icon: <Code className="w-8 h-8 text-[#e6961d]" />,
      title: 'CMS Website',
      description: 'Develop Content Management Systems that allow easy content updates, media management, and dynamic web experiences without needing technical expertise.',
      features: ['Easy Content Updates', 'Media Management', 'User Roles', 'SEO Optimization', 'Responsive Design']
    },
    {
      icon: <Brain className="w-8 h-8 text-[#e6961d]" />,
      title: 'AI Website',
      description: 'Design websites integrated with AI capabilities for personalized user experiences, including chatbots, recommendation engines, and predictive analytics.',
      features: ['AI Chatbots', 'Recommendation Engine', 'Predictive Analytics', 'Personalization', 'Smart Search']
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery & Planning',
      description: 'We analyze your requirements and create a detailed project plan'
    },
    {
      step: '02',
      title: 'Design & Prototyping',
      description: 'Create wireframes and design mockups for your approval'
    },
    {
      step: '03',
      title: 'Development',
      description: 'Build your website using the latest technologies and best practices'
    },
    {
      step: '04',
      title: 'Testing & Launch',
      description: 'Thorough testing and deployment with ongoing support'
    }
  ];

  return (
    <>
    <Navbar />
    <div className="relative min-h-screen bg-[#6d123f]">
      
      
      {/* Hero Section */}
      <section className=" pt-24 pb-20 bg-[#6d123f] text-[#e6961d]">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <Computer className="w-16 h-16 text-[#e6961d]" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Website Development
            </h1>
            <p className="text-xl md:text-2xl text-[#e6961d] mb-8">
              Transform your business with custom websites that drive results
            </p>
            <p className="text-lg text-white max-w-3xl mx-auto">
              We create stunning, responsive websites that not only look amazing but also deliver exceptional user experiences and drive business growth.
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
              Our Website Development Services
            </h2>
            <div className="w-20 h-1 bg-[#e6961d] mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              From simple business websites to complex e-commerce platforms, we deliver solutions that meet your unique needs.
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

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#6d123f] mb-4">
              Our Development Process
            </h2>
            <div className="w-20 h-1 bg-[#e6961d] mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We follow a proven process to ensure your website is delivered on time and exceeds expectations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#e6961d] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-[#6d123f] mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-700">
                  {step.description}
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
              Ready to Build Your Dream Website?
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss your project and create a website that drives results for your business.
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
    </>
    
  );
};

export default WebsiteDevelopment;

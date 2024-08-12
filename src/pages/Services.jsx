// src/pages/Services.jsx
import React from 'react';
import { FaDesktop, FaMobileAlt, FaSearchDollar, FaCogs } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useState } from 'react';

const services = [
  {
    category: 'Website Development',
    icon: <FaDesktop className="text-4xl mb-4" />,
    items: [
      { title: 'Ecommerce Website', description: 'Develop feature-rich online stores with seamless user experience and secure payment gateways, tailored to boost your sales and customer engagement.' },
      { title: 'Hospital Website', description: 'Create responsive and user-friendly websites for healthcare facilities, offering online appointment scheduling, patient portals, and information management systems.' },
      { title: 'Billing Website', description: 'Build efficient billing systems that streamline invoicing, payment tracking, and financial management, customized to suit your business needs.' },
      { title: 'CMS Website', description: 'Develop Content Management Systems that allow easy content updates, media management, and dynamic web experiences without needing technical expertise.' },
      { title: 'AI Website', description: 'Design websites integrated with AI capabilities for personalized user experiences, including chatbots, recommendation engines, and predictive analytics.' }
    ]
  },
  {
    category: 'App Development',
    icon: <FaMobileAlt className="text-4xl mb-4" />,
    items: [
      { title: 'ECommerce App', description: 'Create mobile apps for online shopping, offering features like product catalogs, secure checkout, and customer accounts, optimized for iOS and Android.' },
      { title: 'Hospital App', description: 'Develop mobile applications for healthcare providers, facilitating patient management, appointment scheduling, and telemedicine services.' },
      { title: 'Billing App', description: 'Build mobile billing solutions for businesses, enabling easy invoicing, payment processing, and financial tracking on the go.' },
      { title: 'AI App', description: 'Design apps with AI-powered features, such as virtual assistants, image recognition, and predictive analytics, tailored to your specific business needs.' },
      { title: 'Social Media App', description: 'Develop social media platforms or apps with engaging features, including user profiles, content sharing, messaging, and social networking.' }
    ]
  },
  {
    category: 'Digital Marketing',
    icon: <FaSearchDollar className="text-4xl mb-4" />,
    items: [
      { title: 'Google & Facebook Ads', description: 'Manage targeted advertising campaigns on Google and Facebook, driving traffic and conversions through strategic ad placements.' },
      { title: 'Search Engine Optimization (SEO)', description: 'Optimize your website to rank higher in search engine results, increasing visibility, traffic, and customer engagement.' },
      { title: 'Social Media Optimization (SMO)', description: 'Enhance your social media presence with strategies to increase followers, engagement, and brand awareness across platforms.' },
      { title: 'Search Engine Marketing (SEM)', description: 'Implement paid search marketing strategies to improve your website’s visibility on search engine results pages through targeted ads.' },
      { title: 'Email Marketing', description: 'Develop and execute email marketing campaigns that engage your audience, boost conversions, and build customer loyalty.' }
    ]
  },
  {
    category: 'Other Services',
    icon: <FaCogs className="text-4xl mb-4" />,
    items: [
      { title: 'Payment Gateway Integration', description: 'Integrate secure payment gateways into your website or app, ensuring smooth and secure online transactions for your customers.' },
      { title: 'Content Writing', description: 'Provide professional content writing services, creating engaging, SEO-friendly copy tailored to your brand’s voice and target audience.' },
      { title: 'Figma Design', description: 'Design high-fidelity prototypes and UI/UX designs using Figma, ensuring a seamless user experience and visually appealing interfaces.' },
      { title: 'PSD to HTML Design', description: 'Convert your Photoshop designs into responsive and pixel-perfect HTML/CSS code, ready for development and deployment.' },
      { title: 'AI Chatbot', description: 'Develop AI-powered chatbots to automate customer service, lead generation, and user interaction, enhancing user experience and operational efficiency.' }
    ]
  }
];

const Services = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };
  const [activeCategory, setActiveCategory] = useState(null);

  const toggleCategory = (index) => {
    setActiveCategory(activeCategory === index ? null : index);
  };

  return (
    <div className="min-h-screen  bg-[#101827] text-gray-400">
      {/* Hero Section */}
      <section className="bg-black text-gray-400 py-20">
        <div className="container mx-auto px-4">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 text-center"
            {...fadeIn}
          >
            Our Services
          </motion.h1>
          <motion.p
            className="text-xl text-center max-w-3xl mx-auto"
            {...fadeIn}
            transition={{ delay: 0.2 }}
          >
            Explore our wide range of services to meet all your web and app development needs.
          </motion.p>
        </div>
      </section>

      {/* Service Categories Section */}
      <div className="container mx-auto py-12 px-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`p-6 cursor-pointer rounded-lg shadow-lg transition-transform duration-300 transform ${
                activeCategory === index ? 'bg-black text-gray-400 scale-105 border border-gray-400' : 'bg-black text-gray-400 scale-105 border border-gray-400'
              }`}
              onClick={() => toggleCategory(index)}
            >
              <div className="flex flex-col items-center">
                {service.icon}
                <h2 className="text-2xl font-bold mt-4">{service.category}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Details Section */}
      {activeCategory !== null && (
        <div className="container mx-auto py-12 px-4 bg-[#101827] text-gray-400">
          <motion.div
            className="bg-black text-gray-400 p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-center">
              {services[activeCategory].category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services[activeCategory].items.map((item, idx) => (
                <div key={idx} className="text-left border border-gray-400 p-5 rounded-2xl text-gray-300">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

   
    </div>
  );
};

export default Services;

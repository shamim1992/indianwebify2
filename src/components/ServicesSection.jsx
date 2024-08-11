import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDesktop, FaMobileAlt, FaSearchDollar, FaCogs } from 'react-icons/fa';

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

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-100 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
        
        <div className="flex flex-wrap justify-center mb-8">
          {services.map((service, index) => (
            <button
              key={service.category}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 m-2 rounded-full transition-colors duration-300 ${
                activeTab === index
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {service.category}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-md p-8"
          >
            <div className="text-center mb-8 flex justify-start gap-6">
              {services[activeTab].icon}
              <span className="text-2xl font-semibold">{services[activeTab].category}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services[activeTab].items.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow duration-300"
                >
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ServicesSection;

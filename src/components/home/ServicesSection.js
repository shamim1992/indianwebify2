


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Computer, Phone, Search, Smartphone, Brain, Microscope } from 'lucide-react';


const services = [
  {
    category: 'Website Development',
    icon: <Computer className="text-4xl mb-4" />,
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
    icon: <Smartphone className="text-4xl mb-4" />,
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
    icon: <Search className="text-4xl mb-4" />,
    items: [
      { title: 'Google & Facebook Ads', description: 'Manage targeted advertising campaigns on Google and Facebook, driving traffic and conversions through strategic ad placements.' },
      { title: 'Search Engine Optimization (SEO)', description: 'Optimize your website to rank higher in search engine results, increasing visibility, traffic, and customer engagement.' },
      { title: 'Social Media Optimization (SMO)', description: 'Enhance your social media presence with strategies to increase followers, engagement, and brand awareness across platforms.' },
      { title: 'Search Engine Marketing (SEM)', description: 'Implement paid search marketing strategies to improve your website visibility on search engine results pages through targeted ads.' },
      { title: 'Email Marketing', description: 'Develop and execute email marketing campaigns that engage your audience, boost conversions, and build customer loyalty.' }
    ]
  },
  {
    category: 'AI Development',
    icon: <Brain className="text-4xl mb-4" />,
    items: [
      { title: 'Machine Learning Models', description: 'Develop custom machine learning models for predictive analytics, data classification, and intelligent automation tailored to your business needs.' },
      { title: 'Natural Language Processing', description: 'Create NLP solutions for text analysis, sentiment analysis, language translation, and intelligent content processing.' },
      { title: 'Computer Vision Solutions', description: 'Build computer vision applications for image recognition, object detection, facial recognition, and automated visual analysis.' },
      { title: 'AI Chatbots & Virtual Assistants', description: 'Develop intelligent chatbots and virtual assistants that can handle customer queries, provide support, and automate business processes.' },
      { title: 'AI Integration Services', description: 'Integrate AI capabilities into existing systems, including recommendation engines, predictive analytics, and intelligent automation workflows.' }
    ]
  },
  {
    category: 'Research Projects',
    icon: <Microscope className="text-4xl mb-4" />,
    items: [
      { title: 'Academic Research Support', description: 'Provide technical support for academic research projects, including data analysis, software development, and research tool creation.' },
      { title: 'Innovation & Prototyping', description: 'Develop proof-of-concept applications and prototypes for innovative ideas, helping validate concepts before full-scale development.' },
      { title: 'Data Science Research', description: 'Conduct data science research projects, including statistical analysis, data mining, and insights generation for research purposes.' },
      { title: 'Technology Feasibility Studies', description: 'Perform feasibility studies for new technologies, evaluating technical viability and implementation strategies for research initiatives.' },
      { title: 'Research Documentation & Reporting', description: 'Create comprehensive documentation and reports for research projects, including technical specifications and findings analysis.' }
    ]
  },
  {
    category: 'Other Services',
    icon: <Code2 className="text-4xl mb-4" />,
    items: [
      { title: 'Payment Gateway Integration', description: 'Integrate secure payment gateways into your website or app, ensuring smooth and secure online transactions for your customers.' },
      { title: 'Content Writing', description: 'Provide professional content writing services, creating engaging, SEO-friendly copy tailored to your brand voice and target audience.' },
      { title: 'Figma Design', description: 'Design high-fidelity prototypes and UI/UX designs using Figma, ensuring a seamless user experience and visually appealing interfaces.' },
      { title: 'PSD to HTML Design', description: 'Convert your Photoshop designs into responsive and pixel-perfect HTML/CSS code, ready for development and deployment.' },
      { title: 'Technical Consulting', description: 'Provide expert technical consulting services to help you make informed decisions about technology stack, architecture, and implementation strategies.' }
    ]
  }
];

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="md:py-16 md:px-8 bg-[#6d123f]">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-4xl font-bold text-center mb-2 text-[#e6961d]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our <span className="text-white">Services</span>
        </motion.h2>
        <div className="w-20 h-1 bg-[#e6961d] mx-auto mb-4"></div>
        
        <div className="flex flex-wrap justify-center mb-8">
          {services.map((service, index) => (
            <button
              key={service.category}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 font-bold shadow m-2 rounded-full transition-colors duration-300 ${
                activeTab === index
                  ? 'bg-[#e6961d] text-white'
                  : 'bg-white text-[#6d123f] hover:bg-[#e6961d] hover:text-white border-2 border-[#e6961d]'
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
            className="rounded-lg p-2"
          >
            <div className="text-center mb-8 flex items-center justify-center gap-3">
              <span className='text-[#e6961d] h-6 w-6'>{services[activeTab].icon}</span> 
              <span className="text-2xl font-semibold text-[#e6961d]">{services[activeTab].category}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {services[activeTab].items.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, boxShadow: '0px 0px 15px rgba(230, 150, 29, 0.3)' }}
                  className="rounded-lg p-4 transition-shadow duration-300 shadow-lg bg-white"
                >
                  <h4 className="mb-3 text-[#6d123f] font-bold text-center text-lg">{item.title}</h4>
                  <p className="text-sm text-gray-700 cursor-pointer leading-relaxed">{item.description}</p>
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

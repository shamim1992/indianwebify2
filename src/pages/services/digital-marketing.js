import React from 'react';
import Navbar from '@/components/header/Navbar';
import FooterSection from '@/components/footer/FooterSection';
import { motion } from 'framer-motion';
import { Search, CheckCircle, ArrowRight, Target, TrendingUp, Users, Mail, Share2 } from 'lucide-react';

const DigitalMarketing = () => {
  const services = [
    {
      icon: <Target className="w-8 h-8 text-[#e6961d]" />,
      title: 'Google & Facebook Ads',
      description: 'Manage targeted advertising campaigns on Google and Facebook, driving traffic and conversions through strategic ad placements.',
      features: ['Campaign Management', 'Target Audience Analysis', 'Ad Creative Design', 'Performance Tracking', 'ROI Optimization']
    },
    {
      icon: <Search className="w-8 h-8 text-[#e6961d]" />,
      title: 'Search Engine Optimization (SEO)',
      description: 'Optimize your website to rank higher in search engine results, increasing visibility, traffic, and customer engagement.',
      features: ['Keyword Research', 'On-Page Optimization', 'Technical SEO', 'Link Building', 'Local SEO']
    },
    {
      icon: <Share2 className="w-8 h-8 text-[#e6961d]" />,
      title: 'Social Media Optimization (SMO)',
      description: 'Enhance your social media presence with strategies to increase followers, engagement, and brand awareness across platforms.',
      features: ['Content Strategy', 'Community Management', 'Social Media Advertising', 'Influencer Marketing', 'Analytics & Reporting']
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-[#e6961d]" />,
      title: 'Search Engine Marketing (SEM)',
      description: 'Implement paid search marketing strategies to improve your website visibility on search engine results pages through targeted ads.',
      features: ['PPC Campaigns', 'Ad Copywriting', 'Bid Management', 'Landing Page Optimization', 'Conversion Tracking']
    },
    {
      icon: <Mail className="w-8 h-8 text-[#e6961d]" />,
      title: 'Email Marketing',
      description: 'Develop and execute email marketing campaigns that engage your audience, boost conversions, and build customer loyalty.',
      features: ['Email Campaign Design', 'List Management', 'Automation Workflows', 'A/B Testing', 'Performance Analytics']
    }
  ];

  const platforms = [
    { name: 'Google Ads', description: 'Search and display advertising' },
    { name: 'Facebook & Instagram', description: 'Social media advertising' },
    { name: 'LinkedIn', description: 'B2B professional networking' },
    { name: 'YouTube', description: 'Video advertising platform' },
    { name: 'Twitter', description: 'Real-time social engagement' },
    { name: 'TikTok', description: 'Short-form video marketing' }
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
              <Search className="w-16 h-16 text-[#e6961d]" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Digital Marketing
            </h1>
            <p className="text-xl md:text-2xl text-[#e6961d] mb-8">
              Drive growth with data-driven digital marketing strategies
            </p>
            <p className="text-lg text-white max-w-3xl mx-auto">
              We create comprehensive digital marketing campaigns that increase your online visibility, engage your audience, and drive measurable results.
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
              Our Digital Marketing Services
            </h2>
            <div className="w-20 h-1 bg-[#e6961d] mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              From SEO to social media marketing, we provide comprehensive digital marketing solutions that deliver results.
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

      {/* Platforms Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#6d123f] mb-4">
              Marketing Platforms
            </h2>
            <div className="w-20 h-1 bg-[#e6961d] mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We manage campaigns across all major digital marketing platforms to maximize your reach and ROI.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platforms.map((platform, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg p-8 text-center hover:bg-[#e6961d] hover:text-white transition-colors duration-300 shadow-lg border border-gray-200"
              >
                <h3 className="text-xl font-bold text-[#6d123f] mb-2">
                  {platform.name}
                </h3>
                <p className="text-gray-700">
                  {platform.description}
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
              Ready to Boost Your Digital Presence?
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Let's create a digital marketing strategy that drives traffic, engagement, and conversions for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-[#e6961d] text-white rounded-full font-bold hover:bg-white hover:text-[#6d123f] transition-colors duration-300 flex items-center justify-center shadow-lg"
              >
                Get Marketing Strategy
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 border-2 border-[#e6961d] text-[#e6961d] rounded-full font-bold hover:bg-[#e6961d] hover:text-white transition-colors duration-300 shadow-lg"
              >
                View Case Studies
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default DigitalMarketing;

import React from 'react';
import Navbar from '@/components/header/Navbar';
import FooterSection from '@/components/footer/FooterSection';
import { motion } from 'framer-motion';
import { Code2, CheckCircle, ArrowRight, CreditCard, FileText, Palette, Layers, MessageSquare } from 'lucide-react';

const OtherServices = () => {
  const services = [
    {
      icon: <CreditCard className="w-8 h-8 text-[#e6961d]" />,
      title: 'Payment Gateway Integration',
      description: 'Integrate secure payment gateways into your website or app, ensuring smooth and secure online transactions for your customers.',
      features: ['Multiple Payment Methods', 'Secure Transactions', 'Real-time Processing', 'Fraud Protection', 'Mobile Payments']
    },
    {
      icon: <FileText className="w-8 h-8 text-[#e6961d]" />,
      title: 'Content Writing',
      description: 'Provide professional content writing services, creating engaging, SEO-friendly copy tailored to your brand voice and target audience.',
      features: ['SEO-Optimized Content', 'Brand Voice Development', 'Blog Writing', 'Website Copy', 'Marketing Materials']
    },
    {
      icon: <Palette className="w-8 h-8 text-[#e6961d]" />,
      title: 'Figma Design',
      description: 'Design high-fidelity prototypes and UI/UX designs using Figma, ensuring a seamless user experience and visually appealing interfaces.',
      features: ['UI/UX Design', 'Interactive Prototypes', 'Design Systems', 'User Research', 'Design Handoff']
    },
    {
      icon: <Layers className="w-8 h-8 text-[#e6961d]" />,
      title: 'PSD to HTML Design',
      description: 'Convert your Photoshop designs into responsive and pixel-perfect HTML/CSS code, ready for development and deployment.',
      features: ['Pixel-Perfect Conversion', 'Responsive Design', 'Cross-Browser Compatibility', 'Clean Code', 'Fast Loading']
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-[#e6961d]" />,
      title: 'Technical Consulting',
      description: 'Provide expert technical consulting services to help you make informed decisions about technology stack, architecture, and implementation strategies.',
      features: ['Technology Assessment', 'Architecture Planning', 'Performance Optimization', 'Security Audits', 'Migration Support']
    }
  ];

  const technologies = [
    { name: 'Payment Gateways', description: 'Stripe, PayPal, Razorpay, Square' },
    { name: 'Design Tools', description: 'Figma, Adobe XD, Sketch, Photoshop' },
    { name: 'Frontend Technologies', description: 'React, Vue.js, Angular, HTML5/CSS3' },
    { name: 'Backend Technologies', description: 'Node.js, Python, PHP, Java' },
    { name: 'Cloud Platforms', description: 'AWS, Google Cloud, Azure, Vercel' },
    { name: 'Content Management', description: 'WordPress, Drupal, Custom CMS' }
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
              <Code2 className="w-16 h-16 text-[#e6961d]" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Other Services
            </h1>
            <p className="text-xl md:text-2xl text-[#e6961d] mb-8">
              Comprehensive support services to complete your digital transformation
            </p>
            <p className="text-lg text-white max-w-3xl mx-auto">
              From payment integration to technical consulting, we provide all the additional services you need to succeed in the digital world.
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
              Our Additional Services
            </h2>
            <div className="w-20 h-1 bg-[#e6961d] mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We offer a wide range of complementary services to support your digital projects and business growth.
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
              Technologies & Tools
            </h2>
            <div className="w-20 h-1 bg-[#e6961d] mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We work with the latest technologies and industry-standard tools to deliver exceptional results.
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
              Need Additional Support Services?
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Let's discuss how our additional services can help complete your digital project and support your business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-[#e6961d] text-white rounded-full font-bold hover:bg-white hover:text-[#6d123f] transition-colors duration-300 flex items-center justify-center shadow-lg"
              >
                Get Service Quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 border-2 border-[#e6961d] text-[#e6961d] rounded-full font-bold hover:bg-[#e6961d] hover:text-white transition-colors duration-300 shadow-lg"
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default OtherServices;

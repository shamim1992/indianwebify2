import React from 'react';
import Navbar from '@/components/header/Navbar';
import FooterSection from '@/components/footer/FooterSection';
import { motion } from 'framer-motion';
import { Users, Target, Award, Globe, CheckCircle, ArrowRight } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Target className="w-8 h-8 text-[#e6961d]" />,
      title: 'Innovation',
      description: 'We stay at the forefront of technology, constantly exploring new solutions and approaches.'
    },
    {
      icon: <Users className="w-8 h-8 text-[#e6961d]" />,
      title: 'Collaboration',
      description: 'We work closely with our clients as partners, ensuring their vision becomes reality.'
    },
    {
      icon: <Award className="w-8 h-8 text-[#e6961d]" />,
      title: 'Excellence',
      description: 'We deliver high-quality solutions that exceed expectations and drive results.'
    },
    {
      icon: <Globe className="w-8 h-8 text-[#e6961d]" />,
      title: 'Global Reach',
      description: 'We serve clients worldwide with scalable and accessible digital solutions.'
    }
  ];

  const team = [
    {
      name: 'Shamim Sheikh',
      role: 'Founder & CEO',
      description: 'Visionary leader with 10+ years in digital transformation'
    },
    {
      name: 'Development Team',
      role: 'Full-Stack Developers',
      description: 'Expert developers specializing in modern web technologies'
    },
    {
      name: 'AI Research Team',
      role: 'AI Specialists',
      description: 'Machine learning experts and data scientists'
    },
    {
      name: 'Design Team',
      role: 'UI/UX Designers',
      description: 'Creative designers focused on user experience'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-[#6d123f] text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About Indian Webify
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Empowering businesses through innovative digital solutions
            </p>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              We are a premier digital services company dedicated to transforming businesses through cutting-edge technology, AI development, and comprehensive digital solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="w-20 h-1 bg-[#e6961d] mb-6"></div>
              <p className="text-lg text-gray-600 mb-6">
                Founded with a vision to empower businesses through technology, Indian Webify has grown from a small startup to a comprehensive digital services company. We believe in the power of innovation and the potential of every business to thrive in the digital age.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our journey began with a simple mission: to bridge the gap between traditional businesses and modern technology. Today, we specialize in web development, mobile applications, AI solutions, research projects, and digital marketing.
              </p>
              <p className="text-lg text-gray-600">
                We have successfully delivered over 200 projects for clients across various industries, helping them achieve their digital transformation goals and drive sustainable growth.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="w-full h-96 bg-gray-200 rounded-lg relative overflow-hidden shadow-lg">
                <img src="/indianwebify.png" alt="Indian Webify Team" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <div className="w-20 h-1 bg-[#e6961d] mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our core values guide everything we do and shape our approach to client relationships and project delivery.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Team
            </h2>
            <div className="w-20 h-1 bg-[#e6961d] mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our diverse team of experts brings together years of experience in technology, design, and business strategy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-20 h-20 bg-[#e6961d] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-[#e6961d] font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#6d123f] text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and see how we can help you achieve your digital transformation goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-[#6d123f] rounded-full font-bold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-[#6d123f] transition-colors duration-300"
              >
                View Our Services
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default About;

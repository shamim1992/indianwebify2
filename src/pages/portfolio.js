import React, { useState } from 'react';
import Navbar from '@/components/header/Navbar';
import FooterSection from '@/components/footer/FooterSection';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import { Computer, Smartphone, Brain, Search, Filter, ExternalLink } from 'lucide-react';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Web Development', 'App Development', 'AI Development', 'Digital Marketing'];

  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      category: 'Web Development',
      description: 'A comprehensive e-commerce solution with advanced features including AI-powered recommendations.',
      image: '/slider1.png',
      technologies: ['React', 'Node.js', 'MongoDB', 'AI Integration'],
      icon: <Computer className="w-6 h-6" />
    },
    {
      id: 2,
      title: 'Healthcare Mobile App',
      category: 'App Development',
      description: 'A mobile application for healthcare providers with telemedicine capabilities.',
      image: '/slider1.png',
      technologies: ['React Native', 'Firebase', 'Video Calling'],
      icon: <Smartphone className="w-6 h-6" />
    },
    {
      id: 3,
      title: 'AI Chatbot System',
      category: 'AI Development',
      description: 'An intelligent chatbot system with natural language processing capabilities.',
      image: '/slider1.png',
      technologies: ['Python', 'TensorFlow', 'NLP', 'API Integration'],
      icon: <Brain className="w-6 h-6" />
    },
    {
      id: 4,
      title: 'Digital Marketing Campaign',
      category: 'Digital Marketing',
      description: 'Comprehensive digital marketing strategy that increased client revenue by 300%.',
      image: '/slider1.png',
      technologies: ['Google Ads', 'Facebook Ads', 'SEO', 'Analytics'],
      icon: <Search className="w-6 h-6" />
    },
    {
      id: 5,
      title: 'Hospital Management System',
      category: 'Web Development',
      description: 'Complete hospital management system with patient records and appointment scheduling.',
      image: '/slider1.png',
      technologies: ['Vue.js', 'Laravel', 'MySQL', 'Real-time Updates'],
      icon: <Computer className="w-6 h-6" />
    },
    {
      id: 6,
      title: 'Social Media App',
      category: 'App Development',
      description: 'A social media platform with real-time messaging and content sharing features.',
      image: '/slider1.png',
      technologies: ['Flutter', 'Firebase', 'Real-time Database'],
      icon: <Smartphone className="w-6 h-6" />
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <>
      <SEO
        title="Our Portfolio - Indian Webify"
        description="Explore Indian Webify's portfolio of successful projects including web development, mobile apps, AI solutions, and digital marketing campaigns. See our work and client success stories."
        keywords="Indian Webify portfolio, web development projects, mobile app examples, AI development projects, digital marketing case studies, client projects"
        url="/portfolio"
        image="/indianwebify.png"
      />
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
              Our Portfolio
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Showcasing our best work and successful projects
            </p>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Explore our diverse portfolio of digital solutions that have helped businesses achieve their goals and drive growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-[#e6961d] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white text-gray-900 px-4 py-2 rounded-full font-semibold flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      View Project
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="text-[#e6961d]">
                      {project.icon}
                    </div>
                    <span className="text-sm font-semibold text-[#e6961d]">
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Achievements
            </h2>
            <div className="w-20 h-1 bg-[#e6961d] mx-auto mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '200+', label: 'Projects Completed' },
              { number: '150+', label: 'Happy Clients' },
              { number: '50+', label: 'Countries Served' },
              { number: '99%', label: 'Client Satisfaction' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-[#e6961d] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
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
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let&apos;s create something amazing together. Contact us to discuss your project requirements.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-[#6d123f] rounded-full font-bold hover:bg-gray-100 transition-colors duration-300"
            >
              Start Your Project
            </motion.button>
          </motion.div>
        </div>
      </section>

        <FooterSection />
      </div>
    </>
  );
};

export default Portfolio;

import React from 'react';
import Navbar from '@/components/header/Navbar';
import FooterSection from '@/components/footer/FooterSection';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import { Microscope, CheckCircle, ArrowRight, GraduationCap, Lightbulb, BarChart3, FileText, Search } from 'lucide-react';

const ResearchProjects = () => {
  const services = [
    {
      icon: <GraduationCap className="w-8 h-8 text-[#e6961d]" />,
      title: 'Academic Research Support',
      description: 'Provide technical support for academic research projects, including data analysis, software development, and research tool creation.',
      features: ['Data Analysis', 'Software Development', 'Research Tools', 'Statistical Analysis', 'Documentation']
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-[#e6961d]" />,
      title: 'Innovation & Prototyping',
      description: 'Develop proof-of-concept applications and prototypes for innovative ideas, helping validate concepts before full-scale development.',
      features: ['Proof of Concept', 'Rapid Prototyping', 'Concept Validation', 'MVP Development', 'Technical Feasibility']
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-[#e6961d]" />,
      title: 'Data Science Research',
      description: 'Conduct data science research projects, including statistical analysis, data mining, and insights generation for research purposes.',
      features: ['Statistical Analysis', 'Data Mining', 'Insights Generation', 'Predictive Modeling', 'Research Reports']
    },
    {
      icon: <Search className="w-8 h-8 text-[#e6961d]" />,
      title: 'Technology Feasibility Studies',
      description: 'Perform feasibility studies for new technologies, evaluating technical viability and implementation strategies for research initiatives.',
      features: ['Technical Assessment', 'Viability Analysis', 'Implementation Strategy', 'Risk Evaluation', 'Cost Analysis']
    },
    {
      icon: <FileText className="w-8 h-8 text-[#e6961d]" />,
      title: 'Research Documentation & Reporting',
      description: 'Create comprehensive documentation and reports for research projects, including technical specifications and findings analysis.',
      features: ['Technical Documentation', 'Research Reports', 'Findings Analysis', 'Specifications', 'Publication Support']
    }
  ];

  const researchAreas = [
    { name: 'Machine Learning Research', description: 'Advanced ML algorithms and applications' },
    { name: 'Data Analytics', description: 'Big data processing and analysis' },
    { name: 'IoT & Smart Systems', description: 'Internet of Things research' },
    { name: 'Blockchain Technology', description: 'Distributed ledger systems' },
    { name: 'Cybersecurity Research', description: 'Security protocols and systems' },
    { name: 'Human-Computer Interaction', description: 'User experience research' }
  ];

  return (
    <>
      <SEO
        title="Research Projects Services - Indian Webify"
        description="Comprehensive research project support including academic research, data science research, technology feasibility studies, innovation & prototyping, and research documentation services."
        keywords="research projects, academic research support, data science research, technology feasibility studies, prototyping, research documentation, Indian Webify"
        url="/services/research-projects"
        image="/indianwebify.png"
      />
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
              <Microscope className="w-16 h-16 text-[#e6961d]" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Research Projects
            </h1>
            <p className="text-xl md:text-2xl text-[#e6961d] mb-8">
              Turn innovative ideas into reality through cutting-edge research
            </p>
            <p className="text-lg text-white max-w-3xl mx-auto">
              We provide comprehensive research support, from academic projects to technology innovation, helping you explore new frontiers in technology.
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
              Our Research Services
            </h2>
            <div className="w-20 h-1 bg-[#e6961d] mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              From academic research support to technology innovation, we help you explore new possibilities and validate concepts.
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

      {/* Research Areas Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#6d123f] mb-4">
              Research Areas
            </h2>
            <div className="w-20 h-1 bg-[#e6961d] mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We conduct research across various technology domains to stay at the forefront of innovation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {researchAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg p-8 text-center hover:bg-[#e6961d] hover:text-white transition-colors duration-300 shadow-lg border border-gray-200"
              >
                <h3 className="text-xl font-bold text-[#6d123f] mb-2">
                  {area.name}
                </h3>
                <p className="text-gray-700">
                  {area.description}
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
              Ready to Start Your Research Project?
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss your research goals and explore how we can help you achieve breakthrough results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-[#e6961d] text-white rounded-full font-bold hover:bg-white hover:text-[#6d123f] transition-colors duration-300 flex items-center justify-center shadow-lg"
              >
                Discuss Your Project
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 border-2 border-[#e6961d] text-[#e6961d] rounded-full font-bold hover:bg-[#e6961d] hover:text-white transition-colors duration-300 shadow-lg"
              >
                View Research Portfolio
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

export default ResearchProjects;

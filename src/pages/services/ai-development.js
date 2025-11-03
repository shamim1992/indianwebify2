import React from 'react';
import Navbar from '@/components/header/Navbar';
import FooterSection from '@/components/footer/FooterSection';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import { Brain, CheckCircle, ArrowRight, Cpu, MessageSquare, Eye, Zap, BarChart3 } from 'lucide-react';

const AIDevelopment = () => {
  const services = [
    {
      icon: <Cpu className="w-8 h-8 text-[#e6961d]" />,
      title: 'Machine Learning Models',
      description: 'Develop custom machine learning models for predictive analytics, data classification, and intelligent automation tailored to your business needs.',
      features: ['Predictive Analytics', 'Data Classification', 'Pattern Recognition', 'Automated Decision Making', 'Model Training & Optimization']
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-[#e6961d]" />,
      title: 'Natural Language Processing',
      description: 'Create NLP solutions for text analysis, sentiment analysis, language translation, and intelligent content processing.',
      features: ['Text Analysis', 'Sentiment Analysis', 'Language Translation', 'Content Processing', 'Chatbot Development']
    },
    {
      icon: <Eye className="w-8 h-8 text-[#e6961d]" />,
      title: 'Computer Vision Solutions',
      description: 'Build computer vision applications for image recognition, object detection, facial recognition, and automated visual analysis.',
      features: ['Image Recognition', 'Object Detection', 'Facial Recognition', 'Visual Analysis', 'Quality Control']
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-[#e6961d]" />,
      title: 'AI Chatbots & Virtual Assistants',
      description: 'Develop intelligent chatbots and virtual assistants that can handle customer queries, provide support, and automate business processes.',
      features: ['Customer Support', 'Lead Generation', 'Process Automation', 'Multi-language Support', 'Integration APIs']
    },
    {
      icon: <Zap className="w-8 h-8 text-[#e6961d]" />,
      title: 'AI Integration Services',
      description: 'Integrate AI capabilities into existing systems, including recommendation engines, predictive analytics, and intelligent automation workflows.',
      features: ['System Integration', 'Recommendation Engines', 'Workflow Automation', 'API Development', 'Legacy System Modernization']
    }
  ];

  const technologies = [
    { name: 'TensorFlow', description: 'Open-source machine learning platform' },
    { name: 'PyTorch', description: 'Deep learning framework' },
    { name: 'OpenAI GPT', description: 'Large language models' },
    { name: 'Computer Vision', description: 'Image and video analysis' },
    { name: 'Natural Language Processing', description: 'Text and speech processing' },
    { name: 'Cloud AI Services', description: 'AWS, Google Cloud, Azure AI' }
  ];

  return (
    <>
      <SEO
        title="AI Development Services - Indian Webify"
        description="Cutting-edge AI development services including machine learning models, NLP solutions, computer vision, AI chatbots, and AI integration. Transform your business with artificial intelligence."
        keywords="AI development, machine learning, natural language processing, computer vision, AI chatbots, TensorFlow, PyTorch, AI integration, Indian Webify"
        url="/services/ai-development"
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
              <Brain className="w-16 h-16 text-[#e6961d]" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              AI Development
            </h1>
            <p className="text-xl md:text-2xl text-[#e6961d] mb-8">
              Harness the power of artificial intelligence to transform your business
            </p>
            <p className="text-lg text-white max-w-3xl mx-auto">
              We develop cutting-edge AI solutions that automate processes, enhance decision-making, and create intelligent user experiences.
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
              Our AI Development Services
            </h2>
            <div className="w-20 h-1 bg-[#e6961d] mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              From machine learning models to intelligent automation, we create AI solutions that drive innovation and efficiency.
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
              AI Technologies We Use
            </h2>
            <div className="w-20 h-1 bg-[#e6961d] mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We leverage the latest AI technologies and frameworks to build intelligent solutions.
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
              Ready to Implement AI in Your Business?
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how AI can transform your business processes and create intelligent solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-[#e6961d] text-white rounded-full font-bold hover:bg-white hover:text-[#6d123f] transition-colors duration-300 flex items-center justify-center shadow-lg"
              >
                Get Free Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 border-2 border-[#e6961d] text-[#e6961d] rounded-full font-bold hover:bg-[#e6961d] hover:text-white transition-colors duration-300 shadow-lg"
              >
                View AI Portfolio
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

export default AIDevelopment;

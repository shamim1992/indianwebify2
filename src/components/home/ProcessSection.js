import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  FileCode, 
  Layers, 
  Monitor, 
  Rocket,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  const processSteps = [
    {
      id: 1,
      title: "Discovery & Strategy",
      icon: <Search className="w-10 h-10" />,
      description: "We begin by understanding your business, goals, and target audience. Our team conducts thorough research to develop a tailored digital strategy.",
      details: [
        "In-depth business analysis",
        "Market research and competitor analysis",
        "User persona development",
        "Goal setting and project scoping",
        "Technology stack selection"
      ],
      color: "#6d123f"
    },
    {
      id: 2,
      title: "Design & Prototype",
      icon: <Layers className="w-10 h-10" />,
      description: "Our design team creates wireframes and interactive prototypes to visualize the solution before development begins, ensuring alignment with your vision.",
      details: [
        "Information architecture planning",
        "Wireframing and mockups",
        "UI/UX design",
        "Interactive prototyping",
        "Design review and iterations"
      ],
      color: "#8a1d50"
    },
    {
      id: 3,
      title: "Development",
      icon: <FileCode className="w-10 h-10" />,
      description: "Our expert developers build your solution with clean, efficient code, focusing on performance, scalability, and security throughout the process.",
      details: [
        "Frontend development",
        "Backend system implementation",
        "Database architecture",
        "API integrations",
        "Security implementation"
      ],
      color: "#a02a62"
    },
    {
      id: 4,
      title: "Testing & Quality Assurance",
      icon: <CheckCircle className="w-10 h-10" />,
      description: "We rigorously test all aspects of your project to ensure functionality, compatibility, and optimal performance across all devices and browsers.",
      details: [
        "Functional testing",
        "Cross-browser compatibility testing",
        "Responsive design verification",
        "Performance optimization",
        "Security testing"
      ],
      color: "#b63b73"
    },
    {
      id: 5,
      title: "Deployment",
      icon: <Rocket className="w-10 h-10" />,
      description: "We carefully launch your project, ensuring a smooth transition to the live environment with minimal disruption to your business operations.",
      details: [
        "Server setup and configuration",
        "Domain and SSL implementation",
        "Data migration",
        "Final pre-launch checks",
        "Smooth deployment process"
      ],
      color: "#ca4f84"
    },
    {
      id: 6,
      title: "Maintenance & Support",
      icon: <Monitor className="w-10 h-10" />,
      description: "Our relationship continues after launch with ongoing maintenance, updates, and support to ensure your digital solution continues to perform optimally.",
      details: [
        "Regular updates and maintenance",
        "Performance monitoring",
        "Security patching",
        "Content updates",
        "Technical support"
      ],
      color: "#e6961d"
    }
  ];

  // Auto-scroll through steps every 5 seconds if no step is active
  useEffect(() => {
    if (activeStep !== null) return;
    
    const interval = setInterval(() => {
      setCurrentStep(prev => prev === processSteps.length ? 1 : prev + 1);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeStep, processSteps.length]);

  const handleStepClick = (stepId) => {
    if (activeStep === stepId) {
      setActiveStep(null);
      setCurrentStep(stepId);
    } else {
      setActiveStep(stepId);
      setCurrentStep(stepId);
    }
  };

  return (
    <section className="py-10 relative  overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#6d123f] opacity-5 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#e6961d] opacity-5 rounded-tr-full"></div>
         */}
        {/* {processSteps.map((step) => (
          <motion.div
            key={`bg-${step.id}`}
            className="absolute opacity-5 rounded-full"
            style={{
              background: step.color,
              width: '300px',
              height: '300px',
              x: `calc(${step.id * 15}% - 150px)`,
              y: `calc(${step.id * 10}% - 150px)`,
              scale: currentStep === step.id ? 1.2 : 0.8,
            }}
            animate={{
              scale: currentStep === step.id ? 1.2 : 0.8,
              opacity: currentStep === step.id ? 0.1 : 0.05,
            }}
            transition={{ duration: 0.8 }}
          />
        ))} */}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-6">
          {/* <motion.span
            className="inline-block px-4 py-1 bg-[#6d123f] bg-opacity-10 text-[#6d123f] font-semibold rounded-full mb-4"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            OUR METHODOLOGY
          </motion.span> */}
          <motion.h2
            className="text-4xl font-bold mb-2"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Our <span className="text-[#6d123f] relative">
              Process
            
            </span>
          </motion.h2>
          <div className="w-20 h-1 bg-[#e6961d] mx-auto mb-4"></div>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Our proven six-step approach ensures your project is delivered with precision, 
            quality and attention to detail at every stage of development
          </motion.p>
        </div>

        {/* Interactive Progress Indicator */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative">
            {/* Progress Bar */}
            <div className="h-1 bg-gray-200 rounded-full">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#6d123f] to-[#e6961d] rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${(currentStep/processSteps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            
            {/* Step Indicators */}
            <div className="flex justify-between mt-4">
              {processSteps.map((step) => (
                <button
                  key={`indicator-${step.id}`}
                  onClick={() => handleStepClick(step.id)}
                  className="relative"
                >
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold shadow cursor-pointer
                      ${currentStep >= step.id ? 'bg-gradient-to-br from-[#6d123f] to-[#ca4f84]' : 'bg-white border-2 border-gray-200 text-gray-400'}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ 
                      scale: currentStep === step.id ? 1.2 : 1,
                      boxShadow: currentStep === step.id ? '0 0 20px rgba(230, 150, 29, 0.5)' : '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.id}
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap font-semibold text-xs"
                    animate={{ 
                      opacity: currentStep === step.id ? 1 : 0.7,
                      scale: currentStep === step.id ? 1 : 0.9,
                    }}
                  >
                    {step.title.split(' ')[0]}
                  </motion.div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Display Area */}
        <div className="max-w-5xl mx-auto">
          {/* Current Step Card */}
          {processSteps.map((step) => (
            <motion.div
              key={`step-${step.id}`}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: currentStep === step.id ? 1 : 0,
                y: currentStep === step.id ? 0 : 20,
                display: currentStep === step.id ? 'block' : 'none'
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col md:flex-row gap-8 items-center bg-white rounded-2xl shadow p-8 overflow-hidden">
                {/* Step Icon & Number */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <motion.div
                      className="w-28 h-28 rounded-full flex items-center justify-center bg-gradient-to-br"
                      style={{ 
                        backgroundImage: `linear-gradient(to bottom right, ${step.color}, ${step.color}dd)`
                      }}
                      animate={{
                        boxShadow: [
                          `0 0 0 0 rgba(${step.id * 30}, ${step.id * 10}, ${step.id * 5}, 0)`,
                          `0 0 0 15px rgba(${step.id * 30}, ${step.id * 10}, ${step.id * 5}, 0.2)`,
                          `0 0 0 0 rgba(${step.id * 30}, ${step.id * 10}, ${step.id * 5}, 0)`
                        ]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2.5
                      }}
                    >
                      <div className="text-white">
                        {step.icon}
                      </div>
                    </motion.div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center font-bold text-[#6d123f]">
                      {step.id}
                    </div>
                  </div>
                </div>
                
                {/* Step Content */}
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#6d123f] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {step.description}
                  </p>
                  
                  {/* Detailed Content */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: activeStep === step.id ? 1 : 0,
                      height: activeStep === step.id ? 'auto' : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-gray-200 pt-5 mt-2">
                      <h4 className="font-bold text-[#e6961d] mb-4 text-lg">Key Deliverables:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start bg-gray-50 p-3 rounded-lg">
                            <div className="mt-1 mr-3 p-1 rounded-full bg-[#e6961d] bg-opacity-20 flex items-center justify-center">
                              <CheckCircle size={14} className="text-[#e6961d]" />
                            </div>
                            <span className="text-gray-700">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Toggle Button */}
                  <button
                    onClick={() => handleStepClick(step.id)}
                    className="mt-6 inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#6d123f] rounded-lg transition-colors duration-300"
                  >
                    {activeStep === step.id ? (
                      <>
                        <ChevronUp size={16} className="mr-2" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown size={16} className="mr-2" />
                        Show Details
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              {/* Next/Prev Navigation */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => {
                    setActiveStep(null);
                    setCurrentStep(prev => prev === 1 ? processSteps.length : prev - 1);
                  }}
                  className="flex items-center text-gray-600 hover:text-[#6d123f]"
                >
                  <ArrowRight size={16} className="transform rotate-180 mr-2" />
                  Previous Step
                </button>
                <button
                  onClick={() => {
                    setActiveStep(null);
                    setCurrentStep(prev => prev === processSteps.length ? 1 : prev + 1);
                  }}
                  className="flex items-center text-gray-600 hover:text-[#6d123f]"
                >
                  Next Step
                  <ArrowRight size={16} className="ml-2" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Process Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-5xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white p-6 rounded-xl shadow border-t-4 border-[#6d123f]">
            <div className="w-12 h-12 rounded-full bg-[#6d123f] bg-opacity-10 flex items-center justify-center mb-4">
              <CheckCircle className="text-[#6d123f]" />
            </div>
            <h4 className="text-lg font-bold text-[#6d123f] mb-2">Proven Methodology</h4>
            <p className="text-gray-600">Our systematic approach has been refined through years of successful project deliveries across diverse industries.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow border-t-4 border-[#a02a62]">
            <div className="w-12 h-12 rounded-full bg-[#a02a62] bg-opacity-10 flex items-center justify-center mb-4">
              <Search className="text-[#a02a62]" />
            </div>
            <h4 className="text-lg font-bold text-[#a02a62] mb-2">Transparent Communication</h4>
            <p className="text-gray-600">You'll always know exactly where your project stands with regular updates and clear milestone tracking.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow border-t-4 border-[#e6961d]">
            <div className="w-12 h-12 rounded-full bg-[#e6961d] bg-opacity-10 flex items-center justify-center mb-4">
              <Rocket className="text-[#e6961d]" />
            </div>
            <h4 className="text-lg font-bold text-[#e6961d] mb-2">Flexible Adaptation</h4>
            <p className="text-gray-600">Our process adjusts to your specific needs while maintaining the structure needed for successful outcomes.</p>
          </div>
        </motion.div>
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <a 
            href="/contact" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#6d123f] to-[#ca4f84] text-white font-bold rounded-full shadow hover:shadow transform transition-all duration-300 hover:-translate-y-1"
          >
            Start Your Project
            <ArrowRight className="ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
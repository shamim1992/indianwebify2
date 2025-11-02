import React, { useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { 
  ExternalLink, 
  Code, 
  Smartphone, 
  ShoppingBag, 
  Globe, 
  Layers,
  ChevronDown,
  X,
  Check,
  Star
} from 'lucide-react';

const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const controls = useAnimation();
  const containerRef = useRef(null);

  // Portfolio filters with icons
  const filters = [
    { id: 'all', label: 'All Projects', icon: <Layers className="w-4 h-4" /> },
    { id: 'web', label: 'Website', icon: <Globe className="w-4 h-4" /> },
    { id: 'app', label: 'Mobile App', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'ecommerce', label: 'E-commerce', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'ui', label: 'UI/UX Design', icon: <Code className="w-4 h-4" /> }
  ];

  // Portfolio projects
  const projects = [
    {
      id: 1,
      title: 'MediConnect Portal',
      category: 'web',
      image: '/portfolio/project1.jpg', // Replace with actual image
      icon: <Globe className="w-6 h-6" />,
      description: 'A comprehensive healthcare portal for hospitals to manage patient records, appointments, and telemedicine services.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      link: '#',
      stats: {
        users: '5,000+',
        hospitals: '12',
        appointments: '250+ daily'
      }
    },
    {
      id: 2,
      title: 'ShopEase Mobile App',
      category: 'app',
      image: '/portfolio/project2.jpg', // Replace with actual image
      icon: <Smartphone className="w-6 h-6" />,
      description: 'A feature-rich e-commerce mobile application with personalized shopping experiences and secure payment integration.',
      technologies: ['React Native', 'Firebase', 'Redux', 'Stripe API'],
      link: '#',
      stats: {
        downloads: '25,000+',
        rating: '4.7/5',
        transactions: '1,200+ daily'
      }
    },
    {
      id: 3,
      title: 'GourmetBasket',
      category: 'ecommerce',
      image: '/portfolio/project3.jpg', // Replace with actual image
      icon: <ShoppingBag className="w-6 h-6" />,
      description: 'An online grocery platform with subscription services, recipe recommendations, and contactless delivery options.',
      technologies: ['WordPress', 'WooCommerce', 'PHP', 'MySQL', 'jQuery'],
      link: '#',
      stats: {
        products: '5,000+',
        customers: '15,000+',
        orders: '500+ daily'
      }
    },
    {
      id: 4,
      title: 'FinTrack Dashboard',
      category: 'ui',
      image: '/portfolio/project4.jpg', // Replace with actual image
      icon: <Code className="w-6 h-6" />,
      description: 'A modern financial analytics dashboard with intuitive visualizations and real-time data monitoring capabilities.',
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'Illustrator'],
      link: '#',
      stats: {
        charts: '35+',
        users: '1,200+',
        dataPoints: '1M+ processed'
      }
    },
    {
      id: 5,
      title: 'TravelBuddy App',
      category: 'app',
      image: '/portfolio/project5.jpg', // Replace with actual image
      icon: <Smartphone className="w-6 h-6" />,
      description: 'A travel companion app with itinerary planning, local recommendations, and augmented reality navigation features.',
      technologies: ['Flutter', 'Dart', 'Google Maps API', 'Firebase'],
      link: '#',
      stats: {
        destinations: '1,500+',
        users: '45,000+',
        trips: '12,000+ planned'
      }
    },
    {
      id: 6,
      title: 'EduLearn Platform',
      category: 'web',
      image: '/portfolio/project6.jpg', // Replace with actual image
      icon: <Globe className="w-6 h-6" />,
      description: 'An educational platform with interactive courses, live sessions, and progress tracking for students and educators.',
      technologies: ['Angular', 'TypeScript', 'Node.js', 'MongoDB'],
      link: '#',
      stats: {
        courses: '250+',
        students: '35,000+',
        instructors: '120+'
      }
    },
    {
      id: 7,
      title: 'DineReserve System',
      category: 'web',
      image: '/portfolio/project7.jpg', // Replace with actual image
      icon: <Globe className="w-6 h-6" />,
      description: 'A restaurant reservation and management system with table planning, waitlist management, and customer profile features.',
      technologies: ['Vue.js', 'Laravel', 'MySQL', 'Twilio API'],
      link: '#',
      stats: {
        restaurants: '75+',
        reservations: '3,000+ weekly',
        users: '50,000+'
      }
    },
    {
      id: 8,
      title: 'FitTrack Wearable App',
      category: 'app',
      image: '/portfolio/project8.jpg', // Replace with actual image
      icon: <Smartphone className="w-6 h-6" />,
      description: 'A fitness tracking application for smartwatches and mobile devices with personalized workout plans and health analytics.',
      technologies: ['Swift', 'Kotlin', 'HealthKit', 'Google Fit API'],
      link: '#',
      stats: {
        users: '120,000+',
        workouts: '500+ types',
        data: '2TB+ processed'
      }
    },
    {
      id: 9,
      title: 'ArtGallery eCommerce',
      category: 'ecommerce',
      image: '/portfolio/project9.jpg', // Replace with actual image
      icon: <ShoppingBag className="w-6 h-6" />,
      description: 'An online marketplace for artists to showcase and sell their artwork with virtual gallery tours and artist profiles.',
      technologies: ['Shopify', 'React', 'AWS', 'Stripe'],
      link: '#',
      stats: {
        artists: '450+',
        artworks: '12,000+',
        sales: '$1.2M+ annually'
      }
    }
  ];

  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  // Handle modal open/close
  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
    
    // Wait for animation to complete before removing project data
    setTimeout(() => {
      setSelectedProject(null);
    }, 300);
  };

  // Load more projects
  const loadMoreProjects = () => {
    setVisibleProjects(prev => Math.min(prev + 3, filteredProjects.length));
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl font-bold relative inline-block mb-2"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our <span className="text-[#6d123f]">Portfolio</span>
          </motion.h2>
          <div className="w-20 h-1 bg-[#e6961d] mx-auto mb-4"></div>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Explore our latest projects showcasing our expertise in creating innovative digital solutions
          </motion.p>
        </div>

        {/* Filter Controls */}
        <motion.div 
          className="flex flex-wrap justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-white px-2 py-2 rounded-full shadow-md flex flex-wrap justify-center">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => {
                  setActiveFilter(filter.id);
                  setVisibleProjects(6);
                }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center mx-1 ${
                  activeFilter === filter.id 
                    ? 'bg-[#6d123f] text-white' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{filter.icon}</span>
                {filter.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.slice(0, visibleProjects).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-xl overflow-hidden h-full transition-all duration-300 group-hover:shadow-2xl border border-gray-100">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  {/* Replace with actual image */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-[#6d123f] to-[#e6961d] text-white">
                    <span className="text-xl font-semibold">{project.title}</span>
                  </div>
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={() => openModal(project)}
                      className="px-4 py-2 bg-white text-[#6d123f] rounded-full transform -translate-y-10 group-hover:translate-y-0 transition-all duration-300 font-medium"
                    >
                      View Details
                    </button>
                  </div>
                  
                  {/* Category Tag */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-[#e6961d] text-white rounded-full text-xs font-medium uppercase tracking-wide">
                    {filters.find(f => f.id === project.category)?.label}
                  </div>
                  
                  {/* Project Icon */}
                  <div className="absolute -bottom-5 left-5 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-white group-hover:border-[#e6961d] transition-all duration-300">
                    <span className="text-[#6d123f]">{project.icon}</span>
                  </div>
                </div>
                
                {/* Project Info */}
                <div className="p-6 pt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#6d123f] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                  
                  {/* Project Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-4 text-center text-xs">
                    {Object.entries(project.stats).map(([key, value], i) => (
                      <div key={i} className="py-2 px-1 bg-gray-50 rounded">
                        <div className="font-bold text-[#6d123f]">{value}</div>
                        <div className="text-gray-500 mt-1 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span 
                        key={i} 
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  
                  {/* Action Link */}
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-[#6d123f] font-medium text-sm group-hover:text-[#e6961d] transition-colors duration-300"
                  >
                    Visit Project <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleProjects < filteredProjects.length && (
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <button
              onClick={loadMoreProjects}
              className="inline-flex items-center px-6 py-3 bg-white border border-[#6d123f] text-[#6d123f] font-medium rounded-full hover:bg-[#6d123f] hover:text-white transition-all duration-300 shadow-md"
            >
              Load More Projects
              <ChevronDown size={18} className="ml-2" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Project Details Modal */}
      {isModalOpen && selectedProject && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative h-64 md:h-80 bg-gradient-to-r from-[#6d123f] to-[#e6961d]">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center mb-5">
                  <span className="text-white transform scale-150">{selectedProject.icon}</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-2">{selectedProject.title}</h3>
                <span className="px-4 py-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-sm uppercase tracking-wider">
                  {filters.find(f => f.id === selectedProject.category)?.label}
                </span>
              </div>
              
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-10 h-10 rounded-full cursor-pointer bg-[#e6961d] hover:bg-[#6d123f] bg-opacity-20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-opacity-40 transition-all duration-300"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h4 className="text-xl font-bold text-[#6d123f] mb-4">Project Overview</h4>
                  <p className="text-gray-700 mb-6">{selectedProject.description}</p>
                  
                  <h4 className="text-xl font-bold text-[#6d123f] mb-4">Key Features</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start">
                      <div className="mr-3 mt-1 p-1 rounded-full bg-[#e6961d] bg-opacity-20 flex-shrink-0">
                        <Check size={16} className="text-[#e6961d]" />
                      </div>
                      <span>Intuitive user interface and UX design</span>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-3 mt-1 p-1 rounded-full bg-[#e6961d] bg-opacity-20 flex-shrink-0">
                        <Check size={16} className="text-[#e6961d]" />
                      </div>
                      <span>Responsive design for all device types</span>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-3 mt-1 p-1 rounded-full bg-[#e6961d] bg-opacity-20 flex-shrink-0">
                        <Check size={16} className="text-[#e6961d]" />
                      </div>
                      <span>Advanced search and filtering capabilities</span>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-3 mt-1 p-1 rounded-full bg-[#e6961d] bg-opacity-20 flex-shrink-0">
                        <Check size={16} className="text-[#e6961d]" />
                      </div>
                      <span>Real-time data synchronization</span>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-3 mt-1 p-1 rounded-full bg-[#e6961d] bg-opacity-20 flex-shrink-0">
                        <Check size={16} className="text-[#e6961d]" />
                      </div>
                      <span>Secure user authentication system</span>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-3 mt-1 p-1 rounded-full bg-[#e6961d] bg-opacity-20 flex-shrink-0">
                        <Check size={16} className="text-[#e6961d]" />
                      </div>
                      <span>Comprehensive analytics dashboard</span>
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-bold text-[#6d123f] mb-4">Project Outcomes</h4>
                  <p className="text-gray-700 mb-6">
                    This project successfully delivered a powerful solution that exceeded client expectations. 
                    Users reported a significant improvement in efficiency and satisfaction, while the client 
                    saw measurable business growth as a direct result of the implementation.
                  </p>
                </div>
                
                <div className="md:col-span-1">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-[#6d123f] mb-4">Project Details</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-sm font-semibold text-gray-500 uppercase mb-2">Category</h5>
                        <div className="flex items-center">
                          <span className="mr-2">{filters.find(f => f.id === selectedProject.category)?.icon}</span>
                          <span>{filters.find(f => f.id === selectedProject.category)?.label}</span>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-semibold text-gray-500 uppercase mb-2">Technologies</h5>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech, i) => (
                            <span 
                              key={i} 
                              className="bg-white text-gray-700 text-xs px-3 py-1 rounded-full border border-gray-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-semibold text-gray-500 uppercase mb-2">Key Statistics</h5>
                        <div className="space-y-2">
                          {selectedProject.stats && Object.entries(selectedProject.stats).map(([key, value], i) => (
                            <div key={i} className="flex justify-between">
                              <span className="text-gray-500 capitalize">{key}:</span>
                              <span className="font-semibold">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-semibold text-gray-500 uppercase mb-2">Client Rating</h5>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              size={16}
                              className={i < 5 ? "text-[#e6961d] fill-[#e6961d]" : "text-gray-300"}
                            />
                          ))}
                          <span className="ml-2 text-sm font-medium">5.0/5.0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <a 
                      href={selectedProject.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-[#6d123f] text-white text-center rounded-xl font-medium flex items-center justify-center hover:bg-[#e6961d] transition-colors duration-300"
                    >
                      Visit Live Project <ExternalLink size={16} className="ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;
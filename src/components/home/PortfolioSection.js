import React, { useState, useEffect } from 'react';
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
import useInView from '@/hooks/useInView';
import { API_URL } from '@/apiUrl';
import Image from 'next/image';

const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ref, inView] = useInView();

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_URL}/api/portfolio`);
        const data = await response.json();
        if (data.success) {
          setProjects(data.portfolios);
        } else {
          setError(data.message || 'Failed to load projects');
        }
      } catch (err) {
        // Use console.log or handle the error string instead of the Error object 
        // to prevent Next.js Dev Overlay from catching it as an unhandled runtime error.
        console.warn('Error fetching portfolios:', err.message);
        setError('Error fetching portfolios. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filters = [
    { id: 'all', label: 'All Projects', icon: <Layers className="w-5 h-5" /> },
    { id: 'Web Development', label: 'Website', icon: <Globe className="w-5 h-5" /> },
    { id: 'App Development', label: 'Mobile App', icon: <Smartphone className="w-5 h-5" /> },
    { id: 'E-commerce', label: 'E-commerce', icon: <ShoppingBag className="w-5 h-5" /> },
    { id: 'UI/UX Design', label: 'UI/UX Design', icon: <Code className="w-5 h-5" /> },
    { id: 'AI Development', label: 'AI & Data', icon: <Layers className="w-5 h-5" /> },
    { id: 'Digital Marketing', label: 'Digital Marketing', icon: <Globe className="w-5 h-5" /> },
    { id: 'Other', label: 'Other', icon: <Layers className="w-5 h-5" /> }
  ];

  const getCategoryIcon = (category) => {
    const filter = filters.find(f => f.id === category);
    return filter ? filter.icon : <Globe className="w-5 h-5" />;
  };

  const getCategoryLabel = (category) => {
    const filter = filters.find(f => f.id === category);
    return filter ? filter.label : category;
  };

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold relative inline-block mb-2 ${inView ? 'animate-fade-in-down' : 'opacity-0'}`}>
            Our <span className="text-[#6d123f]">Portfolio</span>
          </h2>
          <div className="w-20 h-1 bg-[#e6961d] mx-auto mb-4"></div>
          <p className={`text-gray-600 max-w-2xl mx-auto ${inView ? 'animate-fade-in delay-300' : 'opacity-0'}`}>
            Explore our latest projects showcasing our expertise in creating innovative digital solutions
          </p>
        </div>

        {/* Loading and Error States */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-[#6d123f] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading projects...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 font-medium">{error}</p>
          </div>
        )}

        {!isLoading && !error && (
          <>
            {/* Filter Controls */}
            <div className={`flex flex-wrap justify-center mb-12 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="bg-white px-2 py-2 rounded-full shadow-md flex flex-wrap justify-center">
                {filters.map(filter => {
                  // Hide filters that have no projects, except "all"
                  if (filter.id !== 'all' && !projects.some(p => p.category === filter.id)) {
                    return null;
                  }
                  return (
                    <button
                      key={filter.id}
                      onClick={() => { setActiveFilter(filter.id); setVisibleProjects(6); }}
                      className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center mx-1 my-1 ${activeFilter === filter.id ? 'bg-[#6d123f] text-white' : 'hover:bg-gray-100'
                        }`}
                    >
                      <span className="mr-2">{filter.icon}</span>
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.slice(0, visibleProjects).map((project, index) => (
                <div
                  key={project._id || index}
                  className={`group hover-lift ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-white rounded-xl shadow-xl overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:shadow-2xl border border-gray-100">
                    <div className="relative h-48 overflow-hidden bg-gray-100 flex-shrink-0">
                      {project.thumbnail ? (
                        <Image src={project.thumbnail} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-[#6d123f] to-[#e6961d] text-white transition-transform duration-500 group-hover:scale-105">
                          <span className="text-xl font-semibold text-center px-4">{project.title}</span>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button onClick={() => openModal(project)} className="px-4 py-2 bg-white text-[#6d123f] rounded-full transform -translate-y-10 group-hover:translate-y-0 transition-all duration-300 font-medium">
                          View Details
                        </button>
                      </div>
                      <div className="absolute top-4 right-4 px-3 py-1 bg-[#e6961d] text-white rounded-full text-xs font-medium uppercase tracking-wide">
                        {getCategoryLabel(project.category)}
                      </div>
                      <div className="absolute -bottom-5 left-5 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-white group-hover:border-[#e6961d] transition-all duration-300 z-10">
                        <span className="text-[#6d123f]">
                          {getCategoryIcon(project.category)}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 pt-8 flex-grow flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#6d123f] transition-colors duration-300">{project.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">{project.description || project.excerpt}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies && project.technologies.slice(0, 3).map((tech, i) => (
                          <span key={i} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">{tech}</span>
                        ))}
                        {project.technologies && project.technologies.length > 3 && (
                          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">+{project.technologies.length - 3}</span>
                        )}
                      </div>
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-[#6d123f] font-medium text-sm group-hover:text-[#e6961d] transition-colors duration-300 mt-auto pt-2 border-t border-gray-100">
                          Visit Project <ExternalLink size={14} className="ml-1" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {visibleProjects < filteredProjects.length && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setVisibleProjects(prev => Math.min(prev + 3, filteredProjects.length))}
                  className="inline-flex items-center px-6 py-3 bg-white border border-[#6d123f] text-[#6d123f] font-medium rounded-full hover:bg-[#6d123f] hover:text-white transition-all duration-300 shadow-md"
                >
                  Load More Projects
                  <ChevronDown size={18} className="ml-2" />
                </button>
              </div>
            )}

            {filteredProjects.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No projects found for the selected category.
              </div>
            )}
          </>
        )}
      </div>

      {/* Project Details Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={closeModal}>
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-5xl w-full max-h-[90vh] overflow-y-auto animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-64 md:h-80 bg-gradient-to-r from-[#6d123f] to-[#e6961d] overflow-hidden">
              {selectedProject.thumbnail && (
                <Image src={selectedProject.thumbnail} alt={selectedProject.title} fill className="object-cover opacity-30 mix-blend-overlay" />
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center z-10">
                <div className="w-20 h-20 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center mb-5 border-2 border-white/30">
                  <span className="text-white transform scale-150">
                    {getCategoryIcon(selectedProject.category)}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-md">{selectedProject.title}</h3>
                <span className="px-4 py-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-sm uppercase tracking-wider font-medium">
                  {getCategoryLabel(selectedProject.category)}
                </span>
              </div>
              <button onClick={closeModal} className="absolute top-4 right-4 w-10 h-10 rounded-full cursor-pointer bg-black/20 hover:bg-black/40 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-300 z-20">
                <X size={20} />
              </button>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h4 className="text-xl font-bold text-[#6d123f] mb-4 border-b border-gray-100 pb-2">Project Overview</h4>
                  <p className="text-gray-700 mb-6 whitespace-pre-wrap">{selectedProject.description || selectedProject.excerpt}</p>

                  <h4 className="text-xl font-bold text-[#6d123f] mb-4 border-b border-gray-100 pb-2">About This Project</h4>
                  <p className="text-gray-700 mb-6">
                    This project was developed to provide an effective digital solution tailored to specific requirements. We focused on performance, usability, and leveraging the right technologies to ensure success.
                  </p>
                </div>

                <div className="md:col-span-1">
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 shadow-sm">
                    <h4 className="text-lg font-bold text-[#6d123f] mb-4">Project Details</h4>
                    <div className="space-y-5">
                      {selectedProject.clientName && (
                        <div>
                          <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Client</h5>
                          <div className="text-gray-800 font-medium">
                            {selectedProject.clientName}
                          </div>
                        </div>
                      )}

                      <div>
                        <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Category</h5>
                        <div className="flex items-center text-gray-800 font-medium">
                          <span className="mr-2 text-[#e6961d]">{getCategoryIcon(selectedProject.category)}</span>
                          <span>{getCategoryLabel(selectedProject.category)}</span>
                        </div>
                      </div>

                      {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                        <div>
                          <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Technologies</h5>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.technologies.map((tech, i) => (
                              <span key={i} className="bg-white text-gray-700 text-xs px-3 py-1 rounded-full border border-gray-200 shadow-sm">{tech}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedProject.completionDate && (
                        <div>
                          <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Completion Date</h5>
                          <div className="text-gray-800 font-medium">
                            {new Date(selectedProject.completionDate).toLocaleDateString()}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    {selectedProject.liveUrl && (
                      <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-[#6d123f] text-white text-center rounded-xl font-medium flex items-center justify-center hover:bg-[#e6961d] transition-colors duration-300 shadow-md">
                        Visit Live Project <ExternalLink size={16} className="ml-2" />
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-gray-800 text-white text-center rounded-xl font-medium flex items-center justify-center hover:bg-gray-900 transition-colors duration-300 shadow-md">
                        View Source <Code size={16} className="ml-2" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;


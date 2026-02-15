import React from 'react';
import Image from 'next/image';
import { CheckCircle, Code, Users, BarChart, Globe, Lightbulb, Brain, Microscope } from 'lucide-react';
import useInView from '@/hooks/useInView';

const AboutUsSection = () => {
  const [ref, inView] = useInView();

  const stats = [
    { value: '5+', label: 'Years Experience' },
    { value: '200+', label: 'Projects Completed' },
    { value: '150+', label: 'Happy Clients' },
    { value: '24/7', label: 'Support' }
  ];

  const expertise = [
    { text: 'Custom Web Development', icon: <Code size={16} className="text-[#e6961d]" /> },
    { text: 'Mobile App Solutions', icon: <Globe size={16} className="text-[#e6961d]" /> },
    { text: 'AI Development & ML Models', icon: <Brain size={16} className="text-[#e6961d]" /> },
    { text: 'Research Project Support', icon: <Microscope size={16} className="text-[#e6961d]" /> },
    { text: 'Digital Marketing Strategies', icon: <BarChart size={16} className="text-[#e6961d]" /> },
    { text: 'E-commerce Platforms', icon: <Users size={16} className="text-[#e6961d]" /> },
    { text: 'UI/UX Design', icon: <Lightbulb size={16} className="text-[#e6961d]" /> },
    { text: 'Technical Support', icon: <CheckCircle size={16} className="text-[#e6961d]" /> }
  ];

  return (
    <section className="py-16 overflow-hidden">
      <div className="container mx-auto px-4" ref={ref}>
        <div className={`flex flex-col lg:flex-row gap-12 items-center ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
          {/* Left Column - Image */}
          <div className={`w-full lg:w-1/2 ${inView ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#e6961d] rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#6d123f] rounded-full opacity-20"></div>
              <div className="w-full h-96 bg-gray-200 rounded-lg relative overflow-hidden shadow-lg">
                <Image
                  src="/indianwebify.png"
                  alt="Indian Webify Team"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={75}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="w-full lg:w-1/2">
            <h2 className={`text-4xl font-bold mb-6 ${inView ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}>
              About <span className="text-[#6d123f]">Indian Webify</span>
            </h2>

            <p className={`text-gray-700 mb-6 ${inView ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
              Indian Webify is a premier web development, AI development, and digital services company dedicated to transforming your digital presence. We combine technical expertise with creative innovation to deliver solutions that drive business growth and enhance user experiences.
            </p>

            <p className={`text-gray-700 mb-8 ${inView ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}>
              Founded with a vision to empower businesses through technology, we have grown into a team of passionate professionals committed to excellence in every project we undertake. Our approach blends cutting-edge technology including AI development and research-based solutions with strategic insights to create digital solutions that stand out in today&apos;s competitive landscape.
            </p>

            {/* Stats Row */}
            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 ${inView ? 'animate-fade-in-up delay-400' : 'opacity-0'}`}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-3 rounded-lg bg-gray-50 shadow-sm">
                  <h3 className="text-2xl font-bold text-[#b45309]">{stat.value}</h3>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Expertise Grid */}
            <h3 className={`text-xl font-semibold mb-4 text-[#6d123f] ${inView ? 'animate-fade-in-up delay-500' : 'opacity-0'}`}>
              Our Expertise
            </h3>

            <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 mb-8 ${inView ? 'animate-fade-in-up delay-600' : 'opacity-0'}`}>
              {expertise.map((item, index) => (
                <div key={index} className="flex items-center gap-2 bg-white p-3 rounded shadow-sm">
                  {item.icon}
                  <span className="text-gray-800">{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button className={`px-8 py-3 bg-[#b45309] text-white font-bold rounded-full hover:bg-[#6d123f] hover:scale-105 active:scale-95 transition-all duration-300 ${inView ? 'animate-fade-in delay-700' : 'opacity-0'}`}>
              Learn More About Our Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;

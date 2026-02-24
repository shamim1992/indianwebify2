import React from 'react';
import Navbar from '@/components/header/Navbar';
import FooterSection from '@/components/footer/FooterSection';
import SEO from '@/components/SEO';
import { Users, Target, Award, Globe, CheckCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';

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
    <>
      <SEO
        title="About Us - Indian Webify"
        description="Learn about Indian Webify - a premier digital services company dedicated to transforming businesses through cutting-edge technology, AI development, and comprehensive digital solutions. Meet our expert team."
        keywords="about Indian Webify, digital services company, web development team, AI experts, digital transformation, technology solutions"
        url="/about"
        image="/indianwebify.png"
      />
      <div className="min-h-screen bg-gray-50">
        <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-[#6d123f] text-white">
        <div className="container mx-auto px-4">
          <div
            className="text-center max-w-4xl mx-auto animate-fade-in-up"
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
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
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
            </div>
            <div className="relative animate-fade-in-up">
              <div className="w-full h-96 bg-gray-200 rounded-lg relative overflow-hidden shadow-lg">
                <Image src="/indianwebify.png" alt="Indian Webify Team" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div
            className="text-center mb-12 animate-fade-in-up"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <div className="w-20 h-1 bg-[#e6961d] mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our core values guide everything we do and shape our approach to client relationships and project delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center animate-fade-in-up"
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div
            className="text-center mb-12 animate-fade-in-up"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Team
            </h2>
            <div className="w-20 h-1 bg-[#e6961d] mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our diverse team of experts brings together years of experience in technology, design, and business strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300 animate-fade-in-up"
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#6d123f] text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss your project and see how we can help you achieve your digital transformation goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="px-8 py-4 bg-white text-[#6d123f] rounded-full font-bold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center hover-scale"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button
                className="px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-[#6d123f] transition-colors duration-300 hover-scale"
              >
                View Our Services
              </button>
            </div>
          </div>
        </div>
      </section>

        <FooterSection />
      </div>
    </>
  );
};

export default About;

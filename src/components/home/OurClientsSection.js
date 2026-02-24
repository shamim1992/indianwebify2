import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Award, Users, ThumbsUp } from 'lucide-react';
import useInView from '@/hooks/useInView';
import Image from 'next/image';

const OurClientsSection = () => {
  const clientLogos = [
    { id: 1, name: 'Client 1', logo: '/logos/logo2.png' },
    { id: 2, name: 'Client 2', logo: '/logos/logo2.png' },
    { id: 3, name: 'Client 3', logo: '/logos/logo2.png' },
    { id: 4, name: 'Client 4', logo: '/logos/logo2.png' },
    { id: 5, name: 'Client 5', logo: '/logos/logo2.png' },
    { id: 6, name: 'Client 6', logo: '/logos/logo2.png' },
    { id: 7, name: 'Client 7', logo: '/logos/logo2.png' },
    { id: 8, name: 'Client 8', logo: '/logos/logo2.png' }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      position: 'CEO',
      company: 'TechStartup India',
      stars: 5,
      text: 'Indian Webify transformed our online presence completely. Their team delivered a website that exceeded our expectations in both design and functionality. The e-commerce integration was seamless, and we\'ve seen a 40% increase in online sales since launch.',
      icon: <Award className="w-8 h-8" />
    },
    {
      id: 2,
      name: 'Rajesh Patel',
      position: 'Marketing Director',
      company: 'Healthcare Solutions',
      stars: 5,
      text: 'Working with Indian Webify on our hospital management system was a fantastic experience. They understood our complex requirements and delivered a solution that has streamlined our operations significantly. Their support team is incredibly responsive.',
      icon: <Users className="w-8 h-8" />
    },
    {
      id: 3,
      name: 'Ananya Desai',
      position: 'Founder',
      company: 'DesaiRetail',
      stars: 5,
      text: 'The mobile app developed by Indian Webify has been game-changing for our business. The user interface is intuitive, and the backend integration with our existing systems was handled expertly. We continue to receive positive feedback from our customers.',
      icon: <ThumbsUp className="w-8 h-8" />
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [ref, inView] = useInView();

  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden" ref={ref}>
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#6d123f] opacity-5"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 rounded-full bg-[#e6961d] opacity-5"></div>
        <div className="absolute top-40 right-1/4 w-40 h-40 rounded-full bg-[#6d123f] opacity-5"></div>
      </div>

      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className={`text-center mb-16 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-5xl font-bold relative inline-block">
            Our <span className="text-[#6d123f]">Clients</span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Trusted by leading businesses across industries to deliver exceptional digital experiences
          </p>
        </div>

        {/* Client Logos */}
        <div className="mb-20">
          <div className={`py-8 px-4 bg-white rounded-xl shadow ${inView ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
            <h3 className="text-2xl font-bold text-center mb-8 text-[#6d123f]">Trusted By</h3>

            {/* Static grid for larger screens */}
            <div className="hidden md:grid grid-cols-4 gap-6">
              {clientLogos.map((client) => (
                <div
                  key={client.id}
                  className="h-32 flex items-center justify-center bg-white border border-gray-100 rounded-lg p-4 shadow hover:scale-105 hover:-translate-y-1 transition-transform duration-300"
                >
                  <Image
                    src={client.logo}
                    alt={`${client.name} Logo`}
                    width={160}
                    height={96}
                    className="max-h-24 max-w-full object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Scrollable for mobile */}
            <div className="md:hidden overflow-hidden relative">
              <div className="flex py-4 gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                {clientLogos.map((client) => (
                  <div
                    key={client.id}
                    className="flex-shrink-0 snap-center w-64 h-32 flex items-center justify-center bg-white border border-gray-100 rounded-lg p-4 shadow mx-2"
                  >
                    <img
                      src={client.logo}
                      alt={`${client.name} Logo`}
                      className="max-h-24 max-w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className={`mb-16 ${inView ? 'animate-fade-in-up delay-400' : 'opacity-0'}`}>
          <h3 className="text-4xl font-bold text-center mb-12">
            Client <span className="text-[#6d123f]">Testimonials</span>
          </h3>

          <div
            className="relative max-w-4xl mx-auto"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              key={currentTestimonial}
              className="bg-white p-8 rounded-2xl shadow relative overflow-hidden animate-fade-in"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#e6961d] opacity-10 rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#6d123f] opacity-10 rounded-tr-full"></div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Testimonial Image & Details Column */}
                <div className="w-full md:w-1/3 flex flex-col items-center text-center">
                  <div className="w-32 h-32 relative mb-4">
                    <div className="w-full h-full rounded-full border-4 border-[#e6961d] p-1">
                      <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-[#e6961d] rounded-full p-3">
                      {testimonials[currentTestimonial].icon}
                    </div>
                  </div>
                  <h4 className="font-bold text-xl text-[#6d123f] mt-4">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-gray-600 text-sm">{testimonials[currentTestimonial].position}</p>
                  <p className="text-gray-800 font-semibold">{testimonials[currentTestimonial].company}</p>

                  <div className="flex mt-3 gap-1">
                    {[...Array(testimonials[currentTestimonial].stars)].map((_, index) => (
                      <Star key={index} size={18} className="text-[#e6961d] fill-[#e6961d]" />
                    ))}
                  </div>
                </div>

                {/* Testimonial Text Column */}
                <div className="w-full md:w-2/3 relative">
                  <Quote size={40} className="text-[#6d123f] opacity-10 absolute -top-2 -left-2" />
                  <p className="text-gray-700 text-lg italic leading-relaxed relative z-10 px-6">
                    &quot;{testimonials[currentTestimonial].text}&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-white text-[#6d123f] shadow border border-gray-200 hover:scale-110 hover:bg-[#6d123f] hover:text-white active:scale-90 transition-all duration-300"
              >
                <ChevronLeft size={24} />
              </button>

              <div className="flex gap-3 items-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                      currentTestimonial === index
                        ? 'bg-[#e6961d] w-12'
                        : 'bg-gray-300 w-3'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-white text-[#6d123f] shadow border border-gray-200 hover:scale-110 hover:bg-[#6d123f] hover:text-white active:scale-90 transition-all duration-300"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Autoplay indicator */}
            <div className="flex justify-center mt-4">
              <div className="h-1 bg-gray-200 rounded-full w-full max-w-md overflow-hidden">
                <div
                  className="h-full bg-[#e6961d] progress-bar"
                  style={{
                    animationDuration: autoplay ? '5s' : '0s',
                    animationPlayState: autoplay ? 'running' : 'paused'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`text-center mt-16 bg-gradient-to-r from-[#6d123f] to-[#e6961d] p-12 rounded-2xl shadow relative overflow-hidden ${inView ? 'animate-fade-in-up delay-600' : 'opacity-0'}`}>
          <h3 className="text-3xl font-bold mb-4 text-white relative z-10">
            Ready to Join Our Success Stories?
          </h3>
          <p className="text-gray-100 max-w-2xl mx-auto mb-8 relative z-10">
            Partner with Indian Webify to transform your digital presence and achieve your business goals with innovative web solutions tailored to your unique needs.
          </p>
          <button className="px-10 py-4 bg-[#e6961d] text-white font-bold rounded-full shadow relative z-10 hover:scale-105 active:scale-95 transition-transform duration-300">
            Schedule a Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default OurClientsSection;

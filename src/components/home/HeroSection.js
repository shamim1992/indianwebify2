import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  Building2,
  ArrowRight,
  Users2,
  Book,
  Star
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = [
    {
      image: "/slider1.png",
      title: "Elevate Your Digital Presence",
      subtitle: "Innovative Web, AI & Marketing Solutions",
      description:
        "From stunning website designs to cutting-edge AI development and powerful digital marketing strategies, we help businesses establish a dominant online presence and drive success",
      cta: "Get Started",
      ctaLink: "/contact",
      secondaryCta: "Our Services",
      secondaryCtaLink: "/services/website-development",
    },
    {
      image: "/slider1.png",
      title: "Build. Grow. Succeed",
      subtitle: "Comprehensive Web Development & AI Solutions",
      description:
        "We craft high-performance websites and develop cutting-edge AI solutions that not only look amazing but also deliver intelligent automation and drive conversions.",
      cta: "View Portfolio",
      ctaLink: "/portfolio",
      secondaryCta: "Contact Us",
      secondaryCtaLink: "/contact",
    },
    {
      image: "/slider1.png",
      title: "Innovate Through Research",
      subtitle: "AI Development & Research Projects",
      description:
        "Our AI development and research-based project solutions help you stay ahead of the curve. From machine learning models to academic research support, we turn innovative ideas into reality.",
      cta: "Learn More",
      ctaLink: "/services/ai-development",
      secondaryCta: "Schedule a Call",
      secondaryCtaLink: "/contact",
    },
  ];

  const stats = [
    { icon: <Book className="w-6 h-6 text-white" />, value: "100+", label: "Projects" },
    { icon: <Users2 className="w-6 h-6 text-white" />, value: "100+", label: "Clients" },
    { icon: <Star className="w-6 h-6 text-white" />, value: "4.9", label: "Ratings" },
    { icon: <Building2 className="w-6 h-6 text-white" />, value: "10+", label: "Years" },
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, currentSlide, slides.length]);

  const paginate = (dir) => {
    setCurrentSlide((prev) => (prev + dir + slides.length) % slides.length);
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#6d123f]">
      {/* Background Slides - CSS opacity transition instead of framer-motion */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
        >
          <div className="relative w-full h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
              quality={75}
            />
            <div className="absolute inset-0 opacity-80" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30" aria-hidden="true" />
          </div>
        </div>
      ))}

      {/* Content Container */}
      <div className="relative h-full min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center pt-24">
        <div className="flex flex-col items-center text-center">
          <div className="max-w-3xl mx-auto mb-16 z-10">
            <span className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm text-[#e6961d] font-medium text-sm md:text-base mb-4">
              {slides[currentSlide].subtitle}
            </span>

            <h1 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight">
              {slides[currentSlide].title}
            </h1>

            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              {slides[currentSlide].description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={slides[currentSlide].ctaLink}
                className="px-8 py-4 bg-[#e6961d] text-white rounded-full hover:bg-[#6d123f] transition-all duration-300 transform hover:scale-105 flex items-center justify-center group"
              >
                <span className="mr-2 text-base font-medium">{slides[currentSlide].cta}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              <Link
                href={slides[currentSlide].secondaryCtaLink}
                className="px-8 py-4 bg-[#6d123f] backdrop-blur-sm border border-white/20 text-white rounded-full hover:bg-[#e6961d] transition-all duration-300 transform hover:scale-105"
              >
                {slides[currentSlide].secondaryCta}
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="w-full mt-auto mb-20 lg:mb-16 z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`animate-fade-in-up delay-${(index + 2) * 100} bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 text-center hover:bg-white/15 transition-colors duration-300`}
                style={{ animationDelay: `${(index + 2) * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-gradient-to-r from-[#e6961d] to-[#6d123f]">
                  {stat.icon}
                </div>
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-white/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute hidden md:flex bottom-6 md:bottom-8 left-0 right-0 flex-col md:flex-row items-center justify-between px-4 md:px-6 z-20 gap-4">
        <div className="hidden md:flex items-center space-x-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/10 transition-colors duration-300"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
          </button>
        </div>

        <div className="flex items-center space-x-1 order-2 md:order-none">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? "w-8 bg-white" : "w-2 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-selected={currentSlide === index}
              role="tab"
            />
          ))}
        </div>

        <div className="flex items-center space-x-2 order-1 md:order-none">
          <button
            onClick={() => paginate(-1)}
            className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/10 transition-colors duration-300 group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-white group-hover:-translate-x-1 transition-transform duration-300" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/10 transition-colors duration-300 group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="md:hidden p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/10 transition-colors duration-300"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

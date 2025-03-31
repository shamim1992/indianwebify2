import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  GraduationCap,
  Users,
  BookOpen,
  Building2,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(0);

  // Enhanced slides with better images
  const slides = [
    {
      image: "/slider1.png",
      title: "Welcome to Indian Webify",
      subtitle: "Darul Hadith Jaynagar",
      description:
        "Fostering Islamic education and spiritual growth in the heart of Assam",
      cta: "Explore Programs",
      ctaLink: "/programs",
      secondaryCta: "Contact Us",
      secondaryCtaLink: "/contact",
      color: "from-blue-600/80 to-purple-700/60"
    },
    {
      image: "/slider1.png",
      title: "Excellence in Education",
      subtitle: "Quality Islamic Learning",
      description:
        "Providing comprehensive Islamic education with modern teaching methods",
      cta: "Our Courses",
      ctaLink: "/courses",
      secondaryCta: "Learn More",
      secondaryCtaLink: "/about",
      color: "from-emerald-600/80 to-teal-700/60"
    },
    {
      image: "/slider1.png",
      title: "Join Our Community",
      subtitle: "Admission Open 2024",
      description:
        "Begin your journey of knowledge and spiritual development with us",
      cta: "Apply Now",
      ctaLink: "/admissions",
      secondaryCta: "View Requirements",
      secondaryCtaLink: "/requirements",
      color: "from-orange-600/80 to-red-700/60"
    },
  ];

  // Improved statistics with animation
  const stats = [
    {
      icon: <Users className="w-6 h-6 text-white" />,
      value: "500+",
      label: "Students",
      delay: 0.2,
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-white" />,
      value: "50+",
      label: "Teachers",
      delay: 0.3,
    },
    {
      icon: <BookOpen className="w-6 h-6 text-white" />,
      value: "15+",
      label: "Courses",
      delay: 0.4,
    },
    {
      icon: <Building2 className="w-6 h-6 text-white" />,
      value: "25+",
      label: "Years",
      delay: 0.5,
    },
  ];

  // Autoplay functionality
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        paginate(1);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") paginate(-1);
      else if (e.key === "ArrowRight") paginate(1);
      else if (e.key === " ") setIsPlaying(!isPlaying);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying]);

  // Slide navigation function
  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentSlide((prev) => (prev + newDirection + slides.length) % slides.length);
  };

  // Calculate swipe power for mobile
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <section className="relative w-full min-h-screen pt-36 lg:pt-44 overflow-hidden bg-gray-900">
      {/* Background Slides */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={{
            enter: (direction) => ({
              x: direction > 0 ? "100%" : "-100%",
              opacity: 0,
            }),
            center: {
              zIndex: 1,
              x: 0,
              opacity: 1,
            },
            exit: (direction) => ({
              zIndex: 0,
              x: direction < 0 ? "100%" : "-100%",
              opacity: 0,
            }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
          }}
          className="absolute inset-0"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -10000) paginate(1);
            else if (swipe > 10000) paginate(-1);
          }}
        >
          {/* Image and overlay gradient */}
          <div className="relative w-full h-full">
            <Image
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
              quality={95}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-b ${slides[currentSlide].color} opacity-80`}
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30"
              aria-hidden="true"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Content Container */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        {/* Text Content with slide-specific animations */}
        <div className="flex flex-col items-center text-center mt-4 lg:mt-0">
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto mb-16 z-10"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm text-blue-200 font-medium text-sm md:text-base mb-4"
            >
              {slides[currentSlide].subtitle}
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              {slides[currentSlide].title}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-xl text-blue-100/90 mb-8 max-w-2xl mx-auto"
            >
              {slides[currentSlide].description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
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
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="w-full mt-auto mb-20 lg:mb-16 z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: stat.delay, duration: 0.5 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 text-center hover:bg-white/15 transition-colors duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-gradient-to-r from-[#e6961d] to-[#6d123f]">
                  {stat.icon}
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: stat.delay + 0.2, duration: 0.3 }}
                  className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1"
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs sm:text-sm text-blue-100/80">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Redesigned Controls */}
      <div className="absolute hidden md:flex bottom-6 md:bottom-8 left-0 right-0  flex-col md:flex-row items-center justify-between px-4 md:px-6 z-20 gap-4">
        <div className="hidden md:flex items-center space-x-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/10 transition-colors duration-300"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white" />
            )}
          </button>
        </div>

        <div className="flex items-center space-x-1 order-2 md:order-none">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentSlide ? 1 : -1);
                setCurrentSlide(index);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "w-8 bg-white"
                  : "w-2 bg-white/30 hover:bg-white/60"
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
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
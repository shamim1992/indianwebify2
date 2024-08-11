// src/components/OurWorkSection.jsx
import React from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const OurWorkSection = () => {
  const portfolioItems = [
    { title: 'E-commerce Platform', image: 'https://picsum.photos/seed/ecommerce/300/200' },
    { title: 'Social Media Dashboard', image: 'https://picsum.photos/seed/dashboard/300/200' },
    { title: 'Mobile Banking App', image: 'https://picsum.photos/seed/banking/300/200' },
    { title: 'Fitness Tracking App', image: 'https://picsum.photos/seed/fitness/300/200' },
    { title: 'Online Learning Platform', image: 'https://picsum.photos/seed/learning/300/200' },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className="py-10 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">Our Work</h2>
        <div className="max-w-6xl mx-auto">
          <Slider {...sliderSettings}>
            {portfolioItems.map((item, index) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className="px-2"
              >
                <div className="card bg-base-100 shadow-xl overflow-hidden h-full">
                  <figure className="relative h-48 sm:h-56">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </figure>
                  <div className="card-body p-4 sm:p-6">
                    <h2 className="card-title text-lg sm:text-xl">{item.title}</h2>
                    <div className="card-actions justify-end mt-2 sm:mt-4">
                      <button className="btn btn-primary btn-sm">View Details</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default OurWorkSection;
import React from 'react';
import Slider from 'react-slick';
import { FaStar } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const testimonials = [
  {
    name: 'John Doe',
    company: 'Tech Corp',
    text: 'Indian Webify delivered an outstanding website that exceeded our expectations.',
    rating: 5,
  },
  {
    name: 'Jane Smith',
    company: 'Design Studio',
    text: 'Their team’s creativity and technical expertise are unmatched. Highly recommended!',
    rating: 4,
  },
  {
    name: 'Samuel Green',
    company: 'Marketing Solutions',
    text: 'Excellent service with prompt responses and effective solutions.',
    rating: 5,
  },
  {
    name: 'Emily Johnson',
    company: 'Creative Agency',
    text: 'The website they developed for us was both functional and visually appealing. Great job!',
    rating: 5,
  },
  {
    name: 'Michael Brown',
    company: 'Startup Inc.',
    text: 'They truly understood our vision and brought it to life. Highly professional.',
    rating: 4,
  },
];

const TestimonialsSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768, // Below this width, the settings will change
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false, // Hide arrows on small screens for a cleaner look
        },
      },
    ],
  };

  return (
    <section className="py-10 ">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Clients <span className="text-indigo-500">Feedback</span> </h2>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-4 md:p-6">
              <div className=" shadow-md rounded-lg p-6">
                <p className="text-lg italic mb-4">"{testimonial.text}"</p>
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {Array.from({ length: testimonial.rating }, (_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">{testimonial.rating} / 5</span>
                </div>
                <h3 className="font-bold text-xl">{testimonial.name}</h3>
                <p className="text-sm text-gray-600">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default TestimonialsSection;

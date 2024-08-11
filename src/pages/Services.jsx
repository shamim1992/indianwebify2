// src/pages/Services.jsx
import React from 'react';

const Services = () => {
  const services = [
    { title: 'Web Development', description: 'We create responsive and engaging websites.' },
    { title: 'App Development', description: 'Custom mobile apps tailored to your needs.' },
    // Add more services as needed
  ];

  return (
    <div className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {services.map((service, index) => (
        <div key={index} className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300">
          <div className="card-body">
            <h2 className="card-title">{service.title}</h2>
            <p>{service.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Services;

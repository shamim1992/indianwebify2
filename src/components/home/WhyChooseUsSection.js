import React, { useState } from 'react';
import { CheckCircle, Award, Clock, ThumbsUp, Users, Shield } from 'lucide-react';
import useInView from '@/hooks/useInView';

const advantages = [
  {
    title: 'Expertise & Experience',
    icon: <Award className="text-4xl mb-4" />,
    description: 'Our team brings years of industry experience and technical expertise to every project, ensuring high-quality solutions tailored to your specific needs.'
  },
  {
    title: 'Timely Delivery',
    icon: <Clock className="text-4xl mb-4" />,
    description: 'We value your time and strictly adhere to project timelines, delivering solutions on schedule without compromising on quality.'
  },
  {
    title: 'Quality Assurance',
    icon: <CheckCircle className="text-4xl mb-4" />,
    description: 'Every project undergoes rigorous testing and quality checks to ensure flawless performance, security, and user experience.'
  },
  {
    title: 'Client Satisfaction',
    icon: <ThumbsUp className="text-4xl mb-4" />,
    description: 'Our client-centric approach prioritizes your vision and objectives, resulting in solutions that consistently exceed expectations.'
  },
  {
    title: 'Dedicated Support',
    icon: <Users className="text-4xl mb-4" />,
    description: 'We provide ongoing support and maintenance services, ensuring your digital solutions continue to perform optimally long after launch.'
  },
  {
    title: 'Secure Solutions',
    icon: <Shield className="text-4xl mb-4" />,
    description: 'Security is paramount in our development process, implementing best practices to protect your data and provide peace of mind.'
  }
];

const WhyChooseUsSection = () => {
  const [activeAdvantage, setActiveAdvantage] = useState(null);
  const [ref, inView] = useInView();

  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4" ref={ref}>
        <h2 className={`text-4xl font-bold text-center mb-2 ${inView ? 'animate-fade-in-down' : 'opacity-0'}`}>
          Why <span className="text-[#6d123f]">Choose Us</span>
        </h2>
        <div className="w-20 h-1 bg-[#e6961d] mx-auto mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((advantage, index) => (
            <div
              key={advantage.title}
              className={`bg-white rounded-lg p-6 shadow cursor-pointer hover-scale ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setActiveAdvantage(activeAdvantage === index ? null : index)}
            >
              <div className="flex items-center mb-4">
                <span className="text-[#e6961d] mr-3">{advantage.icon}</span>
                <h3 className="text-xl font-bold text-[#6d123f]">{advantage.title}</h3>
              </div>

              <p className="text-gray-700">{advantage.description}</p>

              {activeAdvantage === index && (
                <div className="mt-4 pt-4 border-t border-gray-200 animate-fade-in">
                  <ul className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle size={16} className="text-[#e6961d] mr-2" />
                        <span className="text-sm">
                          {i === 0 && `${advantage.title} benefit example #1`}
                          {i === 1 && `${advantage.title} benefit example #2`}
                          {i === 2 && `${advantage.title} benefit example #3`}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={`text-center mt-12 ${inView ? 'animate-fade-in delay-800' : 'opacity-0'}`}>
          <button className="px-8 py-3 bg-[#b45309] text-white font-bold rounded-full hover:bg-[#6d123f] transition-colors duration-300">
            Contact Us Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;

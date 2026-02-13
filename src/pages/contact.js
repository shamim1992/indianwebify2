import React, { useState } from 'react';
import Navbar from '@/components/header/Navbar';
import FooterSection from '@/components/footer/FooterSection';
import SEO from '@/components/SEO';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Initialize EmailJS (you can also initialize this in useEffect)
  React.useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'W1wyUqR3E9pp4RfSz');
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        service: formData.service || 'Not specified',
        message: formData.message,
        to_email: 'shamimakhtarsheikh@gmail.com', // Your receiving email
      };

      // Send email using EmailJS
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_bj9gqxp',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_72cof39',
        templateParams
      );

      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });
      }, 3000);
    } catch (error) {
      console.error('EmailJS error:', error);
      setError('Failed to send message. Please try again or contact us directly.');
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-[#e6961d]" />,
      title: 'Phone',
      details: ['+91 9856876212'],
      link: 'tel:+919856876212'
    },
    {
      icon: <Mail className="w-6 h-6 text-[#e6961d]" />,
      title: 'Email',
      details: ['mhsdigitalhub@gmail.com'],
      link: 'mailto:mhsdigitalhub@gmail.com'
    },
    {
      icon: <MapPin className="w-6 h-6 text-[#e6961d]" />,
      title: 'Address',
      details: ['Rajajinagar', 'Bangalore, Karnataka 560010'],
      link: '#'
    },
    {
      icon: <Clock className="w-6 h-6 text-[#e6961d]" />,
      title: 'Business Hours',
      details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 4:00 PM'],
      link: '#'
    }
  ];

  const services = [
    'Website Development',
    'App Development',
    'AI Development',
    'Research Projects',
    'Digital Marketing',
    'Other Services'
  ];

  return (
    <>
      <SEO
        title="Contact Us - Indian Webify"
        description="Get in touch with Indian Webify for website development, app development, AI solutions, and digital marketing services. Contact our expert team to discuss your project requirements."
        keywords="contact Indian Webify, web development contact, app development services, digital marketing consultation, AI development inquiry"
        url="/contact"
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
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Let&apos;s discuss your project and bring your ideas to life
            </p>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Ready to start your digital transformation journey? Get in touch with our team of experts and let&apos;s create something amazing together.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Information */}
            <div className="animate-fade-in-up"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Get in Touch
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12  rounded-lg flex items-center justify-center">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {info.title}
                      </h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600">
                          {info.link !== '#' ? (
                            <a href={info.link} className="hover:text-[#e6961d] transition-colors">
                              {detail}
                            </a>
                          ) : (
                            detail
                          )}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div
              className="bg-white rounded-lg shadow-lg p-8 animate-fade-in-up"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>
              
              {isSubmitted ? (
                <div
                  className="text-center py-8 animate-scale-in"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600">
                    Thank you for contacting us. We&apos;ll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div
                      className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start space-x-3 animate-fade-in-down"
                    >
                      <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">{error}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e6961d] focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e6961d] focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e6961d] focus:border-transparent"
                        placeholder="+91 9856876212"
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                        Service Interested In
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e6961d] focus:border-transparent"
                      >
                        <option value="">Select a service</option>
                        {services.map((service, index) => (
                          <option key={index} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e6961d] focus:border-transparent"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#e6961d] text-white py-4 px-6 rounded-lg font-bold hover:bg-[#6d123f] transition-colors duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover-scale"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

        <FooterSection />
      </div>
    </>
  );
};

export default Contact;

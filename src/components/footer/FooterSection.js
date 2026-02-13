import React from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
  Send,
  Heart,
  Calendar,
  FileText,
  Shield,
  Headphones
} from 'lucide-react';
import useInView from '@/hooks/useInView';

const FooterSection = () => {
  const currentYear = new Date().getFullYear();
  const [ref, inView] = useInView();

  const quickLinks = [
    { name: 'Home', url: '/' },
    { name: 'About Us', url: '/about' },
    { name: 'Services', url: '/services' },
    { name: 'Portfolio', url: '/portfolio' },
    { name: 'Blog', url: '/blog' },
    { name: 'Contact', url: '/contact' }
  ];

  const servicesLinks = [
    { name: 'Website Development', url: '/services/website-development' },
    { name: 'Mobile App Development', url: '/services/app-development' },
    { name: 'AI Development', url: '/services/ai-development' },
    { name: 'Research Projects', url: '/services/research-projects' },
    { name: 'Digital Marketing', url: '/services/digital-marketing' },
    { name: 'E-commerce Solutions', url: '/services/ecommerce' },
    { name: 'UI/UX Design', url: '/services/ui-ux-design' }
  ];

  const recentPosts = [
    { title: 'Top 10 Web Design Trends in 2025', date: 'March 28, 2025', url: '/blog/web-design-trends-2025' },
    { title: 'How AI is Transforming App Development', date: 'March 15, 2025', url: '/blog/ai-transforming-app-development' },
    { title: 'Essential SEO Strategies for Small Businesses', date: 'March 02, 2025', url: '/blog/seo-strategies-small-businesses' }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-[#16071f] text-gray-100 pt-16 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#6d123f] opacity-10"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#e6961d] opacity-5"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {/* Company Information */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white relative inline-block">
              Indian Webify
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#e6961d]"></span>
            </h3>
            <p className="text-gray-300 mb-6">
              Transforming businesses through innovative digital solutions. We specialize in web development, mobile apps, AI development, research projects, and digital marketing services.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-[#e6961d] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Call Us</p>
                  <a href="tel:+919856876212" className="text-white hover:text-[#e6961d] transition-colors duration-300">+91 9856876212</a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-[#e6961d] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Email Us</p>
                  <a href="mailto:info@indianwebify.com" className="text-white hover:text-[#e6961d] transition-colors duration-300">info@indianwebify.com</a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#e6961d] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <address className="text-white not-italic">Rajajinagar<br />Bengaluru, Karnataka 560010</address>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#e6961d]"></span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index} className="group">
                  <Link href={link.url} className="flex items-center text-gray-300 hover:text-[#e6961d] transition-colors duration-300">
                    <ArrowRight className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-xl font-bold mt-8 mb-6 text-white relative inline-block">
              Our Services
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#e6961d]"></span>
            </h3>
            <ul className="space-y-3">
              {servicesLinks.map((link, index) => (
                <li key={index} className="group">
                  <Link href={link.url} className="flex items-center text-gray-300 hover:text-[#e6961d] transition-colors duration-300">
                    <ArrowRight className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Posts */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white relative inline-block">
              Recent Posts
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#e6961d]"></span>
            </h3>
            <div className="space-y-4">
              {recentPosts.map((post, index) => (
                <Link key={index} href={post.url} className="block group">
                  <div className="p-4 bg-gray-800 bg-opacity-40 rounded-lg group-hover:bg-opacity-70 transition-all duration-300">
                    <h4 className="font-medium text-white group-hover:text-[#e6961d] transition-colors duration-300">{post.title}</h4>
                    <div className="flex items-center mt-2 text-gray-400 text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      {post.date}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <Link href="/blog" className="inline-flex items-center text-[#e6961d] mt-4 hover:text-white transition-colors duration-300">
              View all posts <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white relative inline-block">
              Stay Connected
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#e6961d]"></span>
            </h3>
            <p className="text-gray-300 mb-4">Subscribe to our newsletter to receive updates and valuable insights.</p>
            <form className="mb-8">
              <div className="flex items-center">
                <input type="email" placeholder="Your email address" className="bg-gray-800 bg-opacity-50 text-white px-4 py-3 rounded-l-lg w-full outline-none focus:ring-2 focus:ring-[#e6961d] border-none" required />
                <button type="submit" className="bg-[#e6961d] hover:bg-[#6d123f] px-4 py-3 rounded-r-lg transition-colors duration-300">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
            <h3 className="text-xl font-bold mb-4 text-white">Follow Us</h3>
            <div className="flex space-x-3">
              {[
                { icon: <Facebook className="w-5 h-5" />, label: "Facebook" },
                { icon: <Twitter className="w-5 h-5" />, label: "Twitter" },
                { icon: <Instagram className="w-5 h-5" />, label: "Instagram" },
                { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn" },
                { icon: <Youtube className="w-5 h-5" />, label: "YouTube" },
              ].map((social) => (
                <a key={social.label} href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#e6961d] transition-colors duration-300" aria-label={social.label}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Features Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-8 border-t border-gray-800">
          {[
            { icon: <Heart className="w-6 h-6 text-[#e6961d]" />, title: "Client Satisfaction", sub: "Our top priority" },
            { icon: <Shield className="w-6 h-6 text-[#e6961d]" />, title: "Secure Solutions", sub: "Top-notch security" },
            { icon: <FileText className="w-6 h-6 text-[#e6961d]" />, title: "Custom Projects", sub: "Tailored to your needs" },
            { icon: <Headphones className="w-6 h-6 text-[#e6961d]" />, title: "24/7 Support", sub: "Always here to help" },
          ].map((item) => (
            <div key={item.title} className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">{item.icon}</div>
              <div>
                <h4 className="font-semibold text-white">{item.title}</h4>
                <p className="text-sm text-gray-400">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center py-8 border-t border-gray-800 text-sm">
          <p className="text-gray-400 mb-4 md:mb-0">Copyright &copy; {currentYear} Indian Webify. All rights reserved.</p>
          <div className="flex flex-wrap justify-center space-x-4">
            <Link href="/privacy/wireless-mouse-and-keyboard-bt" className="text-gray-400 hover:text-[#e6961d] transition-colors duration-300 mb-2 md:mb-0">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-gray-400 hover:text-[#e6961d] transition-colors duration-300 mb-2 md:mb-0">Terms of Service</Link>
            <Link href="/sitemap" className="text-gray-400 hover:text-[#e6961d] transition-colors duration-300 mb-2 md:mb-0">Sitemap</Link>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <a href="#top" className="w-12 h-12 rounded-full bg-[#e6961d] fixed bottom-8 right-8 flex items-center justify-center shadow-lg z-50 hover:scale-110 active:scale-90 transition-transform duration-300">
        <ArrowRight className="w-6 h-6 text-white transform -rotate-90" />
      </a>
    </footer>
  );
};

export default FooterSection;

import React from 'react';
import Navbar from '@/components/header/Navbar';
import FooterSection from '@/components/footer/FooterSection';
import SEO from '@/components/SEO';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import Image from 'next/image';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Top 10 Web Design Trends in 2025',
      excerpt: 'Discover the latest web design trends that will shape the digital landscape in 2025, from AI-powered interfaces to immersive experiences.',
      image: '/slider1.png',
      author: 'Shamim Sheikh',
      date: 'March 28, 2025',
      readTime: '5 min read',
      category: 'Web Design',
      tags: ['Web Design', 'Trends', 'UI/UX']
    },
    {
      id: 2,
      title: 'How AI is Transforming App Development',
      excerpt: 'Explore how artificial intelligence is revolutionizing mobile app development and creating smarter, more intuitive user experiences.',
      image: '/slider1.png',
      author: 'AI Team',
      date: 'March 15, 2025',
      readTime: '7 min read',
      category: 'AI Development',
      tags: ['AI', 'Mobile Apps', 'Technology']
    },
    {
      id: 3,
      title: 'Essential SEO Strategies for Small Businesses',
      excerpt: 'Learn the fundamental SEO strategies that small businesses can implement to improve their online visibility and attract more customers.',
      image: '/slider1.png',
      author: 'Marketing Team',
      date: 'March 02, 2025',
      readTime: '6 min read',
      category: 'Digital Marketing',
      tags: ['SEO', 'Small Business', 'Marketing']
    },
    {
      id: 4,
      title: 'Building Scalable Web Applications with Modern Frameworks',
      excerpt: 'A comprehensive guide to building scalable web applications using modern frameworks and best practices for performance optimization.',
      image: '/slider1.png',
      author: 'Development Team',
      date: 'February 20, 2025',
      readTime: '8 min read',
      category: 'Web Development',
      tags: ['Web Development', 'Frameworks', 'Scalability']
    },
    {
      id: 5,
      title: 'The Future of E-commerce: AI and Personalization',
      excerpt: 'Discover how AI-powered personalization is reshaping the e-commerce landscape and creating more engaging shopping experiences.',
      image: '/slider1.png',
      author: 'AI Team',
      date: 'February 10, 2025',
      readTime: '6 min read',
      category: 'AI Development',
      tags: ['E-commerce', 'AI', 'Personalization']
    },
    {
      id: 6,
      title: 'Mobile-First Design: Why It Matters in 2025',
      excerpt: 'Learn why mobile-first design is crucial for success in 2025 and how to implement it effectively in your web projects.',
      image: '/slider1.png',
      author: 'Design Team',
      date: 'January 28, 2025',
      readTime: '5 min read',
      category: 'Web Design',
      tags: ['Mobile Design', 'Responsive', 'UX']
    }
  ];

  const categories = ['All', 'Web Design', 'AI Development', 'Digital Marketing', 'Web Development'];

  return (
    <>
      <SEO
        title="Blog - Indian Webify"
        description="Stay updated with the latest trends, technologies, and best practices in web development, AI, and digital marketing. Read insights, tips, and industry news from Indian Webify experts."
        keywords="web development blog, AI technology blog, digital marketing tips, web design trends, app development insights, technology articles"
        url="/blog"
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
              Our Blog
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Insights, tips, and trends in digital technology
            </p>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Stay updated with the latest trends, technologies, and best practices in web development, AI, and digital marketing.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div
            className="bg-white rounded-lg shadow-lg overflow-hidden mb-16 animate-fade-in-up"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative h-64 lg:h-full">
                <Image
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#e6961d] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-[#e6961d] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {blogPosts[0].category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {blogPosts[0].date}
                  </div>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {blogPosts[0].title}
                </h2>
                <p className="text-gray-600 mb-6">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500 text-sm">
                    <User className="w-4 h-4 mr-2" />
                    {blogPosts[0].author}
                    <Clock className="w-4 h-4 ml-4 mr-1" />
                    {blogPosts[0].readTime}
                  </div>
                  <button className="flex items-center text-[#e6961d] font-semibold hover:text-[#6d123f] transition-colors">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div
            className="text-center mb-12 animate-fade-in-up"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest Articles
            </h2>
            <div className="w-20 h-1 bg-[#e6961d] mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-fade-in-up"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#e6961d] text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-sm">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                    <button className="flex items-center text-[#e6961d] font-semibold hover:text-[#6d123f] transition-colors">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div
            className="text-center max-w-2xl mx-auto animate-fade-in-up"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-600 mb-8">
              Subscribe to our newsletter to receive the latest articles, tips, and insights directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e6961d] focus:border-transparent"
              />
              <button className="px-6 py-3 bg-[#e6961d] text-white rounded-lg font-semibold hover:bg-[#6d123f] transition-colors">
                Subscribe
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

export default Blog;

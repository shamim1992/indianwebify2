import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/header/Navbar';
import FooterSection from '@/components/footer/FooterSection';
import SEO from '@/components/SEO';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPortfolios } from '../redux/actions/portfolioActions';
import {
  Monitor, Smartphone, Brain, Search, ExternalLink,
  ArrowRight, LayoutGrid, Filter, RefreshCw, Globe
} from 'lucide-react';

const CATEGORY_ICONS = {
  'Web Development': <Monitor className="w-5 h-5" />,
  'App Development': <Smartphone className="w-5 h-5" />,
  'AI Development': <Brain className="w-5 h-5" />,
  'Digital Marketing': <Search className="w-5 h-5" />,
  'UI/UX Design': <Monitor className="w-5 h-5" />,
  'E-commerce': <Globe className="w-5 h-5" />,
  'Other': <LayoutGrid className="w-5 h-5" />,
};

const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-200" />
    <div className="p-6 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-1/3" />
      <div className="h-5 bg-gray-200 rounded w-2/3" />
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="flex gap-2 mt-4">
        {[1, 2, 3].map(i => <div key={i} className="h-6 bg-gray-100 rounded-full w-16" />)}
      </div>
    </div>
  </div>
);

const Portfolio = () => {
  const dispatch = useDispatch();
  const { portfolios, loading, total } = useSelector((s) => s.portfolio);

  const [activeCategory, setActiveCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);

  const loadPortfolios = useCallback(() => {
    dispatch(fetchPortfolios({ page: 1, limit: 50, status: 'published' }));
  }, [dispatch]);

  useEffect(() => { loadPortfolios(); }, [loadPortfolios]);

  // Build dynamic category list from fetched data
  useEffect(() => {
    if (portfolios.length > 0) {
      const unique = ['All', ...new Set(portfolios.map(p => p.category).filter(Boolean))];
      setCategories(unique);
    }
  }, [portfolios]);

  const filtered = activeCategory === 'All'
    ? portfolios
    : portfolios.filter(p => p.category === activeCategory);

  const stats = [
    { number: `${total || '200'}+`, label: 'Projects Completed' },
    { number: '150+', label: 'Happy Clients' },
    { number: '50+', label: 'Countries Served' },
    { number: '99%', label: 'Client Satisfaction' },
  ];

  return (
    <>
      <SEO
        title="Our Portfolio - Indian Webify"
        description="Explore Indian Webify's portfolio showcasing web development, mobile apps, AI solutions, and digital marketing projects."
        keywords="IndianWebify portfolio, web development, mobile apps, AI development, digital marketing"
        url="/portfolio"
        image="/indianwebify.png"
      />
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        {/* Hero */}
        <section className="pt-24 pb-16 bg-[#6d123f] text-white">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Portfolio</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-4">Showcasing our best work and successful projects</p>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Explore the digital solutions we&apos;ve built that have helped businesses achieve their goals.
            </p>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="py-6 bg-white shadow-sm sticky top-0 z-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="flex items-center gap-1.5 text-sm text-gray-500 font-medium">
                  <Filter className="w-4 h-4" /> Filter:
                </span>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === cat
                      ? 'bg-[#e6961d] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <button onClick={loadPortfolios} title="Refresh"
                className="p-2 rounded-full text-gray-400 hover:text-[#e6961d] hover:bg-orange-50 transition-all">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {!loading && portfolios.length > 0 && (
              <p className="text-sm text-gray-500 mb-6">
                Showing <span className="font-semibold text-gray-700">{filtered.length}</span> item{filtered.length !== 1 ? 's' : ''}
                {activeCategory !== 'All' && <> in <span className="font-semibold text-[#e6961d]">{activeCategory}</span></>}
              </p>
            )}

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-gray-400 gap-4">
                <LayoutGrid className="w-16 h-16 text-gray-200" />
                <p className="text-lg font-semibold text-gray-500">No portfolio items found</p>
                {activeCategory !== 'All' && (
                  <button onClick={() => setActiveCategory('All')} className="text-sm text-[#e6961d] font-semibold hover:underline">
                    Clear filter
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((item) => (
                  <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden bg-gray-100">
                      {item.thumbnail ? (
                        <Image src={item.thumbnail} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#6d123f]/10 to-[#e6961d]/10">
                          <LayoutGrid className="w-12 h-12 text-[#6d123f]/30" />
                        </div>
                      )}
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-[#6d123f]/70 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Link href={`/portfolio/${item.slug || item._id}`}
                          className="bg-white text-[#6d123f] px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1.5 hover:bg-gray-100 transition-colors">
                          <ArrowRight className="w-4 h-4" /> Details
                        </Link>
                        {item.liveUrl && (
                          <a href={item.liveUrl} target="_blank" rel="noreferrer"
                            className="bg-[#e6961d] text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1.5 hover:bg-orange-600 transition-colors">
                            <ExternalLink className="w-4 h-4" /> Live
                          </a>
                        )}
                      </div>
                      {item.featured && (
                        <span className="absolute top-3 right-3 bg-[#e6961d] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                          ⭐ Featured
                        </span>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[#e6961d]">{CATEGORY_ICONS[item.category] || <LayoutGrid className="w-5 h-5" />}</span>
                        <span className="text-xs font-bold text-[#e6961d] uppercase tracking-wide">{item.category || 'General'}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#6d123f] transition-colors line-clamp-2">{item.title}</h3>
                      <p className="text-gray-500 text-sm mb-4 line-clamp-3 flex-1">
                        {item.excerpt || item.description || 'A quality project by IndianWebify.'}
                      </p>
                      {item.technologies?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {item.technologies.slice(0, 4).map((tech, i) => (
                            <span key={i} className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">{tech}</span>
                          ))}
                          {item.technologies.length > 4 && (
                            <span className="px-2.5 py-0.5 bg-gray-100 text-gray-400 text-xs rounded-full font-medium">+{item.technologies.length - 4}</span>
                          )}
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        {item.clientName && (
                          <span className="text-xs text-gray-400 font-medium truncate max-w-[120px]">{item.clientName}</span>
                        )}
                        <Link href={`/portfolio/${item.slug}`} className="ml-auto flex items-center gap-1 text-xs font-bold text-[#6d123f] hover:text-[#e6961d] transition-colors">
                          View Details <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Achievements</h2>
              <div className="w-20 h-1 bg-[#e6961d] mx-auto" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#e6961d] mb-2">{s.number}</div>
                  <div className="text-gray-600 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#6d123f] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let&apos;s create something amazing together. Contact us to discuss your requirements.
            </p>
            <Link href="/contact" className="inline-block px-8 py-4 bg-white text-[#6d123f] rounded-full font-bold hover:bg-gray-100 transition-colors duration-300">
              Start Your Project
            </Link>
          </div>
        </section>

        <FooterSection />
      </div>
    </>
  );
};

export default Portfolio;

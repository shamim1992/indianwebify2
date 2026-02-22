import React, { useEffect } from 'react';
import Navbar from '@/components/header/Navbar';
import FooterSection from '@/components/footer/FooterSection';
import SEO from '@/components/SEO';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { fetchPortfolioById } from '../../redux/actions/portfolioActions';
import { clearCurrentPortfolio } from '../../redux/slices/portfolioSlice';
import { ArrowLeft, ExternalLink, Github, Star, Calendar, Tag, User, Globe, Code2, LayoutGrid, ChevronRight } from 'lucide-react';

const fmt = (d) =>
    d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) : null;

export default function PortfolioDetail() {
    const router = useRouter();
    const { id } = router.query;
    const dispatch = useDispatch();
    const { currentPortfolio: item, loading } = useSelector((s) => s.portfolio);

    useEffect(() => {
        if (id) dispatch(fetchPortfolioById(id));
        return () => { dispatch(clearCurrentPortfolio()); };
    }, [id, dispatch]);

    if (loading || !item) {
        return (
            <>
                <div className="min-h-screen bg-gray-50">
                    <Navbar />
                    <section className="pt-24 pb-16 bg-[#6d123f]">
                        <div className="container mx-auto px-4 max-w-4xl animate-pulse space-y-3">
                            <div className="h-4 bg-white/20 rounded w-1/4" />
                            <div className="h-10 bg-white/20 rounded w-3/4" />
                            <div className="h-4 bg-white/20 rounded w-1/2" />
                        </div>
                    </section>
                    <div className="container mx-auto px-4 py-12">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-white rounded-2xl h-64 animate-pulse" />
                                <div className="bg-white rounded-2xl h-48 animate-pulse" />
                            </div>
                            <div className="bg-white rounded-2xl h-64 animate-pulse" />
                        </div>
                    </div>
                    <FooterSection />
                </div>
            </>
        );
    }

    return (
        <>
            <SEO
                title={`${item.title} — Portfolio | Indian Webify`}
                description={item.excerpt || item.description || `${item.title} — a portfolio item by IndianWebify.`}
                keywords={`IndianWebify, ${item.category || ''}, ${(item.technologies || []).join(', ')}`}
                url={`/portfolio/${id}`}
                image={item.thumbnail || '/indianwebify.png'}
            />
            <div className="min-h-screen bg-gray-50">
                <Navbar />

                {/* Hero */}
                <section className="pt-24 pb-16 bg-[#6d123f] text-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto">
                            {/* Breadcrumb */}
                            <nav className="flex items-center gap-1.5 text-white/60 text-sm mb-6">
                                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                                <ChevronRight className="w-3.5 h-3.5" />
                                <Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
                                <ChevronRight className="w-3.5 h-3.5" />
                                <span className="text-white/90 truncate max-w-[200px]">{item.title}</span>
                            </nav>

                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-2 mb-4">
                                        {item.category && (
                                            <span className="text-xs font-bold bg-white/20 text-white px-3 py-1 rounded-full uppercase tracking-wide">
                                                {item.category}
                                            </span>
                                        )}
                                        {item.featured && (
                                            <span className="text-xs font-bold bg-[#e6961d] text-white px-3 py-1 rounded-full flex items-center gap-1">
                                                <Star className="w-3 h-3 fill-white" /> Featured
                                            </span>
                                        )}
                                    </div>
                                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">{item.title}</h1>
                                    {item.excerpt && <p className="text-lg text-white/80 max-w-2xl">{item.excerpt}</p>}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                                    {item.liveUrl && (
                                        <a href={item.liveUrl} target="_blank" rel="noreferrer"
                                            className="inline-flex items-center justify-center gap-2 bg-[#e6961d] hover:bg-orange-600 text-white px-6 py-3 rounded-full font-bold transition-all shadow-lg">
                                            <ExternalLink className="w-4 h-4" /> View Live Site
                                        </a>
                                    )}
                                    {item.githubUrl && (
                                        <a href={item.githubUrl} target="_blank" rel="noreferrer"
                                            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-bold transition-all border border-white/20">
                                            <Github className="w-4 h-4" /> GitHub
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                            <div className="lg:col-span-2 space-y-6">
                                {/* Thumbnail */}
                                {item.thumbnail && (
                                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                                        <img src={item.thumbnail} alt={item.title} className="w-full object-cover max-h-[420px]" />
                                    </div>
                                )}

                                {/* Description */}
                                {item.description && (
                                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <LayoutGrid className="w-5 h-5 text-[#e6961d]" /> About This Project
                                        </h2>
                                        <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{item.description}</p>
                                    </div>
                                )}

                                {/* Technologies */}
                                {item.technologies?.length > 0 && (
                                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <Code2 className="w-5 h-5 text-[#e6961d]" /> Technologies Used
                                        </h2>
                                        <div className="flex flex-wrap gap-2">
                                            {item.technologies.map((tech, i) => (
                                                <span key={i} className="px-4 py-2 bg-gradient-to-br from-[#6d123f]/5 to-[#e6961d]/5 text-[#6d123f] text-sm font-semibold rounded-xl border border-[#6d123f]/10">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Links */}
                                {(item.liveUrl || item.githubUrl) && (
                                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <Globe className="w-5 h-5 text-[#e6961d]" /> Project Links
                                        </h2>
                                        <div className="flex flex-wrap gap-3">
                                            {item.liveUrl && (
                                                <a href={item.liveUrl} target="_blank" rel="noreferrer"
                                                    className="inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-semibold px-5 py-3 rounded-xl border border-blue-100 transition-all">
                                                    <ExternalLink className="w-4 h-4" /> Live Website
                                                </a>
                                            )}
                                            {item.githubUrl && (
                                                <a href={item.githubUrl} target="_blank" rel="noreferrer"
                                                    className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold px-5 py-3 rounded-xl border border-gray-200 transition-all">
                                                    <Github className="w-4 h-4" /> View on GitHub
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
                                    <h2 className="font-bold text-gray-900 text-base border-b border-gray-100 pb-3">Portfolio Details</h2>

                                    {item.clientName && (
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                                                <User className="w-4 h-4 text-gray-500" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 font-medium">Client</p>
                                                <p className="text-sm font-semibold text-gray-800">{item.clientName}</p>
                                            </div>
                                        </div>
                                    )}

                                    {item.category && (
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                                                <Tag className="w-4 h-4 text-orange-500" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 font-medium">Category</p>
                                                <p className="text-sm font-semibold text-gray-800">{item.category}</p>
                                            </div>
                                        </div>
                                    )}

                                    {item.completionDate && (
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center shrink-0">
                                                <Calendar className="w-4 h-4 text-violet-500" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 font-medium">Completed</p>
                                                <p className="text-sm font-semibold text-gray-800">{fmt(item.completionDate)}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Back */}
                                <Link href="/portfolio"
                                    className="flex items-center justify-center gap-2 w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold text-sm px-5 py-3 rounded-2xl border border-gray-200 transition-all shadow-sm">
                                    <ArrowLeft className="w-4 h-4" /> Back to Portfolio
                                </Link>

                                {/* CTA */}
                                <div className="bg-gradient-to-br from-[#6d123f] to-[#9b1d5c] rounded-2xl p-6 text-white text-center space-y-3 shadow-lg">
                                    <h3 className="font-bold text-lg">Like this work?</h3>
                                    <p className="text-white/80 text-sm">We can build something amazing for your business too.</p>
                                    <Link href="/contact"
                                        className="inline-block bg-[#e6961d] hover:bg-orange-600 text-white text-sm font-bold px-6 py-2.5 rounded-full transition-all">
                                        Get in Touch
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <FooterSection />
            </div>
        </>
    );
}

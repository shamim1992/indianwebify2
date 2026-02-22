import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from '@/components/header/Navbar';
import FooterSection from '@/components/footer/FooterSection';
import SEO from '@/components/SEO';
import {
    Calendar, Clock, ArrowLeft, Tag, BookOpen,
    ChevronRight, Link2, ArrowUp
} from 'lucide-react';
import { API_URL } from '../../apiUrl';

export default function PostDetail() {
    const router = useRouter();
    const { slug } = router.query;

    const [post, setPost] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [readProgress, setReadProgress] = useState(0);
    const [copied, setCopied] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);

    // Reading progress + back-to-top
    useEffect(() => {
        const handleScroll = () => {
            const el = document.documentElement;
            const scrolled = el.scrollTop;
            const total = el.scrollHeight - el.clientHeight;
            setReadProgress(total > 0 ? Math.round((scrolled / total) * 100) : 0);
            setShowBackToTop(scrolled > 600);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!slug) return;
        setLoading(true);
        setNotFound(false);

        fetch(`${API_URL}/api/blogs/slug/${slug}`)
            .then((r) => r.json())
            .then((data) => {
                if (data.success) setPost(data.blog);
                else setNotFound(true);
            })
            .catch(() => setNotFound(true))
            .finally(() => setLoading(false));
    }, [slug]);

    useEffect(() => {
        if (!post) return;
        const params = new URLSearchParams({ status: 'published', limit: 4 });
        if (post.category?._id) params.append('category', post.category._id);

        fetch(`${API_URL}/api/blogs?${params.toString()}`)
            .then((r) => r.json())
            .then((data) => {
                if (data.success)
                    setRelatedPosts(data.blogs.filter((b) => b._id !== post._id).slice(0, 3));
            })
            .catch(console.error);
    }, [post]);

    const formattedDate = post
        ? new Date(post.createdAt).toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
          })
        : '';

    const readTime = post?.content
        ? `${Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200))} min read`
        : '';

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    const handleShareTwitter = () => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(post?.title || '');
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    };

    const handleShareLinkedIn = () => {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    };

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    /* ── Loading ── */
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50" />
                <Navbar />
                <div className="h-[70vh] bg-gray-200 animate-pulse" />
                <div className="container mx-auto px-4 max-w-4xl py-12">
                    <div className="animate-pulse space-y-4">
                        <div className="h-3 bg-gray-200 rounded w-1/4" />
                        <div className="h-8 bg-gray-200 rounded w-full" />
                        <div className="h-8 bg-gray-200 rounded w-4/5" />
                        <div className="h-3 bg-gray-200 rounded w-1/3" />
                        <div className="h-px bg-gray-200 my-6" />
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="h-4 bg-gray-200 rounded" style={{ width: `${75 + Math.random() * 25}%` }} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    /* ── Not Found ── */
    if (notFound) {
        return (
            <>
                <SEO title="Post Not Found - Indian Webify" description="The post you are looking for does not exist." />
                <div className="min-h-screen bg-gray-50">
                    <Navbar />
                    <div className="flex flex-col items-center justify-center text-center min-h-[70vh] px-4">
                        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#6d123f]/10 to-[#e6961d]/10 flex items-center justify-center mb-6">
                            <BookOpen size={48} className="text-[#6d123f]/40" strokeWidth={1.2} />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-3">Article Not Found</h1>
                        <p className="text-gray-400 mb-8 max-w-sm text-sm leading-relaxed">
                            The article you're looking for doesn't exist or may have been removed.
                        </p>
                        <Link
                            href="/posts"
                            className="inline-flex items-center gap-2 px-7 py-3 bg-[#6d123f] text-white rounded-xl font-semibold hover:bg-[#5a0f34] transition-colors shadow-lg shadow-[#6d123f]/20"
                        >
                            <ArrowLeft size={16} /> Back to Blog
                        </Link>
                    </div>
                    <FooterSection />
                </div>
            </>
        );
    }

    /* ── Post ── */
    return (
        <>
            <SEO
                title={`${post.title} - Indian Webify`}
                description={post.excerpt || post.title}
                keywords={post.tags?.join(', ')}
                url={`/posts/${post.slug}`}
                image={post.coverImage || '/indianwebify.png'}
            />

            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200">
                <div
                    className="h-full bg-gradient-to-r from-[#6d123f] to-[#e6961d] transition-all duration-150 ease-out"
                    style={{ width: `${readProgress}%` }}
                />
            </div>

            <div className="min-h-screen bg-gray-50">
                <Navbar />

                {/* ── Hero ── */}
                <section className="relative w-full h-[45vh] min-h-[320px] overflow-hidden">
                    {post.coverImage ? (
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#6d123f] via-[#9b1957] to-[#3a0821]" />
                    )}

                    {/* Layered gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />

                    {/* Hero content */}
                    <div className="absolute inset-0 flex flex-col justify-end pb-16 px-4">
                        <div className="container mx-auto max-w-4xl">

                            {/* Breadcrumb */}
                            <nav className="flex items-center gap-1.5 text-xs text-white/50 mb-5 flex-wrap">
                                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                                <ChevronRight size={11} />
                                <Link href="/posts" className="hover:text-white transition-colors">Blog</Link>
                                <ChevronRight size={11} />
                                <span className="text-white/70 line-clamp-1">{post.title}</span>
                            </nav>

                            {/* Category */}
                            {post.category?.name && (
                                <span className="inline-block bg-[#e6961d] text-white text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
                                    {post.category.name}
                                </span>
                            )}

                            {/* Title */}
                            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-7 max-w-3xl drop-shadow-md">
                                {post.title}
                            </h1>

                            {/* Meta row */}
                            <div className="flex flex-wrap items-center gap-6 text-sm text-white/75">
                                <span className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#e6961d] to-[#6d123f] flex items-center justify-center text-white text-sm font-bold shrink-0">
                                        {(post.author?.name || 'I')[0].toUpperCase()}
                                    </div>
                                    <span className="font-medium text-white">{post.author?.name || 'Indian Webify'}</span>
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Calendar size={14} className="text-[#e6961d]" />
                                    {formattedDate}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Clock size={14} className="text-[#e6961d]" />
                                    {readTime}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Main Layout ── */}
                <div className="container mx-auto px-4 max-w-6xl py-12">
                    <div className="flex gap-10 items-start relative">

                        {/* Article */}
                        <article className="flex-1 min-w-0">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">

                                {/* Excerpt lead */}
                                {post.excerpt && (
                                    <p className="text-xl text-gray-600 font-medium leading-relaxed mb-10 pb-10 border-b border-gray-100 italic pl-5 border-l-4 border-l-[#e6961d]">
                                        {post.excerpt}
                                    </p>
                                )}

                                {/* Content */}
                                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                                    {post.content}
                                </div>

                                {/* Tags */}
                                {post.tags?.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-100 items-center">
                                        <Tag size={14} className="text-gray-400 shrink-0" />
                                        {post.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-sm hover:bg-[#6d123f]/10 hover:text-[#6d123f] transition-colors cursor-default font-medium"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Author card */}
                                <div className="mt-12 pt-10 border-t border-gray-100">
                                    <div className="flex items-start gap-5 p-6 bg-gradient-to-br from-[#6d123f]/5 to-[#e6961d]/5 rounded-2xl border border-[#6d123f]/10">
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6d123f] to-[#e6961d] flex items-center justify-center text-white text-xl font-extrabold shrink-0 shadow-lg shadow-[#6d123f]/20">
                                            {(post.author?.name || 'I')[0].toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-widest text-[#e6961d] mb-1">Written by</p>
                                            <h3 className="text-lg font-bold text-gray-900 mb-1.5">{post.author?.name || 'Indian Webify'}</h3>
                                            <p className="text-sm text-gray-500 leading-relaxed">
                                                Expert contributor at Indian Webify — sharing insights on web development, AI, and digital innovation.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Back link */}
                                <div className="mt-8">
                                    <Link
                                        href="/posts"
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#6d123f] hover:text-[#e6961d] transition-colors group"
                                    >
                                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                        Back to all articles
                                    </Link>
                                </div>
                            </div>
                        </article>

                        {/* ── Sticky Sidebar (desktop) ── */}
                        <aside className="hidden lg:flex flex-col items-center gap-3 w-14 shrink-0 sticky top-24">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Share</p>

                            {/* X / Twitter */}
                            <button
                                onClick={handleShareTwitter}
                                title="Share on X"
                                className="w-11 h-11 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:bg-black hover:text-white hover:border-black transition-all hover:scale-110"
                            >
                                <span className="font-bold text-sm leading-none">𝕏</span>
                            </button>

                            {/* LinkedIn */}
                            <button
                                onClick={handleShareLinkedIn}
                                title="Share on LinkedIn"
                                className="w-11 h-11 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-all hover:scale-110"
                            >
                                <span className="font-bold text-sm leading-none">in</span>
                            </button>

                            {/* Copy link */}
                            <div className="relative flex flex-col items-center">
                                <button
                                    onClick={handleCopyLink}
                                    title="Copy link"
                                    className={`w-11 h-11 rounded-full border shadow-sm flex items-center justify-center transition-all hover:scale-110 ${
                                        copied
                                            ? 'bg-green-500 border-green-500 text-white'
                                            : 'bg-white border-gray-200 text-gray-500 hover:bg-[#6d123f] hover:text-white hover:border-[#6d123f]'
                                    }`}
                                >
                                    <Link2 size={15} />
                                </button>
                                {copied && (
                                    <span className="absolute -bottom-6 text-[10px] font-bold text-green-600 whitespace-nowrap">Copied!</span>
                                )}
                            </div>

                            <div className="w-px h-10 bg-gray-200 mt-4" />

                            {/* Progress ring */}
                            <div className="relative w-12 h-12 flex items-center justify-center mt-1">
                                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
                                    <circle cx="24" cy="24" r="20" stroke="#e5e7eb" strokeWidth="3.5" fill="none" />
                                    <circle
                                        cx="24" cy="24" r="20"
                                        stroke="url(#grad)"
                                        strokeWidth="3.5"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeDasharray={`${2 * Math.PI * 20}`}
                                        strokeDashoffset={`${2 * Math.PI * 20 * (1 - readProgress / 100)}`}
                                        className="transition-all duration-300"
                                    />
                                    <defs>
                                        <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                                            <stop offset="0%" stopColor="#6d123f" />
                                            <stop offset="100%" stopColor="#e6961d" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <span className="text-[10px] font-bold text-[#6d123f] z-10">{readProgress}%</span>
                            </div>
                        </aside>
                    </div>
                </div>

                {/* ── Related Posts ── */}
                {relatedPosts.length > 0 && (
                    <section className="py-16 bg-white border-t border-gray-100">
                        <div className="container mx-auto px-4 max-w-6xl">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-gray-900 mb-3">Related Articles</h2>
                                <div className="w-16 h-1 bg-[#e6961d] mx-auto rounded-full" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {relatedPosts.map((related) => {
                                    const relDate = new Date(related.createdAt).toLocaleDateString('en-IN', {
                                        day: '2-digit', month: 'short', year: 'numeric',
                                    });
                                    const relReadTime = related.content
                                        ? `${Math.max(1, Math.ceil(related.content.split(/\s+/).length / 200))} min read`
                                        : '5 min read';
                                    return (
                                        <Link
                                            key={related._id}
                                            href={`/posts/${related.slug}`}
                                            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
                                        >
                                            <div className="h-48 bg-gray-100 overflow-hidden relative">
                                                {related.coverImage ? (
                                                    <img
                                                        src={related.coverImage}
                                                        alt={related.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#6d123f]/10 to-[#e6961d]/10">
                                                        <BookOpen size={40} className="text-[#6d123f]/30" />
                                                    </div>
                                                )}
                                                {related.category?.name && (
                                                    <span className="absolute top-3 left-3 bg-[#e6961d] text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                                                        {related.category.name}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="p-5">
                                                <div className="flex items-center gap-3 text-xs text-gray-400 mb-2.5">
                                                    <span className="flex items-center gap-1"><Calendar size={11} />{relDate}</span>
                                                    <span className="flex items-center gap-1"><Clock size={11} />{relReadTime}</span>
                                                </div>
                                                <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-[#6d123f] transition-colors text-base leading-snug mb-2">
                                                    {related.title}
                                                </h3>
                                                {related.excerpt && (
                                                    <p className="text-sm text-gray-500 line-clamp-2">{related.excerpt}</p>
                                                )}
                                                <span className="inline-flex items-center gap-1 mt-3 text-xs font-bold text-[#e6961d] group-hover:text-[#6d123f] transition-colors">
                                                    Read more <ChevronRight size={12} />
                                                </span>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}

                {/* ── Mobile share bar ── */}
                <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-6 py-3 flex items-center justify-between z-40">
                    <Link href="/posts" className="flex items-center gap-1.5 text-sm text-gray-500 font-semibold">
                        <ArrowLeft size={15} /> Blog
                    </Link>
                    <div className="flex items-center gap-2.5">
                        <button
                            onClick={handleShareTwitter}
                            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all"
                        >
                            <span className="font-bold text-xs">𝕏</span>
                        </button>
                        <button
                            onClick={handleShareLinkedIn}
                            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#0077b5] hover:text-white transition-all"
                        >
                            <span className="font-bold text-xs">in</span>
                        </button>
                        <button
                            onClick={handleCopyLink}
                            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                                copied ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'
                            }`}
                        >
                            <Link2 size={14} />
                        </button>
                    </div>
                </div>

                {/* ── Back to top ── */}
                {showBackToTop && (
                    <button
                        onClick={scrollToTop}
                        className="hidden lg:flex fixed bottom-8 right-8 w-12 h-12 rounded-full bg-[#6d123f] text-white shadow-xl shadow-[#6d123f]/30 items-center justify-center hover:bg-[#5a0f34] hover:scale-110 transition-all z-40"
                    >
                        <ArrowUp size={18} />
                    </button>
                )}

                <div className="pb-16 lg:pb-0">
                    <FooterSection />
                </div>
            </div>
        </>
    );
}

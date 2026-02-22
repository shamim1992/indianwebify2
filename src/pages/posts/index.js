import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Navbar from '@/components/header/Navbar';
import FooterSection from '@/components/footer/FooterSection';
import SEO from '@/components/SEO';
import { Calendar, User, ArrowRight, Clock, Search, Tag, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { API_URL } from '../../apiUrl';

const LIMIT = 9;

export default function PostsPage() {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);

    // Debounce search
    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(searchQuery), 400);
        return () => clearTimeout(t);
    }, [searchQuery]);

    // Fetch categories
    useEffect(() => {
        fetch(`${API_URL}/api/categories`)
            .then((r) => r.json())
            .then((d) => { if (d.success) setCategories(d.categories); })
            .catch(console.error);
    }, []);

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({ page, limit: LIMIT, status: 'published' });
            if (selectedCategory) params.append('category', selectedCategory);
            const res = await fetch(`${API_URL}/api/blogs?${params.toString()}`);
            const data = await res.json();
            if (data.success) {
                setPosts(data.blogs);
                setTotalPages(data.pages);
                setTotal(data.total);
            }
        } catch (err) {
            console.error('Failed to fetch posts', err);
        } finally {
            setLoading(false);
        }
    }, [page, selectedCategory]);

    useEffect(() => {
        setPage(1);
    }, [selectedCategory]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    // Client-side search filter
    const filteredPosts = debouncedSearch
        ? posts.filter(
            (p) =>
                p.title?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                p.excerpt?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                p.tags?.some((t) => t.toLowerCase().includes(debouncedSearch.toLowerCase()))
        )
        : posts;

    const featuredPost = filteredPosts[0];
    const remainingPosts = filteredPosts.slice(1);

    const formattedDate = (dateStr) =>
        new Date(dateStr).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });

    const readTime = (content) =>
        content
            ? `${Math.max(1, Math.ceil(content.split(/\s+/).length / 200))} min read`
            : '5 min read';

    const blogJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Blog & Articles - Indian Webify',
        description: 'Explore our latest blog posts on web development, AI, digital marketing, design trends, and technology insights from Indian Webify experts.',
        url: 'https://indianwebify.com/posts',
        publisher: {
            '@type': 'Organization',
            name: 'Indian Webify',
            logo: {
                '@type': 'ImageObject',
                url: 'https://indianwebify.com/logo2.png',
            },
        },
    };

    return (
        <>
            <SEO
                title="Blog & Articles - Indian Webify"
                description="Explore our latest blog posts on web development, AI, digital marketing, design trends, and technology insights from Indian Webify experts."
                keywords="web development blog, AI technology, digital marketing tips, web design, app development, technology articles, Indian Webify blog"
                url="/posts"
                image="/indianwebify.png"
                jsonLd={blogJsonLd}
            />
            <div className="min-h-screen bg-gray-50">
                <Navbar />

                {/* Hero Section */}
                <section className="pt-24 pb-16 bg-[#6d123f] text-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                Our Blog
                            </h1>
                            <p className="text-xl md:text-2xl text-white/90 mb-8">
                                Insights, tips, and trends in digital technology
                            </p>
                            <p className="text-lg text-white/80 max-w-3xl mx-auto mb-10">
                                Stay updated with the latest in web development, AI, digital marketing, and technology.
                            </p>

                            {/* Search bar */}
                            <div className="max-w-xl mx-auto relative">
                                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e6961d] shadow-lg text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Category Filter */}
                {categories.length > 0 && (
                    <section className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
                        <div className="container mx-auto px-4">
                            <div className="flex items-center gap-3 py-3 overflow-x-auto scrollbar-none">
                                <Tag size={15} className="text-gray-400 shrink-0" />
                                <button
                                    onClick={() => setSelectedCategory('')}
                                    className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${selectedCategory === ''
                                        ? 'bg-[#6d123f] text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    All
                                </button>
                                {categories.map((cat) => (
                                    <button
                                        key={cat._id}
                                        onClick={() => setSelectedCategory(cat._id)}
                                        className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${selectedCategory === cat._id
                                            ? 'bg-[#6d123f] text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Loading skeletons */}
                {loading && (
                    <section className="py-16">
                        <div className="container mx-auto px-4">
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-16 animate-pulse">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                    <div className="h-64 lg:h-80 bg-gray-200" />
                                    <div className="p-8 lg:p-12 space-y-4">
                                        <div className="h-4 bg-gray-200 rounded w-1/4" />
                                        <div className="h-8 bg-gray-200 rounded w-3/4" />
                                        <div className="h-4 bg-gray-200 rounded w-full" />
                                        <div className="h-4 bg-gray-200 rounded w-5/6" />
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
                                        <div className="h-48 bg-gray-200" />
                                        <div className="p-6 space-y-3">
                                            <div className="h-3 bg-gray-200 rounded w-1/3" />
                                            <div className="h-5 bg-gray-200 rounded w-3/4" />
                                            <div className="h-3 bg-gray-200 rounded w-full" />
                                            <div className="h-3 bg-gray-200 rounded w-5/6" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Empty state */}
                {!loading && filteredPosts.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 text-gray-400 gap-4">
                        <BookOpen size={56} strokeWidth={1.3} />
                        <p className="text-xl font-semibold text-gray-500">No articles found</p>
                        <p className="text-sm">
                            {debouncedSearch
                                ? 'Try a different search term or clear the search.'
                                : 'No published articles yet. Check back soon!'}
                        </p>
                        {debouncedSearch && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="mt-2 px-5 py-2 bg-[#6d123f] text-white rounded-lg text-sm font-medium hover:bg-[#5a0f34] transition-colors"
                            >
                                Clear Search
                            </button>
                        )}
                    </div>
                )}

                {/* Featured Post */}
                {!loading && featuredPost && (
                    <section className="py-16">
                        <div className="container mx-auto px-4">
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-16 animate-fade-in-up">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                    <div className="relative h-64 lg:h-full">
                                        {featuredPost.coverImage ? (
                                            <img
                                                src={featuredPost.coverImage}
                                                alt={featuredPost.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#6d123f]/10 to-[#e6961d]/10">
                                                <BookOpen size={64} className="text-[#6d123f]/30" />
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-[#e6961d] text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                Featured
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                                        <div className="flex items-center gap-4 mb-4">
                                            {featuredPost.category?.name && (
                                                <span className="bg-[#e6961d] text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                    {featuredPost.category.name}
                                                </span>
                                            )}
                                            <div className="flex items-center text-gray-500 text-sm">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                {formattedDate(featuredPost.createdAt)}
                                            </div>
                                        </div>
                                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                                            {featuredPost.title}
                                        </h2>
                                        {featuredPost.excerpt && (
                                            <p className="text-gray-600 mb-6">
                                                {featuredPost.excerpt}
                                            </p>
                                        )}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center text-gray-500 text-sm">
                                                <User className="w-4 h-4 mr-2" />
                                                {featuredPost.author?.name || 'Indian Webify'}
                                                <Clock className="w-4 h-4 ml-4 mr-1" />
                                                {readTime(featuredPost.content)}
                                            </div>
                                            <Link
                                                href={`/posts/${featuredPost.slug}`}
                                                className="flex items-center text-[#e6961d] font-semibold hover:text-[#6d123f] transition-colors"
                                            >
                                                Read More
                                                <ArrowRight className="w-4 h-4 ml-1" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Latest Articles Grid */}
                {!loading && remainingPosts.length > 0 && (
                    <section className="py-16 bg-white">
                        <div className="container mx-auto px-4">
                            <div className="text-center mb-12 animate-fade-in-up">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    Latest Articles
                                </h2>
                                <div className="w-20 h-1 bg-[#e6961d] mx-auto mb-6"></div>
                                {!debouncedSearch && (
                                    <p className="text-sm text-gray-400">
                                        Showing <span className="text-gray-700 font-semibold">{remainingPosts.length}</span> article{remainingPosts.length !== 1 ? 's' : ''}
                                        {total > LIMIT && ` of ${total - 1} total`}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {remainingPosts.map((post) => (
                                    <article
                                        key={post._id}
                                        className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-fade-in-up"
                                    >
                                        <div className="relative h-48 overflow-hidden">
                                            {post.coverImage ? (
                                                <img
                                                    src={post.coverImage}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#6d123f]/10 to-[#e6961d]/10">
                                                    <BookOpen size={48} className="text-[#6d123f]/30" />
                                                </div>
                                            )}
                                            {post.category?.name && (
                                                <div className="absolute top-4 left-4">
                                                    <span className="bg-[#e6961d] text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                        {post.category.name}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-6">
                                            <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                                                <div className="flex items-center">
                                                    <Calendar className="w-4 h-4 mr-1" />
                                                    {formattedDate(post.createdAt)}
                                                </div>
                                                <div className="flex items-center">
                                                    <Clock className="w-4 h-4 mr-1" />
                                                    {readTime(post.content)}
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                                {post.title}
                                            </h3>

                                            {post.excerpt && (
                                                <p className="text-gray-600 mb-4 line-clamp-3">
                                                    {post.excerpt}
                                                </p>
                                            )}

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center text-gray-500 text-sm">
                                                    <User className="w-4 h-4 mr-1" />
                                                    {post.author?.name || 'Indian Webify'}
                                                </div>
                                                <Link
                                                    href={`/posts/${post.slug}`}
                                                    className="flex items-center text-[#e6961d] font-semibold hover:text-[#6d123f] transition-colors"
                                                >
                                                    Read More
                                                    <ArrowRight className="w-4 h-4 ml-1" />
                                                </Link>
                                            </div>

                                            {post.tags?.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mt-4">
                                                    {post.tags.slice(0, 3).map((tag, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                                                        >
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </article>
                                ))}
                            </div>

                            {/* Pagination */}
                            {!debouncedSearch && totalPages > 1 && (
                                <div className="flex items-center justify-center gap-3 mt-12">
                                    <button
                                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:border-[#6d123f] hover:text-[#6d123f] transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-white"
                                    >
                                        <ChevronLeft size={16} /> Previous
                                    </button>
                                    <div className="flex gap-1">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                            <button
                                                key={p}
                                                onClick={() => setPage(p)}
                                                className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${page === p
                                                    ? 'bg-[#6d123f] text-white shadow-sm'
                                                    : 'bg-white border border-gray-200 text-gray-600 hover:border-[#6d123f] hover:text-[#6d123f]'
                                                    }`}
                                            >
                                                {p}
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                        disabled={page === totalPages}
                                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:border-[#6d123f] hover:text-[#6d123f] transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-white"
                                    >
                                        Next <ChevronRight size={16} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* Newsletter Section */}
                <section className="py-16 bg-gray-100">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-2xl mx-auto animate-fade-in-up">
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
}

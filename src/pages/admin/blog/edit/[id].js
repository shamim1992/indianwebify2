import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../../components/admin/AdminLayout';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
    ArrowLeft, Save, Send, BookOpen, Tag, Image, AlignLeft, FileText, Loader2
} from 'lucide-react';
import { API_URL } from '../../../../apiUrl';

export default function EditBlog() {
    const { token } = useSelector((state) => state.auth);
    const router = useRouter();
    const { id } = router.query;

    const [form, setForm] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        tags: '',
        coverImage: '',
        status: 'draft',
    });
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    // Load categories
    useEffect(() => {
        fetch(`${API_URL}/api/categories`)
            .then((r) => r.json())
            .then((d) => { if (d.success) setCategories(d.categories); })
            .catch(console.error);
    }, []);

    // Load existing blog
    useEffect(() => {
        if (!id) return;
        fetch(`${API_URL}/api/blogs/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((r) => r.json())
            .then((d) => {
                if (d.success) {
                    const b = d.blog;
                    setForm({
                        title: b.title || '',
                        excerpt: b.excerpt || '',
                        content: b.content || '',
                        category: b.category?._id || '',
                        tags: Array.isArray(b.tags) ? b.tags.join(', ') : '',
                        coverImage: b.coverImage || '',
                        status: b.status || 'draft',
                    });
                } else {
                    setError('Failed to load blog post.');
                }
            })
            .catch(() => setError('Error loading blog post.'))
            .finally(() => setLoading(false));
    }, [id, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (statusOverride) => {
        const submitStatus = statusOverride || form.status;
        if (!form.title.trim()) { setError('Title is required.'); return; }
        if (!form.content.trim()) { setError('Content is required.'); return; }
        setError('');
        setSaving(true);
        try {
            const res = await fetch(`${API_URL}/api/blogs/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ ...form, status: submitStatus }),
            });
            const data = await res.json();
            if (data.success) {
                router.push('/admin/blog');
            } else {
                setError(data.message || 'Failed to update blog post.');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const wordCount = form.content.trim().split(/\s+/).filter(Boolean).length;

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center py-32">
                    <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-orange-500 animate-spin" />
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/blog"
                        className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-orange-500 hover:border-orange-300 transition-all bg-white"
                    >
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Edit Blog Post</h1>
                        <p className="text-slate-500 text-sm mt-0.5">Make changes and update the post</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => handleSubmit('draft')}
                        disabled={saving}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium text-sm hover:border-slate-300 hover:bg-slate-50 transition-all disabled:opacity-50"
                    >
                        <Save size={16} />
                        Save Draft
                    </button>
                    <button
                        onClick={() => handleSubmit('published')}
                        disabled={saving}
                        className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all shadow-lg shadow-orange-500/20 active:scale-95 disabled:opacity-50"
                    >
                        {saving ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                        Update & Publish
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-5">
                    {/* Title */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                            <BookOpen size={16} className="text-orange-500" />
                            Post Title <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Enter an engaging title..."
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 text-slate-900 font-medium placeholder:text-slate-400 transition-all text-lg"
                        />
                    </div>

                    {/* Excerpt */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                            <AlignLeft size={16} className="text-orange-500" />
                            Excerpt
                            <span className="text-slate-400 font-normal text-xs">(short summary)</span>
                        </label>
                        <textarea
                            name="excerpt"
                            value={form.excerpt}
                            onChange={handleChange}
                            rows={2}
                            placeholder="Write a brief summary of your post..."
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 resize-none text-slate-700 placeholder:text-slate-400 transition-all text-sm"
                        />
                    </div>

                    {/* Content */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-3">
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                <FileText size={16} className="text-orange-500" />
                                Content <span className="text-red-400">*</span>
                            </label>
                            <span className="text-xs text-slate-400 font-medium">{wordCount} words</span>
                        </div>
                        <textarea
                            name="content"
                            value={form.content}
                            onChange={handleChange}
                            rows={16}
                            placeholder="Write your blog post content here..."
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 resize-y text-slate-700 placeholder:text-slate-400 transition-all text-sm leading-relaxed"
                        />
                    </div>
                </div>

                {/* Sidebar Options */}
                <div className="space-y-5">
                    {/* Publish Settings */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <h3 className="font-semibold text-slate-900 mb-4">Publish Settings</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {['draft', 'published'].map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setForm((p) => ({ ...p, status: s }))}
                                    className={`py-2.5 rounded-xl text-sm font-semibold capitalize border transition-all ${form.status === s
                                        ? s === 'published'
                                            ? 'bg-orange-500 text-white border-orange-500 shadow-sm shadow-orange-200'
                                            : 'bg-slate-700 text-white border-slate-700'
                                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                                        }`}
                                >
                                    {s === 'draft' ? '📝 Draft' : '🌐 Publish'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Category */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                            <Tag size={16} className="text-orange-500" />
                            Category
                        </label>
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 text-slate-700 font-medium transition-all text-sm"
                        >
                            <option value="">— No Category —</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Tags */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                            <Tag size={16} className="text-orange-500" />
                            Tags
                            <span className="text-slate-400 font-normal text-xs">(comma separated)</span>
                        </label>
                        <input
                            type="text"
                            name="tags"
                            value={form.tags}
                            onChange={handleChange}
                            placeholder="e.g. react, next.js, web"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 text-slate-700 placeholder:text-slate-400 transition-all text-sm"
                        />
                        {form.tags && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                                {form.tags.split(',').map((t) => t.trim()).filter(Boolean).map((tag) => (
                                    <span key={tag} className="px-2.5 py-1 bg-orange-50 text-orange-600 text-xs rounded-lg font-medium border border-orange-100">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Cover Image */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                            <Image size={16} className="text-orange-500" />
                            Cover Image URL
                        </label>
                        <input
                            type="url"
                            name="coverImage"
                            value={form.coverImage}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 text-slate-700 placeholder:text-slate-400 transition-all text-sm"
                        />
                        {form.coverImage && (
                            <div className="mt-3 rounded-xl overflow-hidden border border-slate-100 aspect-video w-full">
                                <img
                                    src={form.coverImage}
                                    alt="Cover preview"
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
    ArrowLeft, Save, Send, BookOpen, Tag, Image as ImageIcon, AlignLeft,
    FileText, Loader2, UploadCloud, X
} from 'lucide-react';
import { API_URL } from '../../../apiUrl';

export default function CreateBlog() {
    const { token } = useSelector((state) => state.auth);
    const router = useRouter();

    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        tags: '',
        status: 'draft',
    });

    // Cover image state – either a File object (upload) or an external URL string
    const [coverFile, setCoverFile] = useState(null);    // File | null
    const [coverPreview, setCoverPreview] = useState(''); // object URL or external URL
    const [coverUrl, setCoverUrl] = useState('');         // manual external URL input
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`${API_URL}/api/categories`)
            .then((r) => r.json())
            .then((d) => { if (d.success) setCategories(d.categories); })
            .catch(console.error);
    }, []);

    // Clean up object URL on unmount / change
    useEffect(() => {
        return () => {
            if (coverPreview && coverPreview.startsWith('blob:')) {
                URL.revokeObjectURL(coverPreview);
            }
        };
    }, [coverPreview]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // ── File handling ─────────────────────────────────────────────────────────
    const applyFile = (file) => {
        if (!file) return;
        const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowed.includes(file.type)) {
            setError('Only JPEG, PNG, WEBP, or GIF images are allowed.');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setError('Image must be smaller than 5 MB.');
            return;
        }
        setError('');
        if (coverPreview && coverPreview.startsWith('blob:')) URL.revokeObjectURL(coverPreview);
        setCoverFile(file);
        setCoverPreview(URL.createObjectURL(file));
        setCoverUrl(''); // clear manual URL when a file is chosen
    };

    const handleFileChange = (e) => applyFile(e.target.files[0]);

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        applyFile(e.dataTransfer.files[0]);
    };

    const clearCover = () => {
        if (coverPreview && coverPreview.startsWith('blob:')) URL.revokeObjectURL(coverPreview);
        setCoverFile(null);
        setCoverPreview('');
        setCoverUrl('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleExternalUrlChange = (e) => {
        const val = e.target.value;
        setCoverUrl(val);
        if (val) {
            // If the user types a URL, discard any chosen file
            if (coverFile) {
                if (coverPreview.startsWith('blob:')) URL.revokeObjectURL(coverPreview);
                setCoverFile(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
            }
            setCoverPreview(val);
        } else {
            setCoverPreview('');
        }
    };

    // ── Submit ────────────────────────────────────────────────────────────────
    const handleSubmit = async (statusOverride) => {
        const submitStatus = statusOverride || form.status;
        if (!form.title.trim()) { setError('Title is required.'); return; }
        if (!form.content.trim()) { setError('Content is required.'); return; }
        setError('');
        setLoading(true);

        try {
            let res;

            if (coverFile) {
                // Send as multipart/form-data so multer can parse the file
                const fd = new FormData();
                fd.append('title', form.title);
                fd.append('excerpt', form.excerpt);
                fd.append('content', form.content);
                fd.append('category', form.category);
                fd.append('tags', form.tags);
                fd.append('status', submitStatus);
                fd.append('thumbnail', coverFile); // field name must match multer config

                res = await fetch(`${API_URL}/api/blogs`, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${token}` }, // no Content-Type – browser sets boundary
                    body: fd,
                });
            } else {
                // Plain JSON with optional external URL
                res = await fetch(`${API_URL}/api/blogs`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ ...form, coverImage: coverUrl, status: submitStatus }),
                });
            }

            const data = await res.json();
            if (data.success) {
                router.push('/admin/blog');
            } else {
                setError(data.message || 'Failed to create blog post.');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const wordCount = form.content.trim().split(/\s+/).filter(Boolean).length;

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
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">New Blog Post</h1>
                        <p className="text-slate-500 text-sm mt-0.5">Create and publish a new article</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => handleSubmit('draft')}
                        disabled={loading}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium text-sm hover:border-slate-300 hover:bg-slate-50 transition-all disabled:opacity-50"
                    >
                        <Save size={16} />
                        Save Draft
                    </button>
                    <button
                        onClick={() => handleSubmit('published')}
                        disabled={loading}
                        className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all shadow-lg shadow-orange-500/20 active:scale-95 disabled:opacity-50"
                    >
                        {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                        Publish
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
                            placeholder="Write a brief summary of your post (shown in listings)..."
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
                    {/* Publish Box */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <h3 className="font-semibold text-slate-900 mb-4">Publish Settings</h3>
                        <div className="space-y-3">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</label>
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

                    {/* ── Cover Image ─────────────────────────────────────────── */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                            <ImageIcon size={16} className="text-orange-500" />
                            Cover Image
                        </label>

                        {/* Preview */}
                        {coverPreview ? (
                            <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-video w-full mb-3 group">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={coverPreview}
                                    alt="Cover preview"
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                                <button
                                    onClick={clearCover}
                                    className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow transition-all opacity-0 group-hover:opacity-100"
                                    title="Remove image"
                                >
                                    <X size={14} />
                                </button>
                                {coverFile && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs px-3 py-1.5 truncate">
                                        {coverFile.name} · {(coverFile.size / 1024).toFixed(0)} KB
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* Drop zone */
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={handleDrop}
                                className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed cursor-pointer transition-all py-8 mb-3
                                    ${isDragging
                                        ? 'border-orange-400 bg-orange-50'
                                        : 'border-slate-200 hover:border-orange-300 hover:bg-orange-50/50'
                                    }`}
                            >
                                <UploadCloud size={28} className={isDragging ? 'text-orange-500' : 'text-slate-400'} />
                                <p className="text-sm text-slate-500 font-medium">
                                    {isDragging ? 'Drop image here' : 'Click or drag image here'}
                                </p>
                                <p className="text-xs text-slate-400">JPEG, PNG, WEBP, GIF · max 5 MB</p>
                            </div>
                        )}

                        {/* Hidden file input */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                            className="hidden"
                            onChange={handleFileChange}
                        />

                        {/* Change button (shown when preview is active) */}
                        {coverPreview && (
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full mb-3 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50 transition-all"
                            >
                                Change Image
                            </button>
                        )}

                        {/* External URL fallback */}
                        <div className="mt-1">
                            <p className="text-xs text-slate-400 mb-1.5">— or paste an external URL —</p>
                            <input
                                type="url"
                                value={coverUrl}
                                onChange={handleExternalUrlChange}
                                placeholder="https://example.com/image.jpg"
                                disabled={!!coverFile}
                                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 text-slate-700 placeholder:text-slate-400 transition-all text-xs disabled:opacity-40 disabled:cursor-not-allowed"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

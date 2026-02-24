import React, { useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { createPortfolio } from '../../../redux/actions/portfolioActions';
import {
    Save, ArrowLeft, Image as ImageIcon, X, Plus,
    Globe, Github, Star, Calendar, Code2, User, Tag
} from 'lucide-react';

const CATEGORIES = ['Web Development', 'App Development', 'AI Development', 'Digital Marketing', 'UI/UX Design', 'E-commerce', 'Other'];
const FIELD = 'w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all';

export default function CreatePortfolioItem() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { token } = useSelector((s) => s.auth);
    const { loading } = useSelector((s) => s.portfolio);

    const [form, setForm] = useState({
        title: '', excerpt: '', description: '', clientName: '',
        category: 'Web Development', status: 'published',
        liveUrl: '', githubUrl: '', completionDate: '',
        featured: false, order: '', technologies: [],
    });
    const [tagInput, setTagInput] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [error, setError] = useState('');

    const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const addTag = () => {
        const t = tagInput.trim();
        if (t && !form.technologies.includes(t)) set('technologies', [...form.technologies, t]);
        setTagInput('');
    };
    const removeTag = (t) => set('technologies', form.technologies.filter((x) => x !== t));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!form.title.trim()) { setError('Title is required.'); return; }

        const fd = new FormData();
        Object.entries(form).forEach(([k, v]) =>
            fd.append(k, k === 'technologies' ? (Array.isArray(v) ? v.join(',') : v) : v)
        );
        if (imageFile) fd.append('thumbnail', imageFile);

        const res = await dispatch(createPortfolio({ formData: fd, token }));
        if (createPortfolio.fulfilled.match(res)) {
            router.push('/admin/portfolio');
        } else {
            setError(res.payload || 'Failed to create item.');
        }
    };

    return (
        <AdminLayout>
            <div className="flex items-center gap-3">
                <Link href="/admin/portfolio" className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-orange-500 hover:border-orange-300 transition-all bg-white">
                    <ArrowLeft size={18} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Add Portfolio Item</h1>
                    <p className="text-slate-500 text-sm mt-0.5">Fill in the details to publish a new portfolio item.</p>
                </div>
            </div>

            {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-4">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Info */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
                            <h2 className="font-bold text-slate-800">Basic Information</h2>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Title <span className="text-red-500">*</span></label>
                                <input value={form.title} onChange={(e) => set('title', e.target.value)} className={FIELD} placeholder="e.g., FashionBrand E-Commerce Website" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                        <User size={13} className="inline mr-1" />Client Name
                                    </label>
                                    <input value={form.clientName} onChange={(e) => set('clientName', e.target.value)} className={FIELD} placeholder="e.g., FashionBrand Pvt. Ltd." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                        <Calendar size={13} className="inline mr-1" />Completion Date
                                    </label>
                                    <input type="date" value={form.completionDate} onChange={(e) => set('completionDate', e.target.value)} className={FIELD} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Short Excerpt</label>
                                <input value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} className={FIELD} placeholder="One-line summary shown on portfolio cards" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Description</label>
                                <textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows={6}
                                    className={`${FIELD} resize-none`}
                                    placeholder="Describe the project goals, challenges, solutions, and outcomes..." />
                            </div>
                        </div>

                        {/* Technologies */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                            <h2 className="font-bold text-slate-800 flex items-center gap-2"><Code2 size={16} className="text-orange-500" />Technologies Used</h2>
                            <div className="flex gap-2">
                                <input value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                                    placeholder="e.g., React, Figma, Node.js"
                                    className={`flex-1 ${FIELD}`} />
                                <button type="button" onClick={addTag} className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-medium transition-all flex items-center gap-1">
                                    <Plus size={14} /> Add
                                </button>
                            </div>
                            {form.technologies.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {form.technologies.map((t) => (
                                        <span key={t} className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-700 text-xs font-medium px-3 py-1.5 rounded-lg border border-orange-100">
                                            {t}
                                            <button type="button" onClick={() => removeTag(t)} className="text-orange-400 hover:text-orange-600"><X size={12} /></button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Links */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                            <h2 className="font-bold text-slate-800 flex items-center gap-2"><Globe size={16} className="text-orange-500" />Portfolio Links</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5"><Globe size={12} className="inline mr-1" />Live URL</label>
                                    <input value={form.liveUrl} onChange={(e) => set('liveUrl', e.target.value)} className={FIELD} placeholder="https://example.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5"><Github size={12} className="inline mr-1" />GitHub URL</label>
                                    <input value={form.githubUrl} onChange={(e) => set('githubUrl', e.target.value)} className={FIELD} placeholder="https://github.com/..." />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Thumbnail */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                            <h2 className="font-bold text-slate-800 flex items-center gap-2"><ImageIcon size={16} className="text-orange-500" />Thumbnail</h2>
                            <label className="block cursor-pointer">
                                <div className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center transition-all h-44 overflow-hidden ${imagePreview ? 'border-orange-300' : 'border-slate-200 bg-slate-50 hover:border-orange-300 hover:bg-orange-50/30'}`}>
                                    {imagePreview ? (
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <>
                                            <ImageIcon size={28} className="text-slate-300 mb-2" />
                                            <p className="text-sm text-slate-500 font-medium">Click to upload</p>
                                            <p className="text-xs text-slate-400 mt-1">PNG, JPG, WebP up to 5MB</p>
                                        </>
                                    )}
                                </div>
                                <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
                            </label>
                            {imagePreview && (
                                <button type="button" onClick={() => { setImageFile(null); setImagePreview(''); }}
                                    className="w-full text-xs text-red-500 hover:text-red-600 flex items-center justify-center gap-1">
                                    <X size={12} /> Remove
                                </button>
                            )}
                        </div>

                        {/* Settings */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                            <h2 className="font-bold text-slate-800">Settings</h2>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5"><Tag size={12} className="inline mr-1" />Category</label>
                                <select value={form.category} onChange={(e) => set('category', e.target.value)} className={FIELD}>
                                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
                                <select value={form.status} onChange={(e) => set('status', e.target.value)} className={FIELD}>
                                    <option value="published">Published</option>
                                    <option value="draft">Draft</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Sort Order</label>
                                <input type="number" min={0} value={form.order} onChange={(e) => set('order', e.target.value)} className={FIELD} placeholder="0 = first" />
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                                <input type="checkbox" id="featured" checked={form.featured}
                                    onChange={(e) => set('featured', e.target.checked)}
                                    className="w-4 h-4 rounded accent-orange-500 cursor-pointer" />
                                <label htmlFor="featured" className="flex items-center gap-1.5 text-sm font-medium text-slate-700 cursor-pointer">
                                    <Star size={14} className="text-amber-400" /> Feature on Portfolio Page
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button type="submit" disabled={loading}
                                className="w-full inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-orange-500/20 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed">
                                {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={18} />}
                                {loading ? 'Publishing...' : 'Publish Item'}
                            </button>
                            <Link href="/admin/portfolio" className="text-center text-sm text-slate-500 hover:text-slate-700 font-medium">Cancel</Link>
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}

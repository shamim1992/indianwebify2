import React, { useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { createProject } from '../../../redux/actions/projectActions';
import {
    Save, ArrowLeft, Image as ImageIcon, X, Plus, Globe, Github,
    Briefcase, Star, Calendar, IndianRupee, Code2, User, Tag
} from 'lucide-react';

const CATEGORIES = ['Web Application', 'E-commerce', 'Mobile App', 'Landing Page', 'CMS', 'API Service', 'UI/UX Design', 'Other'];
const STATUSES = [
    { value: 'planning', label: 'Planning' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'on-hold', label: 'On Hold' },
];

export default function CreateProject() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { loading } = useSelector((state) => state.project);

    const [form, setForm] = useState({
        title: '', description: '', excerpt: '', clientName: '',
        category: 'Web Application', status: 'planning', budget: '',
        projectUrl: '', githubUrl: '', startDate: '', endDate: '',
        featured: false, order: '', technologies: [],
    });
    const [tagInput, setTagInput] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [error, setError] = useState('');

    const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const addTag = () => {
        const t = tagInput.trim();
        if (t && !form.technologies.includes(t)) {
            set('technologies', [...form.technologies, t]);
        }
        setTagInput('');
    };

    const removeTag = (tag) => set('technologies', form.technologies.filter((t) => t !== tag));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!form.title.trim()) { setError('Project title is required.'); return; }

        const fd = new FormData();
        Object.entries(form).forEach(([k, v]) => {
            if (k === 'technologies') {
                fd.append(k, Array.isArray(v) ? v.join(',') : v);
            } else {
                fd.append(k, v);
            }
        });
        if (imageFile) fd.append('thumbnail', imageFile);

        const res = await dispatch(createProject({ formData: fd, token }));
        if (createProject.fulfilled.match(res)) {
            router.push('/admin/project');
        } else {
            setError(res.payload || 'Failed to create project.');
        }
    };

    return (
        <AdminLayout>
            {/* Header */}
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Link href="/admin/project" className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-orange-500 hover:border-orange-300 transition-all bg-white">
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">New Project</h1>
                        <p className="text-slate-500 text-sm mt-0.5">Fill in the details to add a new project.</p>
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left / Main */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Info */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
                            <h2 className="font-bold text-slate-800 flex items-center gap-2"><Briefcase size={16} className="text-orange-500" /> Basic Information</h2>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Project Title <span className="text-red-500">*</span></label>
                                <input value={form.title} onChange={(e) => set('title', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
                                    placeholder="e.g., E-commerce Platform for FashionBrand" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5"><User size={13} className="inline mr-1" />Client Name</label>
                                    <input value={form.clientName} onChange={(e) => set('clientName', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
                                        placeholder="e.g., FashionBrand Pvt. Ltd." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5"><IndianRupee size={13} className="inline mr-1" />Budget</label>
                                    <input value={form.budget} onChange={(e) => set('budget', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
                                        placeholder="e.g., ₹1,50,000" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Short Excerpt</label>
                                <input value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
                                    placeholder="A one-line summary of the project" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
                                <textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows={6}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all resize-none"
                                    placeholder="Detailed description of the project, goals, and outcomes..." />
                            </div>
                        </div>

                        {/* Technologies */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                            <h2 className="font-bold text-slate-800 flex items-center gap-2"><Code2 size={16} className="text-orange-500" /> Technologies Used</h2>
                            <div className="flex gap-2">
                                <input
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                                    placeholder="e.g., React, Node.js, MongoDB"
                                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
                                />
                                <button type="button" onClick={addTag}
                                    className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-medium transition-all flex items-center gap-1">
                                    <Plus size={14} /> Add
                                </button>
                            </div>
                            {form.technologies.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {form.technologies.map((t) => (
                                        <span key={t} className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-700 text-xs font-medium px-3 py-1.5 rounded-lg border border-orange-100">
                                            {t}
                                            <button type="button" onClick={() => removeTag(t)} className="text-orange-400 hover:text-orange-600">
                                                <X size={12} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Links */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                            <h2 className="font-bold text-slate-800 flex items-center gap-2"><Globe size={16} className="text-orange-500" /> Project Links</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5"><Globe size={12} className="inline mr-1" />Live URL</label>
                                    <input value={form.projectUrl} onChange={(e) => set('projectUrl', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
                                        placeholder="https://project-live-url.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5"><Github size={12} className="inline mr-1" />GitHub URL</label>
                                    <input value={form.githubUrl} onChange={(e) => set('githubUrl', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
                                        placeholder="https://github.com/..." />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right / Sidebar */}
                    <div className="space-y-6">
                        {/* Cover Image */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                            <h2 className="font-bold text-slate-800 flex items-center gap-2"><ImageIcon size={16} className="text-orange-500" /> Cover Image</h2>
                            <label className="block cursor-pointer">
                                <div className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center transition-all h-44 ${imagePreview ? 'border-orange-300 bg-orange-50/50' : 'border-slate-200 bg-slate-50 hover:border-orange-300 hover:bg-orange-50/30'}`}>
                                    {imagePreview ? (
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                                    ) : (
                                        <>
                                            <ImageIcon size={28} className="text-slate-300 mb-2" />
                                            <p className="text-sm text-slate-500 font-medium">Click to upload image</p>
                                            <p className="text-xs text-slate-400 mt-1">PNG, JPG, WebP up to 5MB</p>
                                        </>
                                    )}
                                </div>
                                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                            </label>
                            {imagePreview && (
                                <button type="button" onClick={() => { setImageFile(null); setImagePreview(''); }}
                                    className="w-full text-xs text-red-500 hover:text-red-600 flex items-center justify-center gap-1">
                                    <X size={12} /> Remove image
                                </button>
                            )}
                        </div>

                        {/* Settings */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                            <h2 className="font-bold text-slate-800">Settings</h2>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5"><Tag size={12} className="inline mr-1" />Category</label>
                                <select value={form.category} onChange={(e) => set('category', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all text-slate-700">
                                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
                                <select value={form.status} onChange={(e) => set('status', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all text-slate-700">
                                    {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5"><Calendar size={12} className="inline mr-1" />Start Date</label>
                                    <input type="date" value={form.startDate} onChange={(e) => set('startDate', e.target.value)}
                                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5"><Calendar size={12} className="inline mr-1" />End Date</label>
                                    <input type="date" value={form.endDate} onChange={(e) => set('endDate', e.target.value)}
                                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Sort Order</label>
                                <input type="number" min={0} value={form.order} onChange={(e) => set('order', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
                                    placeholder="0" />
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                                <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => set('featured', e.target.checked)}
                                    className="w-4 h-4 rounded accent-orange-500 cursor-pointer" />
                                <label htmlFor="featured" className="flex items-center gap-1.5 text-sm font-medium text-slate-700 cursor-pointer">
                                    <Star size={14} className="text-amber-400" /> Feature on Homepage
                                </label>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="flex flex-col gap-3">
                            <button type="submit" disabled={loading}
                                className="w-full inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-orange-500/20 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed">
                                {loading ? (
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <Save size={18} />
                                )}
                                {loading ? 'Creating...' : 'Create Project'}
                            </button>
                            <Link href="/admin/project" className="text-center text-sm text-slate-500 hover:text-slate-700 font-medium transition-colors">
                                Cancel
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}

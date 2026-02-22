import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../../components/admin/AdminLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { fetchServiceById, updateService } from '../../../../redux/actions/serviceActions';
import {
    Save, ArrowLeft, Image as ImageIcon, X, Plus,
    Server, Star, Zap, Tag, Clock, IndianRupee, CheckSquare, Code2
} from 'lucide-react';

const CATEGORIES = ['Web Development', 'Mobile App', 'UI/UX Design', 'SEO & Marketing', 'Cloud & DevOps', 'E-commerce', 'Consulting', 'Maintenance', 'Other'];
const STATUSES = [{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }, { value: 'coming-soon', label: 'Coming Soon' }];
const PRICINGS = [{ value: 'fixed', label: 'Fixed Price' }, { value: 'hourly', label: 'Hourly Rate' }, { value: 'monthly', label: 'Monthly Retainer' }, { value: 'custom', label: 'Custom Quote' }];

export default function EditService() {
    const router = useRouter();
    const { id } = router.query;
    const dispatch = useDispatch();
    const { token } = useSelector(s => s.auth);
    const { currentService, loading } = useSelector(s => s.service);

    const [form, setForm] = useState(null);
    const [featureInput, setFeatureInput] = useState('');
    const [techInput, setTechInput] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [error, setError] = useState('');
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (id) { setFetching(true); dispatch(fetchServiceById(id)).finally(() => setFetching(false)); }
    }, [id, dispatch]);

    useEffect(() => {
        if (currentService) {
            setForm({
                title: currentService.title || '',
                shortDescription: currentService.shortDescription || '',
                description: currentService.description || '',
                icon: currentService.icon || '',
                category: currentService.category || 'Web Development',
                status: currentService.status || 'active',
                pricingModel: currentService.pricingModel || 'custom',
                startingPrice: currentService.startingPrice || '',
                deliveryTime: currentService.deliveryTime || '',
                featured: currentService.featured || false,
                order: currentService.order ?? 0,
                features: currentService.features || [],
                technologies: currentService.technologies || [],
            });
            setImagePreview(currentService.coverImage || '');
        }
    }, [currentService]);

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
    const addItem = (key, input, setInput) => {
        const t = input.trim();
        if (t && !form[key].includes(t)) set(key, [...form[key], t]);
        setInput('');
    };
    const removeItem = (key, item) => set(key, form[key].filter(i => i !== item));

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!form.title.trim()) { setError('Service title is required.'); return; }

        const fd = new FormData();
        Object.entries(form).forEach(([k, v]) => {
            if (k === 'features' || k === 'technologies') fd.append(k, Array.isArray(v) ? v.join(',') : v);
            else fd.append(k, v);
        });
        if (imageFile) fd.append('thumbnail', imageFile);

        const res = await dispatch(updateService({ id, formData: fd, token }));
        if (updateService.fulfilled.match(res)) router.push('/admin/services');
        else setError(res.payload || 'Failed to update service.');
    };

    if (fetching || !form) {
        return <AdminLayout><div className="flex items-center justify-center py-32"><div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-orange-500 animate-spin" /></div></AdminLayout>;
    }

    return (
        <AdminLayout>
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Link href="/admin/services" className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-orange-500 hover:border-orange-300 transition-all bg-white">
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Edit Service</h1>
                        <p className="text-slate-500 text-sm mt-0.5 line-clamp-1 max-w-xs">{currentService?.title}</p>
                    </div>
                </div>
                <Link href={`/admin/services/${id}`}
                    className="text-sm text-slate-600 hover:text-orange-500 border border-slate-200 hover:border-orange-300 px-4 py-2 rounded-xl transition-all bg-white inline-flex items-center gap-2">
                    View Detail
                </Link>
            </div>

            {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-4">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
                            <h2 className="font-bold text-slate-800 flex items-center gap-2"><Server size={16} className="text-orange-500" /> Basic Information</h2>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Service Title <span className="text-red-500">*</span></label>
                                <input value={form.title} onChange={e => set('title', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5"><Zap size={12} className="inline mr-1" />Icon / Emoji</label>
                                    <input value={form.icon} onChange={e => set('icon', e.target.value)} placeholder="🌐 or icon name"
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5"><Clock size={12} className="inline mr-1" />Delivery Time</label>
                                    <input value={form.deliveryTime} onChange={e => set('deliveryTime', e.target.value)} placeholder="e.g., 4–8 weeks"
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Short Description</label>
                                <input value={form.shortDescription} onChange={e => set('shortDescription', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Description</label>
                                <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={6}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all resize-none" />
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                            <h2 className="font-bold text-slate-800 flex items-center gap-2"><CheckSquare size={16} className="text-orange-500" /> Features</h2>
                            <div className="flex gap-2">
                                <input value={featureInput} onChange={e => setFeatureInput(e.target.value)}
                                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addItem('features', featureInput, setFeatureInput); } }}
                                    placeholder="Add a feature..."
                                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all" />
                                <button type="button" onClick={() => addItem('features', featureInput, setFeatureInput)}
                                    className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-medium transition-all flex items-center gap-1">
                                    <Plus size={14} /> Add
                                </button>
                            </div>
                            {form.features.length > 0 && (
                                <div className="space-y-2">
                                    {form.features.map((f, i) => (
                                        <div key={i} className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
                                            <CheckSquare size={13} className="text-emerald-500 shrink-0" />
                                            <span className="text-sm text-slate-700 flex-1">{f}</span>
                                            <button type="button" onClick={() => removeItem('features', f)} className="text-slate-300 hover:text-red-400"><X size={13} /></button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                            <h2 className="font-bold text-slate-800 flex items-center gap-2"><Code2 size={16} className="text-orange-500" /> Technologies</h2>
                            <div className="flex gap-2">
                                <input value={techInput} onChange={e => setTechInput(e.target.value)}
                                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addItem('technologies', techInput, setTechInput); } }}
                                    placeholder="Add technology..."
                                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all" />
                                <button type="button" onClick={() => addItem('technologies', techInput, setTechInput)}
                                    className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-medium transition-all flex items-center gap-1">
                                    <Plus size={14} /> Add
                                </button>
                            </div>
                            {form.technologies.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {form.technologies.map(t => (
                                        <span key={t} className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-700 text-xs font-medium px-3 py-1.5 rounded-lg border border-orange-100">
                                            {t}<button type="button" onClick={() => removeItem('technologies', t)} className="text-orange-400 hover:text-orange-600"><X size={12} /></button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                            <h2 className="font-bold text-slate-800 flex items-center gap-2"><ImageIcon size={16} className="text-orange-500" /> Cover Image</h2>
                            <label className="block cursor-pointer">
                                <div className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center transition-all h-40 overflow-hidden ${imagePreview ? 'border-orange-300' : 'border-slate-200 bg-slate-50 hover:border-orange-300'}`}>
                                    {imagePreview ? <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" /> : <><ImageIcon size={26} className="text-slate-300 mb-2" /><p className="text-sm text-slate-500">Click to replace</p></>}
                                </div>
                                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                            </label>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                            <h2 className="font-bold text-slate-800">Settings</h2>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5"><Tag size={12} className="inline mr-1" />Category</label>
                                <select value={form.category} onChange={e => set('category', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-700">
                                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
                                <select value={form.status} onChange={e => set('status', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-700">
                                    {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5"><IndianRupee size={12} className="inline mr-1" />Pricing Model</label>
                                <select value={form.pricingModel} onChange={e => set('pricingModel', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-700">
                                    {PRICINGS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Starting Price</label>
                                <input value={form.startingPrice} onChange={e => set('startingPrice', e.target.value)} placeholder="e.g., ₹25,000 onwards"
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Sort Order</label>
                                <input type="number" min={0} value={form.order} onChange={e => set('order', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all" />
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                                <input type="checkbox" id="featured" checked={form.featured} onChange={e => set('featured', e.target.checked)}
                                    className="w-4 h-4 rounded accent-orange-500 cursor-pointer" />
                                <label htmlFor="featured" className="flex items-center gap-1.5 text-sm font-medium text-slate-700 cursor-pointer">
                                    <Star size={14} className="text-amber-400" /> Feature on Homepage
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button type="submit" disabled={loading}
                                className="w-full inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-orange-500/20 active:scale-95 disabled:opacity-60">
                                {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={18} />}
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                            <Link href="/admin/services" className="text-center text-sm text-slate-500 hover:text-slate-700 font-medium">Cancel</Link>
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}

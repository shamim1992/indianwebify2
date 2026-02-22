import React, { useEffect } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { fetchPortfolioById, deletePortfolio } from '../../../redux/actions/portfolioActions';
import { clearCurrentPortfolio } from '../../../redux/slices/portfolioSlice';
import {
    ArrowLeft, Pencil, Globe, Github, Star,
    Calendar, LayoutGrid, Code2, User, Tag, ExternalLink, Eye, Trash2
} from 'lucide-react';

const fmt = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) : '—';

export default function AdminPortfolioDetail() {
    const router = useRouter();
    const { id } = router.query;
    const dispatch = useDispatch();
    const { token } = useSelector((s) => s.auth);
    const { currentPortfolio: item, loading } = useSelector((s) => s.portfolio);

    useEffect(() => {
        if (id) dispatch(fetchPortfolioById(id));
        return () => { dispatch(clearCurrentPortfolio()); };
    }, [id, dispatch]);

    const handleDelete = async () => {
        if (!confirm('Delete this portfolio item?')) return;
        await dispatch(deletePortfolio({ id, token }));
        router.push('/admin/portfolio');
    };

    if (loading || !item) {
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
                    <Link href="/admin/portfolio" className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-orange-500 hover:border-orange-300 transition-all bg-white">
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                            {item.title}
                            {item.featured && <Star size={16} className="text-amber-400 fill-amber-400" />}
                        </h1>
                        {item.excerpt && <p className="text-slate-500 text-sm mt-0.5">{item.excerpt}</p>}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Link href={`/portfolio/${id}`} target="_blank"
                        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-violet-600 border border-slate-200 hover:border-violet-300 px-4 py-2 rounded-xl transition-all bg-white">
                        <Eye size={14} /> Public View
                    </Link>
                    <Link href={`/admin/portfolio/edit/${id}`}
                        className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-orange-500/20">
                        <Pencil size={16} /> Edit
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Thumbnail */}
                    {item.thumbnail && (
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <img src={item.thumbnail} alt={item.title} className="w-full h-72 object-cover" />
                        </div>
                    )}

                    {/* Description */}
                    {item.description && (
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                            <h2 className="text-base font-bold text-slate-800 mb-4">About this Portfolio Item</h2>
                            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{item.description}</p>
                        </div>
                    )}

                    {/* Technologies */}
                    {item.technologies?.length > 0 && (
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                            <h2 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Code2 size={16} className="text-orange-500" /> Technologies
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {item.technologies.map((tech) => (
                                    <span key={tech} className="bg-orange-50 text-orange-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-orange-100">{tech}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Links */}
                    {(item.liveUrl || item.githubUrl) && (
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                            <h2 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Globe size={16} className="text-orange-500" /> Portfolio Links
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {item.liveUrl && (
                                    <a href={item.liveUrl} target="_blank" rel="noreferrer"
                                        className="inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-medium px-4 py-2.5 rounded-xl border border-blue-100 transition-all">
                                        <ExternalLink size={14} /> Live Site
                                    </a>
                                )}
                                {item.githubUrl && (
                                    <a href={item.githubUrl} target="_blank" rel="noreferrer"
                                        className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium px-4 py-2.5 rounded-xl border border-slate-200 transition-all">
                                        <Github size={14} /> GitHub
                                    </a>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
                        <h2 className="font-bold text-slate-800 border-b border-slate-100 pb-3">Details</h2>

                        <div className="flex items-center gap-2 flex-wrap">
                            <span className={`inline-flex items-center text-xs font-bold px-3 py-1.5 rounded-lg border ${item.status === 'published' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                                {item.status === 'published' ? '● Published' : '○ Draft'}
                            </span>
                            {item.featured && (
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1.5 rounded-lg border border-amber-100">
                                    <Star size={12} className="fill-amber-400 text-amber-400" /> Featured
                                </span>
                            )}
                        </div>

                        <div className="space-y-3 text-sm">
                            {item.clientName && (
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                                        <User size={14} className="text-slate-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-medium">Client</p>
                                        <p className="text-slate-800 font-semibold">{item.clientName}</p>
                                    </div>
                                </div>
                            )}
                            {item.category && (
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                                        <Tag size={14} className="text-slate-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-medium">Category</p>
                                        <p className="text-slate-800 font-semibold">{item.category}</p>
                                    </div>
                                </div>
                            )}
                            {item.completionDate && (
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">
                                        <Calendar size={14} className="text-violet-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-medium">Completed</p>
                                        <p className="text-slate-800 font-semibold">{fmt(item.completionDate)}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="pt-3 border-t border-slate-100 text-xs text-slate-400 space-y-1">
                            <p>Created: {fmt(item.createdAt)}</p>
                            <p>Updated: {fmt(item.updatedAt)}</p>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3">
                        <h2 className="font-bold text-slate-800">Quick Actions</h2>
                        <Link href={`/admin/portfolio/edit/${id}`}
                            className="flex items-center gap-2 w-full text-sm font-medium text-slate-700 hover:text-orange-600 hover:bg-orange-50 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-orange-200 transition-all">
                            <Pencil size={14} className="text-orange-500" /> Edit Item
                        </Link>
                        <Link href={`/portfolio/${id}`} target="_blank"
                            className="flex items-center gap-2 w-full text-sm font-medium text-slate-700 hover:text-violet-600 hover:bg-violet-50 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-violet-200 transition-all">
                            <Eye size={14} className="text-violet-400" /> View on Public Site
                        </Link>
                        <Link href="/admin/portfolio"
                            className="flex items-center gap-2 w-full text-sm font-medium text-slate-700 hover:bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 transition-all">
                            <LayoutGrid size={14} className="text-slate-400" /> All Portfolio Items
                        </Link>
                        <button onClick={handleDelete}
                            className="flex items-center gap-2 w-full text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-red-200 transition-all">
                            <Trash2 size={14} /> Delete Item
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

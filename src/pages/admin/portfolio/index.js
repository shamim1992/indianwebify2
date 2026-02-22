import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPortfolios, deletePortfolio } from '../../../redux/actions/portfolioActions';
import {
    PlusCircle, Search, Pencil, Trash2, Eye,
    ChevronLeft, ChevronRight, CheckCircle2,
    Filter, RefreshCw, ExternalLink, LayoutGrid, Star, BookOpen
} from 'lucide-react';

const STATUS_CONFIG = {
    'draft': { label: 'Draft', classes: 'bg-slate-100 text-slate-500 border-slate-200' },
    'published': { label: 'Published', classes: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
};
const CATEGORIES = ['', 'Web Development', 'App Development', 'AI Development', 'Digital Marketing', 'UI/UX Design', 'E-commerce', 'Other'];

export default function AdminPortfolioList() {
    const dispatch = useDispatch();
    const { token } = useSelector((s) => s.auth);
    const { portfolios, loading, total, pages } = useSelector((s) => s.portfolio);

    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [page, setPage] = useState(1);
    const [deletingId, setDeletingId] = useState(null);
    const [view, setView] = useState('grid');
    const LIMIT = 9;

    const load = useCallback(() => {
        dispatch(fetchPortfolios({ page, limit: LIMIT, category: categoryFilter, status: statusFilter }));
    }, [dispatch, page, categoryFilter, statusFilter]);

    useEffect(() => { load(); }, [load]);

    const handleDelete = async (id) => {
        if (!confirm('Delete this portfolio item?')) return;
        setDeletingId(id);
        await dispatch(deletePortfolio({ id, token }));
        setDeletingId(null);
        load();
    };

    const filtered = portfolios.filter((p) =>
        p.title?.toLowerCase().includes(search.toLowerCase()) ||
        p.clientName?.toLowerCase().includes(search.toLowerCase()) ||
        p.category?.toLowerCase().includes(search.toLowerCase())
    );

    const stats = [
        { label: 'Total', value: total, icon: LayoutGrid, color: 'bg-orange-50 text-orange-600' },
        { label: 'Published', value: portfolios.filter(p => p.status === 'published').length, icon: CheckCircle2, color: 'bg-emerald-50 text-emerald-600' },
        { label: 'Featured', value: portfolios.filter(p => p.featured).length, icon: Star, color: 'bg-violet-50 text-violet-600' },
        { label: 'Drafts', value: portfolios.filter(p => p.status === 'draft').length, icon: BookOpen, color: 'bg-slate-100 text-slate-500' },
    ];

    return (
        <AdminLayout>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">Portfolio</h1>
                    <p className="text-slate-500 mt-1">Showcase items displayed on the public portfolio page.</p>
                </div>
                <Link
                    href="/admin/portfolio/create"
                    className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-orange-500/20 active:scale-95 whitespace-nowrap"
                >
                    <PlusCircle size={18} /> Add Portfolio Item
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((s) => {
                    const Icon = s.icon;
                    return (
                        <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4 shadow-sm">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${s.color}`}>
                                <Icon size={22} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-900">{s.value}</p>
                                <p className="text-sm text-slate-500">{s.label}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by title, client or category..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <Filter size={16} className="text-slate-400 shrink-0" />
                        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                            className="text-sm rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all text-slate-700 font-medium">
                            <option value="">All Status</option>
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                        </select>
                        <select value={categoryFilter} onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
                            className="text-sm rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all text-slate-700 font-medium">
                            {CATEGORIES.map(c => <option key={c} value={c}>{c || 'All Categories'}</option>)}
                        </select>
                        <button onClick={load} className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-orange-500 hover:border-orange-300 transition-all bg-slate-50" title="Refresh">
                            <RefreshCw size={16} />
                        </button>
                        <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                            <button onClick={() => setView('grid')} className={`p-2.5 transition-all ${view === 'grid' ? 'bg-orange-500 text-white' : 'text-slate-500 hover:text-orange-500'}`} title="Grid">
                                <LayoutGrid size={16} />
                            </button>
                            <button onClick={() => setView('list')} className={`p-2.5 transition-all ${view === 'list' ? 'bg-orange-500 text-white' : 'text-slate-500 hover:text-orange-500'}`} title="List">
                                <BookOpen size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-24">
                        <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-orange-500 animate-spin" />
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-slate-400 gap-3">
                        <LayoutGrid size={40} strokeWidth={1.5} />
                        <p className="font-medium text-slate-500">No portfolio items found</p>
                        <Link href="/admin/portfolio/create" className="text-sm text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-1">
                            <PlusCircle size={16} /> Add your first item
                        </Link>
                    </div>
                ) : view === 'grid' ? (
                    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filtered.map((item) => {
                            const st = STATUS_CONFIG[item.status] || STATUS_CONFIG['draft'];
                            return (
                                <div key={item._id} className="group rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-all hover:-translate-y-0.5">
                                    <div className="relative h-44 bg-slate-100 overflow-hidden">
                                        {item.thumbnail ? (
                                            <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <LayoutGrid size={32} className="text-slate-300" />
                                            </div>
                                        )}
                                        {item.featured && (
                                            <span className="absolute top-2 right-2 bg-amber-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                                                <Star size={9} className="fill-white" /> Featured
                                            </span>
                                        )}
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            {item.liveUrl && (
                                                <a href={item.liveUrl} target="_blank" rel="noreferrer" className="p-2 bg-white rounded-lg text-blue-600"><ExternalLink size={15} /></a>
                                            )}
                                            <Link href={`/admin/portfolio/${item._id}`} className="p-2 bg-white rounded-lg text-violet-600"><Eye size={15} /></Link>
                                            <Link href={`/admin/portfolio/edit/${item._id}`} className="p-2 bg-white rounded-lg text-orange-500"><Pencil size={15} /></Link>
                                            <button onClick={() => handleDelete(item._id)} disabled={deletingId === item._id}
                                                className="p-2 bg-white rounded-lg text-red-500 disabled:opacity-50">
                                                {deletingId === item._id
                                                    ? <div className="w-3.5 h-3.5 border-2 border-red-300 border-t-red-500 rounded-full animate-spin" />
                                                    : <Trash2 size={15} />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center justify-between gap-2 mb-2">
                                            <span className="text-[10px] text-slate-500 font-semibold uppercase truncate">{item.category}</span>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${st.classes}`}>{st.label}</span>
                                        </div>
                                        <h3 className="font-semibold text-slate-900 text-sm line-clamp-1 group-hover:text-orange-600 transition-colors">{item.title}</h3>
                                        {item.clientName && <p className="text-xs text-slate-400 mt-0.5">{item.clientName}</p>}
                                        {item.technologies?.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {item.technologies.slice(0, 3).map(t => (
                                                    <span key={t} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{t}</span>
                                                ))}
                                                {item.technologies.length > 3 && (
                                                    <span className="text-[10px] bg-slate-100 text-slate-400 px-2 py-0.5 rounded-full">+{item.technologies.length - 3}</span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100 text-left">
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Item</th>
                                    <th className="px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Client</th>
                                    <th className="px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Category</th>
                                    <th className="px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filtered.map((item) => {
                                    const st = STATUS_CONFIG[item.status] || STATUS_CONFIG['draft'];
                                    return (
                                        <tr key={item._id} className="hover:bg-slate-50/70 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {item.thumbnail ? (
                                                        <img src={item.thumbnail} alt={item.title} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                                                            <LayoutGrid size={16} className="text-orange-400" />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <div className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1 max-w-[180px]">
                                                            {item.title}
                                                            {item.featured && <Star size={12} className="inline ml-1 text-amber-400 fill-amber-400" />}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 hidden md:table-cell text-slate-600">{item.clientName || '—'}</td>
                                            <td className="px-4 py-4 hidden lg:table-cell">
                                                <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg font-medium">{item.category}</span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className={`text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-lg border ${st.classes}`}>{st.label}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    {item.liveUrl && (
                                                        <a href={item.liveUrl} target="_blank" rel="noreferrer" className="p-2 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition-all">
                                                            <ExternalLink size={14} />
                                                        </a>
                                                    )}
                                                    <Link href={`/admin/portfolio/${item._id}`} className="p-2 rounded-lg text-slate-400 hover:text-violet-500 hover:bg-violet-50 transition-all"><Eye size={15} /></Link>
                                                    <Link href={`/admin/portfolio/edit/${item._id}`} className="p-2 rounded-lg text-slate-400 hover:text-orange-500 hover:bg-orange-50 transition-all"><Pencil size={15} /></Link>
                                                    <button onClick={() => handleDelete(item._id)} disabled={deletingId === item._id}
                                                        className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all disabled:opacity-50">
                                                        {deletingId === item._id
                                                            ? <div className="w-3.5 h-3.5 border-2 border-red-300 border-t-red-500 rounded-full animate-spin" />
                                                            : <Trash2 size={15} />}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {!loading && pages > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
                        <p className="text-sm text-slate-500">Page <span className="font-semibold text-slate-700">{page}</span> of <span className="font-semibold text-slate-700">{pages}</span></p>
                        <div className="flex gap-2">
                            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                                className="p-2 rounded-lg text-slate-500 border border-slate-200 hover:border-orange-300 hover:text-orange-500 transition-all disabled:opacity-40 bg-white">
                                <ChevronLeft size={16} />
                            </button>
                            <button onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page === pages}
                                className="p-2 rounded-lg text-slate-500 border border-slate-200 hover:border-orange-300 hover:text-orange-500 transition-all disabled:opacity-40 bg-white">
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

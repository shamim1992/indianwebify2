import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, deleteProject } from '../../../redux/actions/projectActions';
import {
    PlusCircle, Search, Pencil, Trash2, Eye, ChevronLeft, ChevronRight,
    Briefcase, CheckCircle2, Clock, PauseCircle, Star, Filter, RefreshCw, ExternalLink
} from 'lucide-react';

const STATUS_CONFIG = {
    'planning': { label: 'Planning', classes: 'bg-blue-50 text-blue-600 border-blue-100' },
    'in-progress': { label: 'In Progress', classes: 'bg-amber-50 text-amber-600 border-amber-100' },
    'completed': { label: 'Completed', classes: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    'on-hold': { label: 'On Hold', classes: 'bg-slate-100 text-slate-500 border-slate-200' },
};

export default function ProjectManagement() {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { projects, loading, total, pages } = useSelector((state) => state.project);

    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [page, setPage] = useState(1);
    const [deletingId, setDeletingId] = useState(null);
    const LIMIT = 8;

    const loadProjects = useCallback(() => {
        dispatch(fetchProjects({ page, limit: LIMIT, status: statusFilter }));
    }, [dispatch, page, statusFilter]);

    useEffect(() => { loadProjects(); }, [loadProjects]);

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this project?')) return;
        setDeletingId(id);
        await dispatch(deleteProject({ id, token }));
        setDeletingId(null);
        loadProjects();
    };

    const filtered = projects.filter(
        (p) =>
            p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.clientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const stats = [
        { label: 'Total Projects', value: total, icon: Briefcase, color: 'bg-orange-50 text-orange-600' },
        { label: 'In Progress', value: projects.filter(p => p.status === 'in-progress').length, icon: Clock, color: 'bg-amber-50 text-amber-600' },
        { label: 'Completed', value: projects.filter(p => p.status === 'completed').length, icon: CheckCircle2, color: 'bg-emerald-50 text-emerald-600' },
        { label: 'Featured', value: projects.filter(p => p.featured).length, icon: Star, color: 'bg-violet-50 text-violet-600' },
    ];

    return (
        <AdminLayout>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">Project Management</h1>
                    <p className="text-slate-500 mt-1">Manage all your client projects — create, edit, and track.</p>
                </div>
                <Link
                    href="/admin/project/create"
                    className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-orange-500/20 active:scale-95 whitespace-nowrap"
                >
                    <PlusCircle size={18} /> New Project
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((s) => {
                    const Icon = s.icon;
                    return (
                        <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${s.color}`}>
                                <Icon size={22} strokeWidth={2} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-900">{s.value}</p>
                                <p className="text-sm text-slate-500 font-medium">{s.label}</p>
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
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter size={16} className="text-slate-400" />
                        <select
                            value={statusFilter}
                            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                            className="text-sm rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all text-slate-700 font-medium"
                        >
                            <option value="">All Status</option>
                            <option value="planning">Planning</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="on-hold">On Hold</option>
                        </select>
                        <button
                            onClick={loadProjects}
                            className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-orange-500 hover:border-orange-300 transition-all bg-slate-50"
                            title="Refresh"
                        >
                            <RefreshCw size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-24">
                        <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-orange-500 animate-spin" />
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-slate-400 gap-3">
                        <Briefcase size={40} strokeWidth={1.5} />
                        <p className="font-medium text-slate-500">No projects found</p>
                        <Link href="/admin/project/create" className="text-sm text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-1">
                            <PlusCircle size={16} /> Create your first project
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100 text-left">
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Project</th>
                                    <th className="px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Client</th>
                                    <th className="px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Category</th>
                                    <th className="px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Date</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filtered.map((project) => {
                                    const statusInfo = STATUS_CONFIG[project.status] || STATUS_CONFIG['planning'];
                                    return (
                                        <tr key={project._id} className="hover:bg-slate-50/70 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {project.coverImage ? (
                                                        <img src={project.coverImage} alt={project.title} className="w-10 h-10 rounded-lg object-cover border border-slate-100 shrink-0" />
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                                                            <Briefcase size={16} className="text-orange-400" />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <div className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1 max-w-[180px]">
                                                            {project.title}
                                                            {project.featured && <Star size={12} className="inline ml-1 text-amber-400 fill-amber-400" />}
                                                        </div>
                                                        {project.budget && <p className="text-xs text-slate-400 mt-0.5">{project.budget}</p>}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 hidden md:table-cell text-slate-600 text-sm">
                                                {project.clientName || '—'}
                                            </td>
                                            <td className="px-4 py-4 hidden lg:table-cell">
                                                <span className="inline-flex items-center text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg font-medium">
                                                    {project.category || 'General'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className={`text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-lg border ${statusInfo.classes}`}>
                                                    {statusInfo.label}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-slate-400 text-xs hidden sm:table-cell whitespace-nowrap">
                                                {project.createdAt ? new Date(project.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    {project.projectUrl && (
                                                        <a href={project.projectUrl} target="_blank" rel="noreferrer"
                                                            className="p-2 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition-all" title="Live Site">
                                                            <ExternalLink size={14} />
                                                        </a>
                                                    )}
                                                    <Link href={`/admin/project/${project._id}`}
                                                        className="p-2 rounded-lg text-slate-400 hover:text-violet-500 hover:bg-violet-50 transition-all" title="View">
                                                        <Eye size={15} />
                                                    </Link>
                                                    <Link href={`/admin/project/edit/${project._id}`}
                                                        className="p-2 rounded-lg text-slate-400 hover:text-orange-500 hover:bg-orange-50 transition-all" title="Edit">
                                                        <Pencil size={15} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(project._id)}
                                                        disabled={deletingId === project._id}
                                                        className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all disabled:opacity-50"
                                                        title="Delete"
                                                    >
                                                        {deletingId === project._id ? (
                                                            <div className="w-3.5 h-3.5 border-2 border-red-300 border-t-red-500 rounded-full animate-spin" />
                                                        ) : (
                                                            <Trash2 size={15} />
                                                        )}
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
                        <p className="text-sm text-slate-500">
                            Page <span className="font-semibold text-slate-700">{page}</span> of{' '}
                            <span className="font-semibold text-slate-700">{pages}</span>
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="p-2 rounded-lg text-slate-500 border border-slate-200 hover:border-orange-300 hover:text-orange-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-white"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button
                                onClick={() => setPage((p) => Math.min(pages, p + 1))}
                                disabled={page === pages}
                                className="p-2 rounded-lg text-slate-500 border border-slate-200 hover:border-orange-300 hover:text-orange-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-white"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import {
    PlusCircle, Search, Pencil, Trash2, Eye, ChevronLeft, ChevronRight,
    BookOpen, Globe, FileEdit, Filter, RefreshCw, Tag
} from 'lucide-react';
import { API_URL } from '../../../apiUrl';

const STATUS_MAP = {
    published: { label: 'Published', classes: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    draft: { label: 'Draft', classes: 'bg-amber-50 text-amber-600 border-amber-100' },
};

export default function BlogManagement() {
    const { token } = useSelector((state) => state.auth);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [deletingId, setDeletingId] = useState(null);
    const LIMIT = 8;

    const fetchBlogs = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({ page, limit: LIMIT });
            if (statusFilter) params.append('status', statusFilter);

            const res = await fetch(`${API_URL}/api/blogs?${params.toString()}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.success) {
                setBlogs(data.blogs);
                setTotalPages(data.pages);
                setTotal(data.total);
            }
        } catch (err) {
            console.error('Failed to fetch blogs', err);
        } finally {
            setLoading(false);
        }
    }, [page, statusFilter, token]);

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this blog post?')) return;
        setDeletingId(id);
        try {
            const res = await fetch(`${API_URL}/api/blogs/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.success) {
                fetchBlogs();
            } else {
                alert(data.message || 'Failed to delete blog');
            }
        } catch (err) {
            console.error(err);
            alert('An error occurred while deleting.');
        } finally {
            setDeletingId(null);
        }
    };

    const filteredBlogs = blogs.filter(
        (b) =>
            b.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.category?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdminLayout>
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                        Blog Management
                    </h1>
                    <p className="text-slate-500 mt-1">
                        Manage all your blog posts — create, edit, and publish.
                    </p>
                </div>
                <Link
                    href="/admin/blog/create"
                    className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-orange-500/20 active:scale-95 whitespace-nowrap"
                >
                    <PlusCircle size={18} />
                    New Post
                </Link>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                    { label: 'Total Posts', value: total, icon: BookOpen, color: 'bg-orange-50 text-orange-600' },
                    { label: 'Published', value: blogs.filter(b => b.status === 'published').length, icon: Globe, color: 'bg-emerald-50 text-emerald-600' },
                    { label: 'Drafts', value: blogs.filter(b => b.status === 'draft').length, icon: FileEdit, color: 'bg-amber-50 text-amber-600' },
                ].map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label} className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                                <Icon size={22} strokeWidth={2} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Filters Bar */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by title or category..."
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
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                        </select>
                        <button
                            onClick={fetchBlogs}
                            className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-orange-500 hover:border-orange-300 transition-all bg-slate-50"
                            title="Refresh"
                        >
                            <RefreshCw size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Blog Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-24">
                        <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-orange-500 animate-spin" />
                    </div>
                ) : filteredBlogs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-slate-400 gap-3">
                        <BookOpen size={40} strokeWidth={1.5} />
                        <p className="font-medium text-slate-500">No blog posts found</p>
                        <Link
                            href="/admin/blog/create"
                            className="text-sm text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-1"
                        >
                            <PlusCircle size={16} /> Create your first post
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100 text-left">
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</th>
                                    <th className="px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Category</th>
                                    <th className="px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Author</th>
                                    <th className="px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Date</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredBlogs.map((blog) => {
                                    const statusInfo = STATUS_MAP[blog.status] || STATUS_MAP.draft;
                                    return (
                                        <tr
                                            key={blog._id}
                                            className="hover:bg-slate-50/70 transition-colors group"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1 max-w-[220px]">
                                                    {blog.title}
                                                </div>
                                                {blog.excerpt && (
                                                    <p className="text-slate-400 text-xs mt-0.5 line-clamp-1 max-w-[220px]">{blog.excerpt}</p>
                                                )}
                                            </td>
                                            <td className="px-4 py-4 hidden md:table-cell">
                                                <span className="inline-flex items-center gap-1 text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg font-medium">
                                                    <Tag size={11} />
                                                    {blog.category?.name || 'General'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 hidden lg:table-cell text-slate-500">
                                                {blog.author?.name || '—'}
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className={`text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-lg border ${statusInfo.classes}`}>
                                                    {statusInfo.label}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-slate-400 text-xs hidden sm:table-cell whitespace-nowrap">
                                                {new Date(blog.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/admin/blog/edit/${blog._id}`}
                                                        className="p-2 rounded-lg text-slate-400 hover:text-orange-500 hover:bg-orange-50 transition-all"
                                                        title="Edit"
                                                    >
                                                        <Pencil size={15} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(blog._id)}
                                                        disabled={deletingId === blog._id}
                                                        className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all disabled:opacity-50"
                                                        title="Delete"
                                                    >
                                                        {deletingId === blog._id ? (
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
                {!loading && totalPages > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
                        <p className="text-sm text-slate-500">
                            Page <span className="font-semibold text-slate-700">{page}</span> of{' '}
                            <span className="font-semibold text-slate-700">{totalPages}</span>
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
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
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

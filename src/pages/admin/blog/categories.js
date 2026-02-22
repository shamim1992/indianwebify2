import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import {
    Plus, Pencil, Trash2, Tag, X, Check, ArrowLeft,
    RefreshCw, Search, Loader2, FolderOpen, Hash
} from 'lucide-react';
import { API_URL } from '../../../apiUrl';

const emptyForm = { name: '', description: '' };

export default function CategoryManagement() {
    const { token } = useSelector((state) => state.auth);

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [editTarget, setEditTarget] = useState(null); // null = create mode
    const [form, setForm] = useState(emptyForm);
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState('');

    // Delete state
    const [deletingId, setDeletingId] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

    const fetchCategories = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/categories`);
            const data = await res.json();
            if (data.success) setCategories(data.categories);
        } catch (err) {
            console.error('Failed to fetch categories', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchCategories(); }, [fetchCategories]);

    const openCreate = () => {
        setEditTarget(null);
        setForm(emptyForm);
        setFormError('');
        setShowModal(true);
    };

    const openEdit = (cat) => {
        setEditTarget(cat);
        setForm({ name: cat.name, description: cat.description || '' });
        setFormError('');
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setForm(emptyForm);
        setFormError('');
        setEditTarget(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name.trim()) { setFormError('Category name is required.'); return; }
        setFormError('');
        setSubmitting(true);

        const isEdit = !!editTarget;
        const url = isEdit
            ? `${API_URL}/api/categories/${editTarget._id}`
            : `${API_URL}/api/categories`;

        try {
            const res = await fetch(url, {
                method: isEdit ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (data.success) {
                closeModal();
                fetchCategories();
            } else {
                setFormError(data.message || 'Something went wrong.');
            }
        } catch (err) {
            console.error(err);
            setFormError('A network error occurred.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        setDeletingId(id);
        try {
            const res = await fetch(`${API_URL}/api/categories/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.success) {
                setCategories((prev) => prev.filter((c) => c._id !== id));
            } else {
                alert(data.message || 'Failed to delete category.');
            }
        } catch (err) {
            console.error(err);
            alert('An error occurred while deleting.');
        } finally {
            setDeletingId(null);
            setConfirmDeleteId(null);
        }
    };

    const slugPreview = form.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();

    const filtered = categories.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.description || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdminLayout>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/blog"
                        className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-orange-500 hover:border-orange-300 transition-all bg-white"
                    >
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                            Categories
                        </h1>
                        <p className="text-slate-500 mt-0.5 text-sm">
                            Organise your blog posts with categories.
                        </p>
                    </div>
                </div>
                <button
                    onClick={openCreate}
                    className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-orange-500/20 active:scale-95 whitespace-nowrap"
                >
                    <Plus size={18} />
                    Add Category
                </button>
            </div>

            {/* Stats + Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                {/* Quick stat */}
                <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                        <Tag size={20} strokeWidth={2} />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-slate-900">{categories.length}</p>
                        <p className="text-xs text-slate-500 font-medium">Total Categories</p>
                    </div>
                </div>

                {/* Search */}
                <div className="relative flex-1 min-w-[200px]">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all shadow-sm"
                    />
                </div>

                <button
                    onClick={fetchCategories}
                    className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-orange-500 hover:border-orange-300 transition-all bg-white shadow-sm"
                    title="Refresh"
                >
                    <RefreshCw size={16} />
                </button>
            </div>

            {/* Category Grid / List */}
            {loading ? (
                <div className="flex items-center justify-center py-24">
                    <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-orange-500 animate-spin" />
                </div>
            ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-slate-400 gap-3">
                    <FolderOpen size={44} strokeWidth={1.5} />
                    <p className="font-medium text-slate-500">
                        {searchQuery ? 'No categories match your search.' : 'No categories yet.'}
                    </p>
                    {!searchQuery && (
                        <button
                            onClick={openCreate}
                            className="text-sm text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-1"
                        >
                            <Plus size={16} /> Create your first category
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((cat) => (
                        <div
                            key={cat._id}
                            className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group p-5 flex flex-col gap-3"
                        >
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0 group-hover:bg-orange-100 transition-colors">
                                        <Tag size={18} strokeWidth={2} />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-bold text-slate-900 truncate">{cat.name}</h3>
                                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                                            <Hash size={11} />
                                            {cat.slug}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1 shrink-0">
                                    <button
                                        onClick={() => openEdit(cat)}
                                        className="p-2 rounded-lg text-slate-400 hover:text-orange-500 hover:bg-orange-50 transition-all"
                                        title="Edit"
                                    >
                                        <Pencil size={15} />
                                    </button>

                                    {confirmDeleteId === cat._id ? (
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => handleDelete(cat._id)}
                                                disabled={deletingId === cat._id}
                                                className="p-1.5 rounded-lg text-white bg-red-500 hover:bg-red-600 transition-all disabled:opacity-60"
                                                title="Confirm delete"
                                            >
                                                {deletingId === cat._id
                                                    ? <Loader2 size={13} className="animate-spin" />
                                                    : <Check size={13} />}
                                            </button>
                                            <button
                                                onClick={() => setConfirmDeleteId(null)}
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
                                                title="Cancel"
                                            >
                                                <X size={13} />
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setConfirmDeleteId(cat._id)}
                                            className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                                            title="Delete"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {cat.description ? (
                                <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                                    {cat.description}
                                </p>
                            ) : (
                                <p className="text-sm text-slate-300 italic">No description</p>
                            )}

                            <div className="mt-auto pt-2 border-t border-slate-100 text-xs text-slate-400">
                                Created {new Date(cat.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create / Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        onClick={closeModal}
                    />

                    {/* Modal Card */}
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fade-in">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                                    <Tag size={20} />
                                </div>
                                <h2 className="text-lg font-bold text-slate-900">
                                    {editTarget ? 'Edit Category' : 'New Category'}
                                </h2>
                            </div>
                            <button
                                onClick={closeModal}
                                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                    Name <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                                    placeholder="e.g. Technology"
                                    autoFocus
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 text-slate-900 placeholder:text-slate-400 transition-all font-medium"
                                />
                                {/* Slug preview */}
                                {form.name && (
                                    <p className="mt-1.5 text-xs text-slate-400 flex items-center gap-1">
                                        <Hash size={11} />
                                        Slug: <span className="font-mono text-orange-500">{slugPreview}</span>
                                    </p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                    Description
                                    <span className="font-normal text-slate-400 ml-1">(optional)</span>
                                </label>
                                <textarea
                                    rows={3}
                                    value={form.description}
                                    onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                                    placeholder="Brief description of this category..."
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 text-slate-700 placeholder:text-slate-400 resize-none transition-all text-sm"
                                />
                            </div>

                            {/* Error */}
                            {formError && (
                                <p className="text-sm text-red-500 bg-red-50 border border-red-100 px-4 py-2.5 rounded-xl font-medium">
                                    {formError}
                                </p>
                            )}

                            {/* Actions */}
                            <div className="flex gap-3 pt-1">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm transition-all shadow-lg shadow-orange-500/20 active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2"
                                >
                                    {submitting
                                        ? <Loader2 size={16} className="animate-spin" />
                                        : <Check size={16} />}
                                    {editTarget ? 'Save Changes' : 'Create Category'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

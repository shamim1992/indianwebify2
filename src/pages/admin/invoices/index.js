import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvoices, fetchInvoiceStats, deleteInvoice, updateInvoiceStatus } from '../../../redux/actions/invoiceActions';
import {
    PlusCircle, Search, Pencil, Trash2, Eye, FileText,
    ChevronLeft, ChevronRight, RefreshCw, IndianRupee,
    CheckCircle2, Clock, AlertTriangle, XCircle, Send
} from 'lucide-react';

const STATUS = {
    draft: { label: 'Draft', classes: 'bg-slate-100 text-slate-500 border-slate-200', icon: FileText },
    sent: { label: 'Sent', classes: 'bg-blue-50 text-blue-600 border-blue-100', icon: Send },
    paid: { label: 'Paid', classes: 'bg-emerald-50 text-emerald-600 border-emerald-100', icon: CheckCircle2 },
    overdue: { label: 'Overdue', classes: 'bg-red-50 text-red-600 border-red-100', icon: AlertTriangle },
    cancelled: { label: 'Cancelled', classes: 'bg-slate-100 text-slate-400 border-slate-200', icon: XCircle },
};

const fmt = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
const money = (v, cur = 'INR') =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: cur, maximumFractionDigits: 2 }).format(v || 0);

const FILTER_TABS = ['all', 'draft', 'sent', 'paid', 'overdue', 'cancelled'];
const LIMIT = 15;

export default function AdminInvoiceList() {
    const dispatch = useDispatch();
    const { invoices, loading, total, pages, stats } = useSelector((s) => s.invoice);

    const [tab, setTab] = useState('all');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [deleting, setDeleting] = useState(null);

    const load = useCallback(() => {
        dispatch(fetchInvoices({ page, limit: LIMIT, status: tab === 'all' ? '' : tab, search }));
    }, [dispatch, page, tab, search]);

    useEffect(() => { load(); }, [load]);
    useEffect(() => { dispatch(fetchInvoiceStats()); }, [dispatch]);

    const handleDelete = async (id) => {
        if (!confirm('Delete this invoice? This cannot be undone.')) return;
        setDeleting(id);
        await dispatch(deleteInvoice(id));
        setDeleting(null);
        dispatch(fetchInvoiceStats());
    };

    const quickStatus = async (id, status) => {
        await dispatch(updateInvoiceStatus({ id, status }));
        dispatch(fetchInvoiceStats());
    };

    const statCards = [
        { label: 'Total Revenue', value: money(stats?.totalRevenue), icon: IndianRupee, color: 'bg-emerald-50 text-emerald-600' },
        { label: 'Pending', value: money(stats?.pendingAmount), icon: Clock, color: 'bg-blue-50 text-blue-600' },
        { label: 'Overdue', value: money(stats?.overdueAmount), icon: AlertTriangle, color: 'bg-red-50 text-red-500' },
        { label: 'Total Invoices', value: stats?.totalCount ?? total, icon: FileText, color: 'bg-orange-50 text-orange-500' },
    ];

    return (
        <AdminLayout>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">Invoices</h1>
                    <p className="text-slate-500 mt-1">Create and manage client invoices for your projects.</p>
                </div>
                <Link href="/admin/invoices/create"
                    className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-orange-500/20 active:scale-95 whitespace-nowrap">
                    <PlusCircle size={18} /> New Invoice
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((s) => {
                    const Icon = s.icon;
                    return (
                        <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4 shadow-sm">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${s.color}`}>
                                <Icon size={22} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-lg font-bold text-slate-900 truncate">{s.value}</p>
                                <p className="text-sm text-slate-500">{s.label}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                {/* Tabs */}
                <div className="flex flex-wrap gap-1.5">
                    {FILTER_TABS.map((t) => (
                        <button
                            key={t}
                            onClick={() => { setTab(t); setPage(1); }}
                            className={`px-4 py-1.5 rounded-lg text-sm font-semibold capitalize transition-all ${tab === t ? 'bg-orange-500 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                        >
                            {t === 'all' ? `All (${stats?.totalCount ?? '—'})` : `${STATUS[t]?.label ?? t} ${t === 'paid' ? `(${stats?.paidCount ?? 0})` : t === 'overdue' ? `(${stats?.overdueCount ?? 0})` : t === 'sent' ? `(${stats?.sentCount ?? 0})` : t === 'draft' ? `(${stats?.draftCount ?? 0})` : ''}`}
                        </button>
                    ))}
                </div>

                <div className="flex gap-2">
                    <div className="relative">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            placeholder="Search client or invoice #..."
                            className="pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 w-56 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
                        />
                    </div>
                    <button onClick={load} title="Refresh"
                        className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-orange-500 hover:border-orange-300 transition-all bg-slate-50">
                        <RefreshCw size={16} />
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-24">
                        <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-orange-500 animate-spin" />
                    </div>
                ) : invoices.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-slate-400 gap-3">
                        <FileText size={40} strokeWidth={1.5} />
                        <p className="font-medium text-slate-500">No invoices found</p>
                        <Link href="/admin/invoices/create" className="text-sm text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-1">
                            <PlusCircle size={16} /> Create your first invoice
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100 text-left">
                                    <th className="px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Invoice</th>
                                    <th className="px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Client</th>
                                    <th className="px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Project</th>
                                    <th className="px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Due Date</th>
                                    <th className="px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Amount</th>
                                    <th className="px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {invoices.map((inv) => {
                                    const st = STATUS[inv.status] || STATUS.draft;
                                    const Icon = st.icon;
                                    const isOverdueSoon = inv.dueDate && inv.status !== 'paid' && new Date(inv.dueDate) < new Date();
                                    return (
                                        <tr key={inv._id} className="hover:bg-slate-50/70 transition-colors group">
                                            <td className="px-5 py-4">
                                                <div className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                                                    {inv.invoiceNumber}
                                                </div>
                                                <div className="text-xs text-slate-400">{fmt(inv.issueDate)}</div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="font-medium text-slate-800 max-w-[140px] truncate">{inv.clientName}</div>
                                                {inv.clientEmail && <div className="text-xs text-slate-400 truncate max-w-[140px]">{inv.clientEmail}</div>}
                                            </td>
                                            <td className="px-4 py-4 hidden md:table-cell">
                                                <span className="text-slate-600 text-xs truncate max-w-[120px] block">{inv.projectName || '—'}</span>
                                            </td>
                                            <td className="px-4 py-4 hidden lg:table-cell">
                                                <span className={`text-xs font-medium ${isOverdueSoon && inv.status !== 'paid' ? 'text-red-500' : 'text-slate-600'}`}>
                                                    {fmt(inv.dueDate)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <span className="font-bold text-slate-900">{money(inv.total, inv.currency)}</span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <select
                                                    value={inv.status}
                                                    onChange={(e) => quickStatus(inv._id, e.target.value)}
                                                    className={`text-xs font-bold px-2 py-1 rounded-lg border cursor-pointer bg-transparent focus:outline-none ${st.classes}`}
                                                >
                                                    {Object.entries(STATUS).map(([k, v]) => (
                                                        <option key={k} value={k}>{v.label}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Link href={`/admin/invoices/${inv._id}`}
                                                        className="p-2 rounded-lg text-slate-400 hover:text-violet-500 hover:bg-violet-50 transition-all">
                                                        <Eye size={15} />
                                                    </Link>
                                                    <Link href={`/admin/invoices/edit/${inv._id}`}
                                                        className="p-2 rounded-lg text-slate-400 hover:text-orange-500 hover:bg-orange-50 transition-all">
                                                        <Pencil size={15} />
                                                    </Link>
                                                    <button onClick={() => handleDelete(inv._id)} disabled={deleting === inv._id}
                                                        className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all disabled:opacity-50">
                                                        {deleting === inv._id
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
                        <p className="text-sm text-slate-500">Page <span className="font-semibold text-slate-700">{page}</span> of <span className="font-semibold text-slate-700">{pages}</span> · {total} invoices</p>
                        <div className="flex gap-2">
                            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                                className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-orange-500 hover:border-orange-300 bg-white transition-all disabled:opacity-40">
                                <ChevronLeft size={16} />
                            </button>
                            <button onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page === pages}
                                className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-orange-500 hover:border-orange-300 bg-white transition-all disabled:opacity-40">
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

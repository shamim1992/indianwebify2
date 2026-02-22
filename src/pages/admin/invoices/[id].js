import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { fetchInvoiceById, updateInvoiceStatus, deleteInvoice, fetchInvoiceStats } from '../../../redux/actions/invoiceActions';
import { clearCurrentInvoice } from '../../../redux/slices/invoiceSlice';
import {
    ArrowLeft, Pencil, Printer, Trash2, CheckCircle2,
    Clock, AlertTriangle, XCircle, Send, FileText, IndianRupee, User, Briefcase, Calendar
} from 'lucide-react';

const STATUS = {
    draft: { label: 'Draft', classes: 'bg-slate-100 text-slate-500', icon: FileText },
    sent: { label: 'Sent', classes: 'bg-blue-100 text-blue-600', icon: Send },
    paid: { label: 'Paid', classes: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
    overdue: { label: 'Overdue', classes: 'bg-red-100 text-red-600', icon: AlertTriangle },
    cancelled: { label: 'Cancelled', classes: 'bg-slate-100 text-slate-400', icon: XCircle },
};
const fmt = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) : '—';
const money = (v, cur = 'INR') =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: cur || 'INR', maximumFractionDigits: 2 }).format(v || 0);

export default function InvoiceDetail() {
    const router = useRouter();
    const { id } = router.query;
    const dispatch = useDispatch();
    const { currentInvoice: inv, loading } = useSelector((s) => s.invoice);

    const [markPaid, setMarkPaid] = useState(false);
    const [paidMethod, setPaidMethod] = useState('Bank Transfer');
    const [statusSel, setStatusSel] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (id) dispatch(fetchInvoiceById(id));
        return () => { dispatch(clearCurrentInvoice()); };
    }, [id, dispatch]);

    useEffect(() => { if (inv) setStatusSel(inv.status); }, [inv]);

    const applyStatus = async () => {
        setSaving(true);
        await dispatch(updateInvoiceStatus({ id, status: statusSel, paymentMethod: statusSel === 'paid' ? paidMethod : undefined }));
        dispatch(fetchInvoiceStats());
        setSaving(false);
    };

    const handleDelete = async () => {
        if (!confirm('Delete this invoice?')) return;
        await dispatch(deleteInvoice(id));
        router.push('/admin/invoices');
    };

    if (loading || !inv) return (
        <AdminLayout>
            <div className="flex items-center justify-center py-32">
                <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-orange-500 animate-spin" />
            </div>
        </AdminLayout>
    );

    const st = STATUS[inv.status] || STATUS.draft;
    const Icon = st.icon;
    const cur = inv.currency || 'INR';

    return (
        <AdminLayout>
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
                <div className="flex items-center gap-3">
                    <Link href="/admin/invoices" className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-orange-500 hover:border-orange-300 transition-all bg-white">
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">{inv.invoiceNumber}</h1>
                        <p className="text-slate-500 text-sm">{inv.clientName} · Issued {fmt(inv.issueDate)}</p>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <button onClick={() => window.print()}
                        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800 border border-slate-200 hover:border-slate-300 px-4 py-2 rounded-xl bg-white transition-all">
                        <Printer size={14} /> Print
                    </button>
                    <Link href={`/admin/invoices/edit/${id}`}
                        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-orange-500 border border-slate-200 hover:border-orange-300 px-4 py-2 rounded-xl bg-white transition-all">
                        <Pencil size={14} /> Edit
                    </Link>
                    <button onClick={handleDelete}
                        className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300 px-4 py-2 rounded-xl bg-red-50 transition-all">
                        <Trash2 size={14} /> Delete
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Invoice Document */}
                <div className="lg:col-span-2">
                    <div id="invoice-print" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-8 print:shadow-none print:border-none print:rounded-none">
                        {/* Invoice Header */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                            <div>
                                <h2 className="text-3xl font-black text-slate-900 mb-1">INVOICE</h2>
                                <p className="text-slate-500 text-sm">#{inv.invoiceNumber}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-slate-800 text-lg">IndianWebify</p>
                                <p className="text-slate-500 text-sm">Digital Solutions Agency</p>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-orange-500 via-orange-300 to-transparent" />

                        {/* Bill to + Invoice info */}
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Bill To</p>
                                <p className="font-bold text-slate-900">{inv.clientName}</p>
                                {inv.clientEmail && <p className="text-sm text-slate-500">{inv.clientEmail}</p>}
                                {inv.clientPhone && <p className="text-sm text-slate-500">{inv.clientPhone}</p>}
                                {inv.clientAddress && <p className="text-sm text-slate-500">{inv.clientAddress}</p>}
                            </div>
                            <div className="text-right space-y-1">
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Invoice Date</p>
                                    <p className="text-sm font-semibold text-slate-800">{fmt(inv.issueDate)}</p>
                                </div>
                                {inv.dueDate && (
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Due Date</p>
                                        <p className="text-sm font-semibold text-slate-800">{fmt(inv.dueDate)}</p>
                                    </div>
                                )}
                                {inv.projectName && (
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Project</p>
                                        <p className="text-sm font-semibold text-slate-800">{inv.projectName}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Line Items Table */}
                        <div className="rounded-xl overflow-hidden border border-slate-100">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-slate-900 text-white">
                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider">Description</th>
                                        <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider w-16">Qty</th>
                                        <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider w-28">Rate</th>
                                        <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider w-32">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {(inv.items || []).map((item, i) => (
                                        <tr key={i} className={i % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}>
                                            <td className="px-5 py-3 text-slate-800 font-medium">{item.description}</td>
                                            <td className="px-4 py-3 text-center text-slate-600">{item.quantity}</td>
                                            <td className="px-4 py-3 text-right text-slate-600">{money(item.rate, cur)}</td>
                                            <td className="px-5 py-3 text-right font-semibold text-slate-900">{money(item.amount, cur)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Totals */}
                        <div className="flex justify-end">
                            <div className="w-64 space-y-2 text-sm">
                                <div className="flex justify-between text-slate-600">
                                    <span>Subtotal</span><span className="font-semibold">{money(inv.subtotal, cur)}</span>
                                </div>
                                {inv.taxRate > 0 && (
                                    <div className="flex justify-between text-slate-600">
                                        <span>Tax ({inv.taxRate}%)</span><span className="font-semibold">{money(inv.taxAmount, cur)}</span>
                                    </div>
                                )}
                                {inv.discountAmount > 0 && (
                                    <div className="flex justify-between text-emerald-600">
                                        <span>Discount</span><span className="font-semibold">-{money(inv.discountAmount, cur)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between font-bold text-base text-slate-900 pt-2 border-t-2 border-slate-200">
                                    <span>Total</span><span className="text-orange-600">{money(inv.total, cur)}</span>
                                </div>
                                {inv.status === 'paid' && inv.paidDate && (
                                    <div className="mt-3 bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-center">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
                                        <p className="text-xs font-bold text-emerald-700">Paid on {fmt(inv.paidDate)}</p>
                                        {inv.paymentMethod && <p className="text-xs text-emerald-600">{inv.paymentMethod}</p>}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Notes */}
                        {inv.notes && (
                            <div className="border-t border-slate-100 pt-4">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Notes</p>
                                <p className="text-sm text-slate-600 whitespace-pre-wrap">{inv.notes}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6 print:hidden">
                    {/* Status */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                        <h2 className="font-bold text-slate-800">Invoice Status</h2>

                        <div className={`inline-flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl ${st.classes}`}>
                            <Icon size={15} /> {st.label}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-700">Change Status</label>
                            <select value={statusSel} onChange={e => setStatusSel(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all">
                                {Object.entries(STATUS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                            </select>
                            {statusSel === 'paid' && (
                                <select value={paidMethod} onChange={e => setPaidMethod(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all mt-2">
                                    {['Bank Transfer', 'UPI', 'Cash', 'Credit Card', 'Cheque', 'PayPal'].map(m => <option key={m}>{m}</option>)}
                                </select>
                            )}
                            <button onClick={applyStatus} disabled={saving || statusSel === inv.status}
                                className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                                {saving ? 'Updating…' : 'Update Status'}
                            </button>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3 text-sm">
                        <h2 className="font-bold text-slate-800">Summary</h2>
                        <div className="space-y-2 text-slate-600">
                            {inv.clientEmail && (
                                <div className="flex items-center gap-2"><User size={13} className="text-slate-400" />{inv.clientEmail}</div>
                            )}
                            {inv.projectName && (
                                <div className="flex items-center gap-2"><Briefcase size={13} className="text-slate-400" />{inv.projectName}</div>
                            )}
                            {inv.dueDate && (
                                <div className="flex items-center gap-2"><Calendar size={13} className="text-slate-400" />Due {fmt(inv.dueDate)}</div>
                            )}
                            <div className="flex items-center gap-2"><IndianRupee size={13} className="text-slate-400" />
                                <span className="font-bold text-slate-900">{money(inv.total, cur)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3">
                        <h2 className="font-bold text-slate-800">Quick Actions</h2>
                        <Link href={`/admin/invoices/edit/${id}`}
                            className="flex items-center gap-2 w-full text-sm font-medium text-slate-700 hover:text-orange-600 hover:bg-orange-50 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-orange-200 transition-all">
                            <Pencil size={14} className="text-orange-400" /> Edit Invoice
                        </Link>
                        <button onClick={() => window.print()}
                            className="flex items-center gap-2 w-full text-sm font-medium text-slate-700 hover:bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 transition-all">
                            <Printer size={14} className="text-slate-400" /> Print / Save PDF
                        </button>
                        <Link href="/admin/invoices/create"
                            className="flex items-center gap-2 w-full text-sm font-medium text-slate-700 hover:bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 transition-all">
                            <FileText size={14} className="text-slate-400" /> New Invoice
                        </Link>
                        <button onClick={handleDelete}
                            className="flex items-center gap-2 w-full text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-red-200 transition-all">
                            <Trash2 size={14} /> Delete Invoice
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../../../components/admin/AdminLayout';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { fetchInvoiceById, updateInvoice } from '../../../../redux/actions/invoiceActions';
import { ArrowLeft, Plus, Trash2, Save, IndianRupee, User, Calendar } from 'lucide-react';

const FIELD = 'w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all';
const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP', 'AED'];
const PAYMENT_METHODS = ['', 'Bank Transfer', 'UPI', 'Cash', 'Credit Card', 'Cheque', 'PayPal'];
const fmtISO = (d) => d ? new Date(d).toISOString().slice(0, 10) : '';

export default function EditInvoice() {
    const router = useRouter();
    const { id } = router.query;
    const dispatch = useDispatch();
    const { currentInvoice, loading } = useSelector((s) => s.invoice);

    const [ready, setReady] = useState(false);
    const [client, setClient] = useState({ name: '', email: '', phone: '', address: '' });
    const [project, setProject] = useState({ projectName: '' });
    const [items, setItems] = useState([]);
    const [taxRate, setTaxRate] = useState('');
    const [discountAmount, setDiscountAmount] = useState('');
    const [currency, setCurrency] = useState('INR');
    const [status, setStatus] = useState('draft');
    const [issueDate, setIssueDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [notes, setNotes] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) dispatch(fetchInvoiceById(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (currentInvoice) {
            const inv = currentInvoice;
            setClient({ name: inv.clientName || '', email: inv.clientEmail || '', phone: inv.clientPhone || '', address: inv.clientAddress || '' });
            setProject({ projectName: inv.projectName || '' });
            setItems((inv.items || []).map(i => ({ ...i })));
            setTaxRate(inv.taxRate ?? '');
            setDiscountAmount(inv.discountAmount ?? '');
            setCurrency(inv.currency || 'INR');
            setStatus(inv.status || 'draft');
            setIssueDate(fmtISO(inv.issueDate));
            setDueDate(fmtISO(inv.dueDate));
            setPaymentMethod(inv.paymentMethod || '');
            setNotes(inv.notes || '');
            setReady(true);
        }
    }, [currentInvoice]);

    const updateItem = useCallback((i, field, val) => {
        setItems(prev => {
            const next = [...prev];
            next[i] = { ...next[i], [field]: val };
            next[i].amount = +(Number(next[i].quantity) * Number(next[i].rate)).toFixed(2);
            return next;
        });
    }, []);
    const addItem = () => setItems(p => [...p, { description: '', quantity: 1, rate: '', amount: 0 }]);
    const removeItem = (i) => setItems(p => p.filter((_, idx) => idx !== i));

    const subtotal = +items.reduce((s, it) => s + (Number(it.quantity) * Number(it.rate)), 0).toFixed(2);
    const taxAmt = +(subtotal * (Number(taxRate) / 100)).toFixed(2);
    const total = +(subtotal + taxAmt - Number(discountAmount || 0)).toFixed(2);
    const fmt = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: currency || 'INR', maximumFractionDigits: 2 }).format(n);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!client.name.trim()) { setError('Client name is required.'); return; }

        const payload = {
            id,
            clientName: client.name, clientEmail: client.email,
            clientPhone: client.phone, clientAddress: client.address,
            projectName: project.projectName,
            items: items.map(it => ({ description: it.description, quantity: Number(it.quantity), rate: Number(it.rate), amount: it.amount })),
            taxRate: Number(taxRate) || 0, discountAmount: Number(discountAmount) || 0,
            currency, status, issueDate, dueDate: dueDate || null, paymentMethod, notes,
        };
        const res = await dispatch(updateInvoice(payload));
        if (updateInvoice.fulfilled.match(res)) {
            router.push(`/admin/invoices/${id}`);
        } else {
            setError(res.payload || 'Failed to update invoice.');
        }
    };

    if (!ready) return (
        <AdminLayout>
            <div className="flex items-center justify-center py-32">
                <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-orange-500 animate-spin" />
            </div>
        </AdminLayout>
    );

    return (
        <AdminLayout>
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Link href={`/admin/invoices/${id}`} className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-orange-500 hover:border-orange-300 transition-all bg-white">
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Edit Invoice</h1>
                        <p className="text-slate-500 text-sm mt-0.5">{currentInvoice?.invoiceNumber} · {client.name}</p>
                    </div>
                </div>
                <Link href={`/admin/invoices/${id}`} className="text-sm text-slate-500 hover:text-slate-700 border border-slate-200 px-4 py-2 rounded-xl bg-white transition-all">
                    View Invoice
                </Link>
            </div>

            {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-4">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Client */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                            <h2 className="font-bold text-slate-800 flex items-center gap-2"><User size={16} className="text-orange-500" />Client Information</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Client Name <span className="text-red-500">*</span></label>
                                    <input value={client.name} onChange={e => setClient(c => ({ ...c, name: e.target.value }))} className={FIELD} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                                    <input type="email" value={client.email} onChange={e => setClient(c => ({ ...c, email: e.target.value }))} className={FIELD} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone</label>
                                    <input value={client.phone} onChange={e => setClient(c => ({ ...c, phone: e.target.value }))} className={FIELD} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Address</label>
                                    <input value={client.address} onChange={e => setClient(c => ({ ...c, address: e.target.value }))} className={FIELD} />
                                </div>
                            </div>
                        </div>

                        {/* Project */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Project Name</label>
                            <input value={project.projectName} onChange={e => setProject(p => ({ ...p, projectName: e.target.value }))} className={FIELD} />
                        </div>

                        {/* Line Items */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100">
                                <h2 className="font-bold text-slate-800">Line Items</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-slate-50 text-left">
                                            <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</th>
                                            <th className="px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-20">Qty</th>
                                            <th className="px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-32">Rate</th>
                                            <th className="px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-32 text-right">Amount</th>
                                            <th className="w-10" />
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {items.map((item, i) => (
                                            <tr key={i}>
                                                <td className="px-4 py-3">
                                                    <input value={item.description} onChange={e => updateItem(i, 'description', e.target.value)}
                                                        className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all" />
                                                </td>
                                                <td className="px-3 py-3">
                                                    <input type="number" min="0" step="0.01" value={item.quantity}
                                                        onChange={e => updateItem(i, 'quantity', e.target.value)}
                                                        className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 text-center transition-all" />
                                                </td>
                                                <td className="px-3 py-3">
                                                    <div className="relative">
                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold">{currency === 'INR' ? '₹' : currency}</span>
                                                        <input type="number" min="0" step="0.01" value={item.rate}
                                                            onChange={e => updateItem(i, 'rate', e.target.value)}
                                                            className="w-full pl-7 pr-3 py-2 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all" />
                                                    </div>
                                                </td>
                                                <td className="px-3 py-3 text-right"><span className="font-semibold text-slate-700 text-sm">{fmt(item.amount)}</span></td>
                                                <td className="px-3 py-3">
                                                    {items.length > 1 && (
                                                        <button type="button" onClick={() => removeItem(i)}
                                                            className="p-1.5 rounded-lg text-slate-300 hover:text-red-400 hover:bg-red-50 transition-all">
                                                            <Trash2 size={14} />
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-5 border-t border-slate-100 flex items-start justify-between gap-4">
                                <button type="button" onClick={addItem}
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors">
                                    <Plus size={16} /> Add Line Item
                                </button>
                                <div className="space-y-1.5 text-sm min-w-[220px]">
                                    <div className="flex justify-between text-slate-600"><span>Subtotal</span><span className="font-semibold">{fmt(subtotal)}</span></div>
                                    <div className="flex justify-between text-slate-600"><span>Tax ({taxRate || 0}%)</span><span className="font-semibold">{fmt(taxAmt)}</span></div>
                                    {discountAmount > 0 && <div className="flex justify-between text-emerald-600"><span>Discount</span><span className="font-semibold">-{fmt(Number(discountAmount))}</span></div>}
                                    <div className="flex justify-between font-bold text-slate-900 text-base pt-2 border-t border-slate-200"><span>Total</span><span>{fmt(total)}</span></div>
                                </div>
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3">
                            <h2 className="font-bold text-slate-800">Notes</h2>
                            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3}
                                className={`${FIELD} resize-none`} placeholder="Payment terms, bank details…" />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                            <h2 className="font-bold text-slate-800">Invoice Settings</h2>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
                                <select value={status} onChange={e => setStatus(e.target.value)} className={FIELD}>
                                    <option value="draft">Draft</option>
                                    <option value="sent">Sent</option>
                                    <option value="paid">Paid</option>
                                    <option value="overdue">Overdue</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Currency</label>
                                <select value={currency} onChange={e => setCurrency(e.target.value)} className={FIELD}>
                                    {CURRENCIES.map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5"><Calendar size={12} className="inline mr-1" />Issue Date</label>
                                <input type="date" value={issueDate} onChange={e => setIssueDate(e.target.value)} className={FIELD} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5"><Calendar size={12} className="inline mr-1" />Due Date</label>
                                <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className={FIELD} />
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                            <h2 className="font-bold text-slate-800 flex items-center gap-2"><IndianRupee size={16} className="text-orange-500" />Tax & Discount</h2>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Tax Rate (%)</label>
                                <input type="number" min="0" max="100" step="0.01" value={taxRate} onChange={e => setTaxRate(e.target.value)} className={FIELD} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Discount Amount</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">₹</span>
                                    <input type="number" min="0" step="0.01" value={discountAmount} onChange={e => setDiscountAmount(e.target.value)} className={`${FIELD} pl-7`} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                            <h2 className="font-bold text-slate-800">Payment Method</h2>
                            <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} className={FIELD}>
                                {PAYMENT_METHODS.map(m => <option key={m} value={m}>{m || 'Select method'}</option>)}
                            </select>
                        </div>

                        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg shadow-orange-500/20">
                            <p className="text-sm font-semibold text-white/80 mb-1">Grand Total</p>
                            <p className="text-3xl font-bold">{fmt(total)}</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button type="submit" disabled={loading}
                                className="w-full inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-orange-500/20 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed">
                                {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={18} />}
                                {loading ? 'Saving…' : 'Save Changes'}
                            </button>
                            <Link href={`/admin/invoices/${id}`} className="text-center text-sm text-slate-500 hover:text-slate-700 font-medium transition-colors">Cancel</Link>
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}

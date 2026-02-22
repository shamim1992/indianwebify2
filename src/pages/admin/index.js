import React, { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from '../../components/admin/AdminLayout';
import {
    FileText, TrendingUp, TrendingDown, IndianRupee, Briefcase, Server, Bell, ArrowUpRight, RefreshCw
} from 'lucide-react';
import { fetchInvoiceStats, fetchInvoices } from '../../redux/actions/invoiceActions';
import { fetchProjects } from '../../redux/actions/projectActions';
import { fetchServices } from '../../redux/actions/serviceActions';

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatINR(amount) {
    if (!amount && amount !== 0) return '—';
    return new Intl.NumberFormat('en-IN', {
        style: 'currency', currency: 'INR', maximumFractionDigits: 0,
    }).format(amount);
}

function timeAgo(dateStr) {
    if (!dateStr) return '';
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins} min ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
}

const STATUS_MAP = {
    paid: { label: 'Paid', cls: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    sent: { label: 'Sent', cls: 'bg-blue-50 text-blue-600 border-blue-100' },
    draft: { label: 'Draft', cls: 'bg-slate-50 text-slate-600 border-slate-200' },
    overdue: { label: 'Overdue', cls: 'bg-red-50 text-red-600 border-red-100' },
    cancelled: { label: 'Cancelled', cls: 'bg-amber-50 text-amber-600 border-amber-100' },
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// ─── Skeleton ────────────────────────────────────────────────────────────────

function Skeleton({ className = '' }) {
    return <div className={`animate-pulse bg-slate-200 rounded-lg ${className}`} />;
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ title, value, trend, isPositive, icon: Icon, colorCls, loading }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorCls}`}>
                    <Icon size={24} strokeWidth={2.5} />
                </div>
                {trend != null && (
                    <div className={`flex items-center gap-1 text-sm font-bold px-2.5 py-1 rounded-full ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                        {isPositive ? <TrendingUp size={14} strokeWidth={3} /> : <TrendingDown size={14} strokeWidth={3} />}
                        {trend}
                    </div>
                )}
            </div>
            <div>
                <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
                {loading
                    ? <Skeleton className="h-8 w-28 mt-1" />
                    : <p className="text-2xl xl:text-3xl font-bold text-slate-900">{value}</p>
                }
            </div>
        </div>
    );
}

// ─── Main ────────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
    const dispatch = useDispatch();

    const { stats, invoices, statsLoading, loading: invoiceLoading } = useSelector(s => s.invoice);
    const { total: projectTotal, loading: projectLoading } = useSelector(s => s.project);
    const { total: serviceTotal, loading: serviceLoading } = useSelector(s => s.service);

    const [selectedYear, setSelectedYear] = React.useState(new Date().getFullYear());

    // Fetch everything on mount
    useEffect(() => {
        dispatch(fetchInvoiceStats());
        dispatch(fetchInvoices({ limit: 8 }));     // recent activity
        dispatch(fetchProjects({ limit: 1 }));     // just need the total
        dispatch(fetchServices({ limit: 1 }));     // just need the total
    }, [dispatch]);

    // Build monthly bar chart data from paid invoices
    const { chartData, monthlyAmounts } = useMemo(() => {
        const monthly = new Array(12).fill(0);
        (invoices || []).forEach(inv => {
            if (inv.status === 'paid' && inv.paidDate) {
                const d = new Date(inv.paidDate);
                if (d.getFullYear() === selectedYear) {
                    monthly[d.getMonth()] += inv.total || 0;
                }
            }
        });
        const max = Math.max(...monthly, 1);
        return {
            chartData: monthly.map(v => Math.round((v / max) * 100)),
            monthlyAmounts: monthly,
        };
    }, [invoices, selectedYear]);

    const statsLoaded = !statsLoading;

    const statCards = [
        {
            title: 'Total Revenue',
            value: formatINR(stats?.totalRevenue),
            trend: null,
            isPositive: true,
            icon: IndianRupee,
            colorCls: 'bg-orange-50 text-orange-600',
        },
        {
            title: 'Pending Amount',
            value: formatINR(stats?.pendingAmount),
            trend: stats?.sentCount != null ? `${stats.sentCount} invoice${stats.sentCount !== 1 ? 's' : ''}` : null,
            isPositive: true,
            icon: FileText,
            colorCls: 'bg-blue-50 text-blue-600',
        },
        {
            title: 'Active Projects',
            value: projectLoading ? null : String(projectTotal ?? 0),
            trend: null,
            isPositive: true,
            icon: Briefcase,
            colorCls: 'bg-violet-50 text-violet-600',
        },
        {
            title: 'Total Services',
            value: serviceLoading ? null : String(serviceTotal ?? 0),
            trend: null,
            isPositive: true,
            icon: Server,
            colorCls: 'bg-emerald-50 text-emerald-600',
        },
    ];

    const availableYears = [new Date().getFullYear(), new Date().getFullYear() - 1];

    const handleRefresh = () => {
        dispatch(fetchInvoiceStats());
        dispatch(fetchInvoices({ limit: 8 }));
        dispatch(fetchProjects({ limit: 1 }));
        dispatch(fetchServices({ limit: 1 }));
    };

    return (
        <AdminLayout>
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">Dashboard Overview</h1>
                    <p className="text-slate-500 mt-1">Here&apos;s what&apos;s happening with your IT solutions today.</p>
                </div>
                <button
                    onClick={handleRefresh}
                    className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-orange-500/20 active:scale-95 whitespace-nowrap"
                >
                    <RefreshCw size={18} />
                    Refresh
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 text-left">
                {statCards.map((stat, index) => (
                    <StatCard
                        key={index}
                        {...stat}
                        loading={statsLoading || (index === 2 && projectLoading) || (index === 3 && serviceLoading)}
                    />
                ))}
            </div>

            {/* Main Area: Chart & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 min-h-[400px]">

                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">Revenue Analytics</h2>
                            <p className="text-sm text-slate-500">Monthly paid revenue overview</p>
                        </div>
                        <select
                            value={selectedYear}
                            onChange={e => setSelectedYear(Number(e.target.value))}
                            className="bg-slate-50 border border-slate-200 text-slate-700 font-medium text-sm rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 block p-2.5 outline-none cursor-pointer"
                        >
                            {availableYears.map(y => (
                                <option key={y} value={y}>Year {y}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1 flex flex-col justify-end bg-gradient-to-b from-slate-50/30 to-slate-50/80 rounded-xl border border-slate-100 p-4 min-h-[250px] relative">
                        {invoiceLoading ? (
                            <div className="flex items-end justify-between gap-1.5 sm:gap-2 md:gap-4 h-full w-full pt-10">
                                {MONTHS.map((_, i) => (
                                    <div key={i} className="w-full flex flex-col items-center gap-3 h-full justify-end">
                                        <div className="w-full bg-slate-200 rounded-t-md animate-pulse" style={{ height: `${30 + Math.random() * 40}%` }} />
                                        <span className="text-[10px] sm:text-xs text-slate-400 font-semibold uppercase tracking-wider">{MONTHS[i]}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex items-end justify-between gap-1.5 sm:gap-2 md:gap-4 h-full w-full pt-10">
                                {chartData.map((height, i) => (
                                    <div key={i} className="w-full flex flex-col items-center gap-3 group h-full justify-end">
                                        <div className="w-full relative bg-slate-200 rounded-t-md rounded-b-[2px] overflow-hidden h-full max-h-[100%]">
                                            <div
                                                className="absolute bottom-0 w-full bg-gradient-to-t from-orange-600 to-orange-400 rounded-t-[4px] transition-all duration-700 group-hover:from-orange-500 group-hover:to-orange-300"
                                                style={{ height: `${height}%` }}
                                                title={`${MONTHS[i]}: ${formatINR(monthlyAmounts[i])}`}
                                            />
                                        </div>
                                        <span className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider">{MONTHS[i]}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Invoices as Activity */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white z-10">
                        <h2 className="text-lg font-bold text-slate-900">Recent Invoices</h2>
                        <Link
                            href="/admin/invoices"
                            className="text-orange-500 hover:text-orange-600 text-sm font-bold flex items-center gap-1 transition-colors group"
                        >
                            View all <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                    <div className="p-6 flex-1 overflow-y-auto">
                        {invoiceLoading ? (
                            <div className="space-y-6">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="flex gap-4">
                                        <Skeleton className="w-10 h-10 rounded-full flex-none" />
                                        <div className="flex-1 space-y-2 pt-1">
                                            <Skeleton className="h-3 w-3/4" />
                                            <Skeleton className="h-3 w-1/2" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : invoices && invoices.length > 0 ? (
                            <div className="space-y-6">
                                {invoices.slice(0, 6).map((inv, index) => {
                                    const statusInfo = STATUS_MAP[inv.status] || { label: inv.status, cls: 'bg-slate-50 text-slate-600 border-slate-200' };
                                    return (
                                        <div key={inv._id} className="flex gap-4 relative group">
                                            {index !== Math.min(invoices.length, 6) - 1 && (
                                                <div className="absolute left-5 top-10 bottom-[-24px] w-px bg-slate-200 group-hover:bg-orange-200 transition-colors" />
                                            )}
                                            <div className="flex-none w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center z-10 transition-transform group-hover:scale-110 group-hover:border-orange-200">
                                                <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-sm shadow-orange-500/50" />
                                            </div>
                                            <div className="pt-0.5 min-w-0">
                                                <p className="text-sm text-slate-600 leading-snug truncate">
                                                    <span className="font-bold text-slate-900">{inv.clientName}</span>
                                                    {' — '}{inv.invoiceNumber}
                                                </p>
                                                <p className="text-sm font-semibold text-slate-800 mt-0.5">{formatINR(inv.total)}</p>
                                                <div className="flex items-center gap-3 mt-1.5 text-xs">
                                                    <span className="text-slate-400 font-medium flex items-center gap-1">
                                                        <Bell size={10} /> {timeAgo(inv.createdAt)}
                                                    </span>
                                                    <span className={`px-2 py-0.5 rounded-md font-bold uppercase tracking-wide text-[10px] border ${statusInfo.cls}`}>
                                                        {statusInfo.label}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center py-12">
                                <FileText size={40} className="text-slate-300 mb-3" />
                                <p className="text-slate-500 font-medium">No invoices yet</p>
                                <p className="text-slate-400 text-sm mt-1">Create your first invoice to see activity here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

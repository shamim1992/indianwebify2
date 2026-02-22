import React, { useEffect } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { fetchServiceById } from '../../../redux/actions/serviceActions';
import {
    ArrowLeft, Pencil, Server, Star, CheckCircle2, XCircle, Clock,
    IndianRupee, Code2, CheckSquare, Tag, Zap
} from 'lucide-react';

const STATUS_CONFIG = {
    'active': { label: 'Active', classes: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
    'inactive': { label: 'Inactive', classes: 'bg-slate-100 text-slate-600', icon: XCircle },
    'coming-soon': { label: 'Coming Soon', classes: 'bg-violet-100 text-violet-700', icon: Clock },
};

const PRICING_LABELS = { fixed: 'Fixed Price', hourly: 'Hourly Rate', monthly: 'Monthly Retainer', custom: 'Custom Quote' };

export default function ServiceDetail() {
    const router = useRouter();
    const { id } = router.query;
    const dispatch = useDispatch();
    const { currentService: svc, loading } = useSelector(s => s.service);

    useEffect(() => { if (id) dispatch(fetchServiceById(id)); }, [id, dispatch]);

    if (loading || !svc) {
        return <AdminLayout><div className="flex items-center justify-center py-32"><div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-orange-500 animate-spin" /></div></AdminLayout>;
    }

    const statusInfo = STATUS_CONFIG[svc.status] || STATUS_CONFIG['active'];
    const StatusIcon = statusInfo.icon;
    const fmt = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) : '—';

    return (
        <AdminLayout>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Link href="/admin/services" className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-orange-500 hover:border-orange-300 transition-all bg-white">
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                            {svc.icon && <span className="text-2xl">{svc.icon}</span>}
                            {svc.title}
                            {svc.featured && <Star size={16} className="text-amber-400 fill-amber-400" />}
                        </h1>
                        {svc.shortDescription && <p className="text-slate-500 text-sm mt-0.5">{svc.shortDescription}</p>}
                    </div>
                </div>
                <Link href={`/admin/services/edit/${id}`}
                    className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-orange-500/20 active:scale-95 whitespace-nowrap">
                    <Pencil size={16} /> Edit Service
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Cover Image */}
                    {svc.coverImage && (
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <img src={svc.coverImage} alt={svc.title} className="w-full h-56 object-cover" />
                        </div>
                    )}

                    {/* Description */}
                    {svc.description && (
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                            <h2 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Server size={16} className="text-orange-500" /> About this Service
                            </h2>
                            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{svc.description}</p>
                        </div>
                    )}

                    {/* Features */}
                    {svc.features?.length > 0 && (
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                            <h2 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <CheckSquare size={16} className="text-orange-500" /> What&apos;s Included
                            </h2>
                            <ul className="space-y-2.5">
                                {svc.features.map((f, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                                            <CheckCircle2 size={12} className="text-emerald-600" />
                                        </div>
                                        <span className="text-sm text-slate-700">{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Technologies */}
                    {svc.technologies?.length > 0 && (
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                            <h2 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Code2 size={16} className="text-orange-500" /> Technologies Used
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {svc.technologies.map(t => (
                                    <span key={t} className="inline-flex items-center bg-orange-50 text-orange-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-orange-100">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Service Details */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
                        <h2 className="font-bold text-slate-800">Service Details</h2>

                        <div className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-lg ${statusInfo.classes}`}>
                            <StatusIcon size={14} /> {statusInfo.label}
                        </div>

                        <div className="space-y-3 text-sm">
                            {svc.category && (
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                                        <Tag size={14} className="text-slate-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-medium">Category</p>
                                        <p className="text-slate-800 font-semibold">{svc.category}</p>
                                    </div>
                                </div>
                            )}
                            {(svc.startingPrice || svc.pricingModel !== 'custom') && (
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                                        <IndianRupee size={14} className="text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-medium">Pricing</p>
                                        <p className="text-slate-800 font-semibold">{svc.startingPrice || PRICING_LABELS[svc.pricingModel]}</p>
                                    </div>
                                </div>
                            )}
                            {svc.deliveryTime && (
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                                        <Clock size={14} className="text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-medium">Delivery</p>
                                        <p className="text-slate-800 font-semibold">{svc.deliveryTime}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="pt-3 border-t border-slate-100 text-xs text-slate-400 space-y-1">
                            <p>Created: {fmt(svc.createdAt)}</p>
                            <p>Updated: {fmt(svc.updatedAt)}</p>
                            {svc.author?.name && <p>By: <span className="font-medium text-slate-600">{svc.author.name}</span></p>}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3">
                        <h2 className="font-bold text-slate-800">Quick Actions</h2>
                        <Link href={`/admin/services/edit/${id}`}
                            className="flex items-center gap-2 w-full text-sm font-medium text-slate-700 hover:text-orange-600 hover:bg-orange-50 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-orange-200 transition-all">
                            <Pencil size={14} className="text-orange-500" /> Edit Service
                        </Link>
                        <Link href="/admin/services"
                            className="flex items-center gap-2 w-full text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 transition-all">
                            <Server size={14} className="text-slate-400" /> All Services
                        </Link>
                        <Link href="/admin/services/create"
                            className="flex items-center gap-2 w-full text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 transition-all">
                            <Zap size={14} className="text-slate-400" /> New Service
                        </Link>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

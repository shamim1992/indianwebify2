import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import {
    FileText, TrendingUp, TrendingDown, IndianRupee, Users, Briefcase, Server, Bell, ArrowUpRight
} from 'lucide-react';

export default function AdminDashboard() {
    const stats = [
        { title: 'Total Revenue', value: '₹12,45,000', trend: '+15.2%', isPositive: true, icon: IndianRupee },
        { title: 'Active Clients', value: '184', trend: '+5.4%', isPositive: true, icon: Users },
        { title: 'Ongoing Projects', value: '28', trend: '-1.2%', isPositive: false, icon: Briefcase },
        { title: 'Server Uptime', value: '99.98%', trend: '+0.02%', isPositive: true, icon: Server },
    ];

    const recentActivity = [
        { user: 'TechFlow Inc.', action: 'approved the new CMS project proposal', time: '10 mins ago', status: 'Approved' },
        { user: 'Rahul Sharma', action: 'deployed v2.4.0 to production servers', time: '1 hour ago', status: 'Completed' },
        { user: 'GlobalMart', action: 'reported an issue with payment gateway API', time: '2 hours ago', status: 'Pending' },
        { user: 'Priya Singh', action: 'completed the quarterly security audit', time: 'Yesterday', status: 'Resolved' },
    ];

    return (
        <AdminLayout>
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">Dashboard Overview</h1>
                    <p className="text-slate-500 mt-1">Here's what's happening with your IT solutions today.</p>
                </div>
                <button className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-orange-500/20 active:scale-95 whitespace-nowrap">
                    <FileText size={18} />
                    Generate Report
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 text-left">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm ${stat.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                                    } ${index === 0 ? 'bg-orange-50 text-orange-600' : ''} ${index === 1 ? 'bg-blue-50 text-blue-600' : ''} ${index === 3 ? 'bg-violet-50 text-violet-600' : ''}`}>
                                    <Icon size={24} strokeWidth={2.5} />
                                </div>
                                <div className={`flex items-center gap-1 text-sm font-bold px-2.5 py-1 rounded-full ${stat.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                                    }`}>
                                    {stat.isPositive ? <TrendingUp size={14} strokeWidth={3} /> : <TrendingDown size={14} strokeWidth={3} />}
                                    {stat.trend}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-slate-500 text-sm font-medium mb-1">{stat.title}</h3>
                                <p className="text-2xl xl:text-3xl font-bold text-slate-900">{stat.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Main Area: Charts & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 min-h-[400px]">
                {/* Chart Placeholder */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">Revenue Analytics</h2>
                            <p className="text-sm text-slate-500">Monthly revenue overview for the current year</p>
                        </div>
                        <select className="bg-slate-50 border border-slate-200 text-slate-700 font-medium text-sm rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 block p-2.5 outline-none cursor-pointer">
                            <option>Year 2026</option>
                            <option>Year 2025</option>
                        </select>
                    </div>

                    <div className="flex-1 flex flex-col justify-end bg-gradient-to-b from-slate-50/30 to-slate-50/80 rounded-xl border border-slate-100 p-4 min-h-[250px] relative">
                        {/* Decorative Chart Bars */}
                        <div className="flex items-end justify-between gap-1.5 sm:gap-2 md:gap-4 h-full w-full pt-10">
                            {[45, 60, 35, 75, 50, 85, 40, 65, 90, 55, 70, 80].map((height, i) => (
                                <div key={i} className="w-full flex flex-col items-center gap-3 group h-full justify-end">
                                    <div className="w-full relative bg-slate-200 rounded-t-md rounded-b-[2px] overflow-hidden h-full max-h-[100%]">
                                        <div
                                            className="absolute bottom-0 w-full bg-gradient-to-t from-orange-600 to-orange-400 rounded-t-[4px] transition-all duration-500 group-hover:from-orange-500 group-hover:to-orange-300"
                                            style={{ height: `${height}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider">
                                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white z-10">
                        <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
                        <button className="text-orange-500 hover:text-orange-600 text-sm font-bold flex items-center gap-1 transition-colors group">
                            View all <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </button>
                    </div>
                    <div className="p-6 flex-1 overflow-y-auto">
                        <div className="space-y-6">
                            {recentActivity.map((activity, index) => (
                                <div key={index} className="flex gap-4 relative group">
                                    {index !== recentActivity.length - 1 && (
                                        <div className="absolute left-5 top-10 bottom-[-24px] w-px bg-slate-200 group-hover:bg-orange-200 transition-colors"></div>
                                    )}
                                    <div className="flex-none w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center z-10 transition-transform group-hover:scale-110 group-hover:border-orange-200">
                                        <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-sm shadow-orange-500/50"></div>
                                    </div>
                                    <div className="pt-0.5">
                                        <p className="text-sm text-slate-600 leading-snug">
                                            <span className="font-bold text-slate-900">{activity.user}</span> {activity.action}
                                        </p>
                                        <div className="flex items-center gap-3 mt-2 text-xs">
                                            <span className="text-slate-400 font-medium flex items-center gap-1">
                                                <Bell size={10} /> {activity.time}
                                            </span>
                                            <span className={`px-2 py-0.5 rounded-md font-bold uppercase tracking-wide text-[10px] ${activity.status === 'Completed' || activity.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                                    activity.status === 'Pending' || activity.status === 'Approved' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                                        'bg-red-50 text-red-600 border border-red-100'
                                                }`}>
                                                {activity.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

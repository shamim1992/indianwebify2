import React from 'react';
import { Menu, Search, Bell, Settings } from 'lucide-react';

export default function Header({ setIsSidebarOpen }) {
    return (
        <header className="h-16 flex items-center justify-between px-4 md:px-8 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 shrink-0">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                >
                    <Menu size={20} />
                </button>
                <div className="relative hidden md:block w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search anything..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium text-slate-700 placeholder:text-slate-400"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3 md:gap-4">
                <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors hidden sm:block">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-[2px] border-white"></span>
                </button>
                <div className="h-8 w-px bg-slate-200 hidden md:block"></div>
                <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                    <span className="hidden md:inline-block">Settings</span>
                    <Settings size={18} className="text-slate-400 md:hidden" />
                </button>
            </div>
        </header>
    );
}

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    LayoutDashboard, Users, FileText, Settings, Activity,
    Briefcase, X, Server, LogOut, BookOpen, Tag, List,
    PlusCircle, ChevronDown, BarChart2, IndianRupee, Zap, LayoutGrid
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { logout } from '../../redux/slices/authSlice';

// ── Nav structure ─────────────────────────────────────────────────────────────
// A "group" has children that expand accordion-style.
// A "link" is a standalone item.
const NAV = [
    {
        type: 'link',
        name: 'Dashboard',
        icon: LayoutDashboard,
        href: '/admin',
        exact: true,
    },
    {
        type: 'link',
        name: 'Clients',
        icon: Users,
        href: '/admin/clients',
    },
    {
        type: 'group',
        name: 'Projects',
        icon: Briefcase,
        basePath: '/admin/project',
        children: [
            { name: 'All Projects', icon: List, href: '/admin/project' },
            { name: 'New Project', icon: PlusCircle, href: '/admin/project/create' },
        ],
    },
    {
        type: 'group',
        name: 'Portfolio',
        icon: LayoutGrid,
        basePath: '/admin/portfolio',
        children: [
            { name: 'All Items', icon: List, href: '/admin/portfolio' },
            { name: 'Add New', icon: PlusCircle, href: '/admin/portfolio/create' },
        ],
    },
    {
        type: 'group',
        name: 'Services',
        icon: Server,
        basePath: '/admin/services',
        children: [
            { name: 'All Services', icon: List, href: '/admin/services' },
            { name: 'New Service', icon: PlusCircle, href: '/admin/services/create' },
        ],
    },
    {
        type: 'group',
        name: 'Blog',
        icon: BookOpen,
        basePath: '/admin/blog',
        children: [
            { name: 'All Posts', icon: FileText, href: '/admin/blog' },
            { name: 'New Post', icon: PlusCircle, href: '/admin/blog/create' },
            { name: 'Categories', icon: Tag, href: '/admin/blog/categories' },
        ],
    },
    {
        type: 'group',
        name: 'Invoices',
        icon: IndianRupee,
        basePath: '/admin/invoices',
        children: [
            { name: 'All Invoices', icon: List, href: '/admin/invoices' },
            { name: 'New Invoice', icon: PlusCircle, href: '/admin/invoices/create' },
        ],
    },
    {
        type: 'link',
        name: 'Analytics',
        icon: BarChart2,
        href: '/admin/analytics',
    },
    {
        type: 'link',
        name: 'Settings',
        icon: Settings,
        href: '/admin/settings',
    },
];

// ── AccordionGroup ─────────────────────────────────────────────────────────────
function AccordionGroup({ group, router }) {
    const isGroupActive = router.pathname.startsWith(group.basePath);
    const [open, setOpen] = useState(isGroupActive);

    // Auto-open when navigating into this section
    useEffect(() => {
        if (isGroupActive) setOpen(true);
    }, [isGroupActive]);

    const Icon = group.icon;

    return (
        <div className="overflow-hidden">
            {/* Group header button */}
            <button
                onClick={() => setOpen(o => !o)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isGroupActive
                    ? 'bg-orange-50 text-orange-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
            >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${isGroupActive ? 'bg-orange-100' : 'bg-slate-100 group-hover:bg-slate-200'
                    }`}>
                    <Icon size={16} className={isGroupActive ? 'text-orange-500' : 'text-slate-500'} />
                </div>
                <span className="flex-1 text-left">{group.name}</span>
                <ChevronDown
                    size={15}
                    className={`text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Animated children */}
            <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: open ? `${group.children.length * 52}px` : '0px' }}
            >
                <div className="ml-5 mt-0.5 mb-1 pl-3 border-l-2 border-slate-100 space-y-0.5">
                    {group.children.map((child) => {
                        const ChildIcon = child.icon;
                        // "All" list links match only when NOT on a deeper route like /create or /edit
                        const isChildList = child.href === group.basePath;
                        let childActive;
                        if (isChildList) {
                            childActive =
                                router.pathname === child.href ||
                                (router.pathname.startsWith(group.basePath) &&
                                    !router.pathname.startsWith(`${group.basePath}/create`) &&
                                    !router.pathname.startsWith(`${group.basePath}/edit`) &&
                                    router.pathname !== child.href
                                    ? router.pathname.startsWith(group.basePath) &&
                                    !router.pathname.includes('/create') &&
                                    !router.pathname.includes('/edit')
                                    : router.pathname === child.href);
                        } else {
                            childActive = router.pathname.startsWith(child.href);
                        }

                        return (
                            <Link
                                key={child.href}
                                href={child.href}
                                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${childActive
                                    ? 'bg-orange-50 text-orange-600'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                                    }`}
                            >
                                <ChildIcon
                                    size={13}
                                    className={childActive ? 'text-orange-500' : 'text-slate-400'}
                                />
                                <span>{child.name}</span>
                                {childActive && (
                                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-400" />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

// ── StandaloneLink ─────────────────────────────────────────────────────────────
function StandaloneLink({ item, router }) {
    const Icon = item.icon;
    const isActive = item.exact
        ? router.pathname === item.href
        : router.pathname === item.href || (item.href !== '/admin' && router.pathname.startsWith(item.href));

    return (
        <Link
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                ? 'bg-orange-50 text-orange-600'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
        >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${isActive ? 'bg-orange-100' : 'bg-slate-100'
                }`}>
                <Icon size={16} className={isActive ? 'text-orange-500' : 'text-slate-500'} />
            </div>
            <span className="flex-1">{item.name}</span>
            {isActive && <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />}
        </Link>
    );
}

// ── Sidebar ────────────────────────────────────────────────────────────────────
export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        router.push('/auth/login');
    };

    return (
        <>
            {/* Mobile backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <aside
                className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-5 border-b border-slate-100 shrink-0">
                    <Link href="/admin" className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-orange-500/30">
                            I
                        </div>
                        <span className="text-lg font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-400">
                            IndianWebify
                        </span>
                    </Link>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Nav */}
                <div className="flex-1 overflow-y-auto py-5 px-3 space-y-0.5">
                    <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                        Main Menu
                    </p>

                    {NAV.map((item) =>
                        item.type === 'group' ? (
                            <AccordionGroup key={item.name} group={item} router={router} />
                        ) : (
                            <StandaloneLink key={item.name} item={item} router={router} />
                        )
                    )}
                </div>

                {/* User footer */}
                <div className="p-4 border-t border-slate-100 shrink-0">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/60 hover:bg-slate-100 transition-colors">
                        <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 ring-2 ring-orange-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Admin')}&background=f97316&color=fff&bold=true`}
                                alt="Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate">{user?.name || 'Admin User'}</p>
                            <p className="text-xs text-slate-500 truncate">{user?.email || 'admin@indianwebify.com'}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            title="Logout"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all shrink-0"
                        >
                            <LogOut size={16} />
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}

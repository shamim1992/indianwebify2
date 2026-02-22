import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AdminLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);

    const router = useRouter();
    const { token, loading, user } = useSelector((state) => state.auth);

    useEffect(() => {
        // Basic authentication validation
        if (!loading) {
            if (!token) {
                router.push('/auth/login'); // Redirect to login if not authenticated
            } else if (user && user.role !== 'admin') {
                router.push('/'); // Redirect non-admins elsewhere (like home)
            } else {
                setIsAuthorized(true);
            }
        }
    }, [token, loading, user, router]);

    // Prevent rendering the dashboard layout until authorization check passes
    if (!isAuthorized) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-slate-50">
                <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-orange-500 animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar Component */}
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Header Component */}
                <Header setIsSidebarOpen={setIsSidebarOpen} />

                {/* Dynamic Page Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin scrollbar-thumb-slate-200">
                    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

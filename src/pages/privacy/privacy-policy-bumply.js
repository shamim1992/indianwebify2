import React, { useState, useEffect } from 'react';
import Navbar from '@/components/header/Navbar';
import FooterSection from '@/components/footer/FooterSection';
import SEO from '@/components/SEO';
import {
    Shield,
    ShieldCheck,
    Lock,
    Eye,
    Heart,
    Baby,
    Activity,
    FileText,
    CheckCircle2,
    Calendar,
    Bell,
    Database,
    Sparkles,
    Trash2,
    UserCheck,
    AlertTriangle,
    Mail,
    Copy,
    Check,
    ExternalLink,
    Printer,
    Search,
    ChevronRight,
    Info,
    Smartphone,
    Cloud,
    Clock,
    Pill,
    HeartPulse,
    ListTodo,
    Share2
} from 'lucide-react';

const TOC_ITEMS = [
    { id: 'section-1', title: '1. Introduction' },
    { id: 'section-2', title: '2. Information We Collect' },
    { id: 'section-3', title: '3. How We Use Information' },
    { id: 'section-4', title: '4. Storage & Protection' },
    { id: 'section-5', title: '5. Third-Party Providers' },
    { id: 'section-6', title: '6. Retention & Deletion' },
    { id: 'section-7', title: '7. User Rights (GDPR/CCPA)' },
    { id: 'section-8', title: '8. Children’s Privacy' },
    { id: 'section-9', title: '9. Medical Disclaimer' },
    { id: 'section-10', title: '10. Changes to Policy' },
    { id: 'section-11', title: '11. Contact Us' },
];

const THIRD_PARTY_SERVICES = [
    {
        name: 'Google Firebase',
        entity: 'Google LLC',
        purpose: 'Authentication & Cloud Firestore Database',
        policyUrl: 'https://firebase.google.com/support/privacy'
    },
    {
        name: 'Google Sign-In',
        entity: 'Google LLC',
        purpose: 'Secure user authentication',
        policyUrl: 'https://policies.google.com/privacy'
    },
    {
        name: 'OneSignal, Inc.',
        entity: 'OneSignal, Inc.',
        purpose: 'Push notification delivery for reminders',
        policyUrl: 'https://onesignal.com/privacy_policy'
    },
    {
        name: 'Google Gemini API (Optional)',
        entity: 'Google Cloud AI',
        purpose: 'Generating generalized educational learning summaries',
        policyUrl: 'https://cloud.google.com/terms/cloud-privacy-notice'
    }
];

const HIGHLIGHTS = [
    {
        icon: <Database className="w-6 h-6 text-[#e6961d]" />,
        title: 'Local-First Architecture',
        desc: 'All health and tracking data is stored on your device by default via AsyncStorage. Cloud sync is 100% optional.'
    },
    {
        icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
        title: 'No Data Broker Selling',
        desc: 'We never sell, rent, or trade your personal or health data to data brokers, advertisers, or any third parties.'
    },
    {
        icon: <Lock className="w-6 h-6 text-[#6d123f]" />,
        title: 'Encrypted Cloud Sync',
        desc: 'For registered accounts, records are protected with industry-standard TLS in transit and encrypted at rest with Firebase.'
    },
    {
        icon: <UserCheck className="w-6 h-6 text-amber-500" />,
        title: 'Total Data Ownership',
        desc: 'Export records anytime, wipe local logs on demand, or request complete 30-day cloud deletion via email or settings.'
    }
];

export default function PrivacyPolicyBumply() {
    const [copiedText, setCopiedText] = useState(null);
    const [activeSection, setActiveSection] = useState('section-1');

    const copyToClipboard = (text, key) => {
        navigator.clipboard.writeText(text);
        setCopiedText(key);
        setTimeout(() => setCopiedText(null), 2500);
    };

    const handlePrint = () => {
        if (typeof window !== 'undefined') {
            window.print();
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200;
            for (const item of TOC_ITEMS) {
                const el = document.getElementById(item.id);
                if (el) {
                    const top = el.offsetTop;
                    const height = el.offsetHeight;
                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveSection(item.id);
                        break;
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <SEO
                title="Privacy Policy - Bumply · Pregnancy Tracker"
                description="Official Privacy Policy for Bumply · Pregnancy Tracker (com.bloom.pregnancytracker). Learn about our privacy-first architecture, local-first storage, health data protection, and user rights."
                keywords="Bumply privacy policy, pregnancy tracker privacy, health data protection, bloom pregnancy tracker, com.bloom.pregnancytracker, maternity tracker privacy"
                url="/privacy/privacy-policy-bumply"
                type="article"
                publishedTime="2026-10-27"
                modifiedTime="2026-10-27"
            />

            {/* Print Styles */}
            <style jsx global>{`
        @media print {
          header, footer, .no-print {
            display: none !important;
          }
          body {
            background: #ffffff !important;
            color: #000000 !important;
            font-size: 12pt !important;
          }
          .print-card {
            box-shadow: none !important;
            border: 1px solid #e5e7eb !important;
            padding: 0 !important;
          }
        }
      `}</style>

            <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-[#6d123f] selection:text-white">
                <Navbar />

                {/* Hero Header */}
                <section className="pt-32 pb-20 bg-gradient-to-br from-[#4a0d2b] via-[#6d123f] to-[#1e0728] text-white relative overflow-hidden">
                    {/* Subtle Ambient Decorative Elements */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#e6961d] opacity-15 blur-3xl"></div>
                        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-[#f43f5e] opacity-15 blur-3xl"></div>
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
                            {/* Pill badge */}
                            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-medium text-[#ffd082] mb-6 border border-white/15 shadow-sm">
                                <Baby className="w-4 h-4 text-[#e6961d]" />
                                <span>Bumply · Pregnancy Tracker</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                <span className="text-white/80">Privacy First</span>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
                                Privacy Policy for Bumply · Pregnancy Tracker
                            </h1>

                            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
                                Your pregnancy journey is sacred and personal. Here is our unwavering commitment to protecting your health and personal data.
                            </p>

                            {/* Quick Details Badges */}
                            <div className="flex flex-wrap justify-center items-center gap-3 text-xs md:text-sm text-white/80">
                                <div className="bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-lg border border-white/10 flex items-center space-x-2">
                                    <Calendar className="w-4 h-4 text-[#e6961d]" />
                                    <span><strong>Effective Date:</strong> October 27, 2026</span>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-lg border border-white/10 flex items-center space-x-2">
                                    <Clock className="w-4 h-4 text-[#e6961d]" />
                                    <span><strong>Last Updated:</strong> October 27, 2026</span>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-lg border border-white/10 flex items-center space-x-2">
                                    <Smartphone className="w-4 h-4 text-[#e6961d]" />
                                    <span><strong>Package:</strong> <code className="bg-black/30 px-1.5 py-0.5 rounded text-amber-200">com.bloom.pregnancytracker</code></span>
                                    <button
                                        onClick={() => copyToClipboard('com.bloom.pregnancytracker', 'pkg')}
                                        className="hover:text-white transition-colors"
                                        title="Copy Package ID"
                                        aria-label="Copy Package ID"
                                    >
                                        {copiedText === 'pkg' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-8 flex flex-wrap justify-center items-center gap-4 no-print">
                                <button
                                    onClick={handlePrint}
                                    className="inline-flex items-center space-x-2 bg-white text-[#6d123f] hover:bg-gray-100 font-semibold px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm"
                                >
                                    <Printer className="w-4 h-4 text-[#6d123f]" />
                                    <span>Print / Save as PDF</span>
                                </button>
                                <a
                                    href="mailto:privacy@bumplyapp.com?subject=Delete%20My%20Bumply%20Account"
                                    className="inline-flex items-center space-x-2 bg-white/15 hover:bg-white/25 text-white font-semibold px-5 py-2.5 rounded-xl border border-white/20 backdrop-blur-sm transition-all duration-200 text-sm"
                                >
                                    <Trash2 className="w-4 h-4 text-red-300" />
                                    <span>Data Deletion Request</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Highlights Section */}
                <section className="relative -mt-8 z-20 container mx-auto px-4 max-w-6xl no-print">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {HIGHLIGHTS.map((h, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="p-2.5 bg-gray-50 rounded-xl w-fit mb-3">{h.icon}</div>
                                    <h3 className="font-bold text-gray-900 text-base mb-1.5">{h.title}</h3>
                                    <p className="text-gray-600 text-xs leading-relaxed">{h.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Main Content Layout with Sticky Sidebar */}
                <section className="py-12 md:py-16 flex-grow">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                            {/* Sticky Sidebar (Desktop) */}
                            <aside className="hidden lg:block lg:col-span-3 sticky top-28 no-print">
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
                                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                                        <span className="font-bold text-gray-900 text-sm flex items-center space-x-2">
                                            <ListTodo className="w-4 h-4 text-[#6d123f]" />
                                            <span>Table of Contents</span>
                                        </span>
                                        <span className="text-xs text-gray-400">11 Sections</span>
                                    </div>

                                    <nav className="space-y-1">
                                        {TOC_ITEMS.map((item) => {
                                            const isActive = activeSection === item.id;
                                            return (
                                                <a
                                                    key={item.id}
                                                    href={`#${item.id}`}
                                                    className={`group flex items-center justify-between text-xs py-2 px-2.5 rounded-lg transition-all duration-200 ${isActive
                                                        ? 'bg-[#6d123f] text-white font-semibold shadow-sm'
                                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                        }`}
                                                >
                                                    <span className="truncate">{item.title}</span>
                                                    <ChevronRight className={`w-3 h-3 transition-transform ${isActive ? 'text-white' : 'text-gray-400 group-hover:translate-x-0.5'}`} />
                                                </a>
                                            );
                                        })}
                                    </nav>

                                    <div className="mt-6 pt-4 border-t border-gray-100">
                                        <div className="bg-amber-50 rounded-xl p-3 text-xs text-amber-900 border border-amber-100">
                                            <p className="font-semibold mb-1 flex items-center gap-1.5">
                                                <Mail className="w-3.5 h-3.5 text-[#e6961d]" /> Privacy Inquiries
                                            </p>
                                            <p className="text-amber-800">
                                                Questions about your maternal health data?
                                            </p>
                                            <a
                                                href="mailto:mhsdigitalhub@gmail.com"
                                                className="inline-block mt-2 font-medium text-[#6d123f] hover:underline"
                                            >
                                                mhsdigitalhub@gmail.com &rarr;
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </aside>

                            {/* Document Content */}
                            <main className="lg:col-span-9">
                                <article className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-12 print-card space-y-12 leading-relaxed text-gray-700">

                                    {/* Section 1: Introduction */}
                                    <section id="section-1" className="scroll-mt-28">
                                        <div className="flex items-center space-x-3 mb-4">
                                            <div className="p-2.5 rounded-xl bg-pink-50 text-[#6d123f]">
                                                <Heart className="w-6 h-6 text-[#6d123f]" />
                                            </div>
                                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">1. Introduction</h2>
                                        </div>

                                        <div className="space-y-4 text-gray-600 text-base">
                                            <p>
                                                Welcome to <strong>Bumply · Pregnancy Tracker</strong> (&ldquo;Bumply&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). We understand that pregnancy is an intimate, deeply personal journey. Protecting your personal and health-related information is our highest priority.
                                            </p>
                                            <p>
                                                This Privacy Policy explains how we collect, use, store, and safeguard your data when you use the Bumply mobile application (the &ldquo;App&rdquo;) across Android, iOS, and Web platforms.
                                            </p>
                                            <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-[#6d123f] text-gray-700 text-sm">
                                                By using Bumply, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree, please do not use the App.
                                            </div>
                                        </div>
                                    </section>

                                    <hr className="border-gray-100" />

                                    {/* Section 2: Information We Collect */}
                                    <section id="section-2" className="scroll-mt-28">
                                        <div className="flex items-center space-x-3 mb-4">
                                            <div className="p-2.5 rounded-xl bg-amber-50 text-[#e6961d]">
                                                <Database className="w-6 h-6 text-[#e6961d]" />
                                            </div>
                                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">2. Information We Collect</h2>
                                        </div>

                                        <p className="text-gray-600 mb-6">
                                            Bumply is designed with a <strong>privacy-first architecture</strong>. By default, all tracking records are stored locally on your device unless you choose to create an account for cloud backup.
                                        </p>

                                        {/* Subsection A */}
                                        <div className="mb-8">
                                            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center space-x-2">
                                                <span className="w-6 h-6 rounded-full bg-[#6d123f] text-white text-xs flex items-center justify-center font-bold">A</span>
                                                <span>Information You Provide Directly</span>
                                            </h3>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {/* Profile Info */}
                                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                                    <div className="flex items-center space-x-2 mb-2 font-semibold text-gray-900">
                                                        <Baby className="w-4 h-4 text-[#e6961d]" />
                                                        <h4>Profile Information</h4>
                                                    </div>
                                                    <p className="text-sm text-gray-600">
                                                        Your name/nickname, estimated due date, and your baby’s nickname.
                                                    </p>
                                                </div>

                                                {/* Health & Gestational Tracking Data */}
                                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 md:col-span-2">
                                                    <div className="flex items-center space-x-2 mb-2 font-semibold text-gray-900">
                                                        <HeartPulse className="w-4 h-4 text-rose-500" />
                                                        <h4>Health &amp; Gestational Tracking Data</h4>
                                                    </div>
                                                    <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-600">
                                                        <li>
                                                            <strong>Daily wellness logs:</strong> moods, pregnancy symptoms, notes, water intake.
                                                        </li>
                                                        <li>
                                                            <strong>Vital signs &amp; body measurements:</strong> maternal weight, resting blood pressure, sleep duration.
                                                        </li>
                                                        <li>
                                                            <strong>Clinical ultrasound logs:</strong> fetal weight and length records provided by your care team.
                                                        </li>
                                                        <li>
                                                            <strong>Medication &amp; prenatal supplement schedules:</strong> medicine names, dosages, scheduled times, stock levels, and adherence checkoffs.
                                                        </li>
                                                        <li>
                                                            <strong>Fetal kick session counts:</strong> kick counts and session durations.
                                                        </li>
                                                        <li>
                                                            <strong>Contraction timer logs:</strong> start times, durations, and intervals.
                                                        </li>
                                                    </ul>
                                                </div>

                                                {/* Planning & Personal Notes */}
                                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                                    <div className="flex items-center space-x-2 mb-2 font-semibold text-gray-900">
                                                        <ListTodo className="w-4 h-4 text-indigo-500" />
                                                        <h4>Planning &amp; Personal Notes</h4>
                                                    </div>
                                                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                                                        <li>Hospital bag checklist items.</li>
                                                        <li>Birth preferences and care-team questions.</li>
                                                        <li>Baby name shortlist and favorites.</li>
                                                        <li>Baby milestone dates and memory journal entries.</li>
                                                    </ul>
                                                </div>

                                                {/* Account Credentials (Optional) */}
                                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                                    <div className="flex items-center space-x-2 mb-2 font-semibold text-gray-900">
                                                        <Lock className="w-4 h-4 text-emerald-600" />
                                                        <h4>Account Credentials (Optional)</h4>
                                                    </div>
                                                    <p className="text-sm text-gray-600">
                                                        If you create an account to back up data across devices, we collect your email address and authentication credentials (via Firebase Authentication or Google Sign-In).
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Subsection B */}
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center space-x-2">
                                                <span className="w-6 h-6 rounded-full bg-[#6d123f] text-white text-xs flex items-center justify-center font-bold">B</span>
                                                <span>Information Collected Automatically</span>
                                            </h3>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                                    <div className="flex items-center space-x-2 mb-2 font-semibold text-gray-900">
                                                        <Smartphone className="w-4 h-4 text-blue-500" />
                                                        <h4>Device &amp; Usage Information</h4>
                                                    </div>
                                                    <p className="text-sm text-gray-600">
                                                        Basic non-identifying technical data such as your device model, operating system version, and general app performance diagnostics.
                                                    </p>
                                                </div>

                                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                                    <div className="flex items-center space-x-2 mb-2 font-semibold text-gray-900">
                                                        <Bell className="w-4 h-4 text-amber-500" />
                                                        <h4>Push Notification Tokens</h4>
                                                    </div>
                                                    <p className="text-sm text-gray-600">
                                                        When you grant notification permissions, a device push token is assigned to enable medication reminders and milestone notifications through our notification provider (OneSignal).
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <hr className="border-gray-100" />

                                    {/* Section 3: How We Use Your Information */}
                                    <section id="section-3" className="scroll-mt-28">
                                        <div className="flex items-center space-x-3 mb-4">
                                            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                                                <Activity className="w-6 h-6" />
                                            </div>
                                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">3. How We Use Your Information</h2>
                                        </div>

                                        <p className="text-gray-600 mb-6">
                                            We use the information collected solely to provide and improve your pregnancy tracking experience:
                                        </p>

                                        <div className="space-y-3">
                                            {[
                                                {
                                                    num: '1',
                                                    title: 'Core Functionality',
                                                    desc: 'Calculating gestational age, week-by-week progress, estimated due date countdowns, and displaying developmental size comparisons.'
                                                },
                                                {
                                                    num: '2',
                                                    title: 'Health & Medication Reminders',
                                                    desc: 'Sending local device notifications for scheduled prenatal vitamins, hydration goals, and doctor appointments.'
                                                },
                                                {
                                                    num: '3',
                                                    title: 'Analytics & PDF Export',
                                                    desc: 'Generating personalized health charts and clinical summary PDF reports for you to share with your healthcare provider.'
                                                },
                                                {
                                                    num: '4',
                                                    title: 'Cloud Synchronization (Optional)',
                                                    desc: 'Securely synchronizing your journal entries and tracker history across your devices when signed in.'
                                                },
                                                {
                                                    num: '5',
                                                    title: 'Educational Content',
                                                    desc: 'Offering generalized pregnancy wellness tips and daily motherhood reflections.'
                                                }
                                            ].map((use) => (
                                                <div key={use.num} className="flex items-start space-x-3 p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                                                    <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-[#6d123f] text-white flex items-center justify-center font-bold text-sm">
                                                        {use.num}
                                                    </span>
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900 text-sm">{use.title}</h4>
                                                        <p className="text-gray-600 text-sm mt-0.5">{use.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    <hr className="border-gray-100" />

                                    {/* Section 4: How Your Data Is Stored & Protected */}
                                    <section id="section-4" className="scroll-mt-28">
                                        <div className="flex items-center space-x-3 mb-4">
                                            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                                                <Shield className="w-6 h-6" />
                                            </div>
                                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">4. How Your Data Is Stored &amp; Protected</h2>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                            {/* Local First */}
                                            <div className="p-5 rounded-2xl bg-gradient-to-br from-gray-50 to-amber-50/30 border border-gray-200">
                                                <div className="flex items-center space-x-2 text-gray-900 font-bold mb-2">
                                                    <Smartphone className="w-5 h-5 text-[#e6961d]" />
                                                    <h3>Local-First Storage</h3>
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    If you use Bumply without creating an account, all logs, symptoms, and health measurements reside exclusively on your physical device via sandboxed local storage (<code className="bg-gray-200 px-1.5 py-0.5 rounded text-xs text-gray-800">AsyncStorage</code>).
                                                </p>
                                            </div>

                                            {/* Cloud Security */}
                                            <div className="p-5 rounded-2xl bg-gradient-to-br from-gray-50 to-pink-50/30 border border-gray-200">
                                                <div className="flex items-center space-x-2 text-gray-900 font-bold mb-2">
                                                    <Cloud className="w-5 h-5 text-[#6d123f]" />
                                                    <h3>Cloud Security (Firebase)</h3>
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    For registered users, data is synchronized to Google Firebase Cloud Firestore. All data transmitted between the App and cloud servers is encrypted using industry-standard Transport Layer Security (TLS/HTTPS). Cloud databases are encrypted at rest and protected by strict security rules ensuring that only authenticated account owners can read or write their own records.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Strict Guarantees */}
                                        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
                                            <div className="flex items-start space-x-2.5">
                                                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <p className="font-bold text-emerald-950 text-sm">No Sale of Personal Data</p>
                                                    <p className="text-emerald-800 text-xs md:text-sm">
                                                        <strong>We do not sell, rent, trade, or monetize your personal or health data to data brokers, advertisers, or third parties under any circumstances.</strong>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start space-x-2.5 pt-2 border-t border-emerald-100">
                                                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <p className="font-bold text-emerald-950 text-sm">No Targeted Advertising</p>
                                                    <p className="text-emerald-800 text-xs md:text-sm">
                                                        Bumply does not track you across other third-party apps or websites for behavioral advertising.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <hr className="border-gray-100" />

                                    {/* Section 5: Third-Party Service Providers */}
                                    <section id="section-5" className="scroll-mt-28">
                                        <div className="flex items-center space-x-3 mb-4">
                                            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                                                <Share2 className="w-6 h-6" />
                                            </div>
                                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">5. Third-Party Service Providers</h2>
                                        </div>

                                        <p className="text-gray-600 mb-6">
                                            To support specific infrastructure features, Bumply integrates reputable, privacy-compliant service providers:
                                        </p>

                                        {/* Provider Table */}
                                        <div className="overflow-x-auto rounded-xl border border-gray-200 mb-6">
                                            <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
                                                <thead className="bg-gray-50 text-gray-900 font-semibold">
                                                    <tr>
                                                        <th scope="col" className="px-4 py-3">Service Provider</th>
                                                        <th scope="col" className="px-4 py-3">Purpose</th>
                                                        <th scope="col" className="px-4 py-3">Privacy Policy</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100 bg-white text-gray-600">
                                                    {THIRD_PARTY_SERVICES.map((provider, i) => (
                                                        <tr key={i} className="hover:bg-gray-50/60 transition-colors">
                                                            <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">
                                                                {provider.name} <span className="text-xs font-normal text-gray-500">({provider.entity})</span>
                                                            </td>
                                                            <td className="px-4 py-3">{provider.purpose}</td>
                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <a
                                                                    href={provider.policyUrl}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-flex items-center space-x-1 text-[#6d123f] hover:text-[#e6961d] font-medium transition-colors"
                                                                >
                                                                    <span>View Policy</span>
                                                                    <ExternalLink className="w-3.5 h-3.5" />
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* AI Feature Callout */}
                                        <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl text-xs md:text-sm text-amber-900 flex items-start space-x-3">
                                            <Sparkles className="w-5 h-5 text-[#e6961d] flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="font-bold text-amber-950 mb-1">Note Regarding AI Features</p>
                                                <p className="text-amber-800 leading-relaxed">
                                                    If the optional AI educational summary feature is enabled, only generalized gestation metadata (e.g., Week 22, Day 3) and non-identifying check-in categories are submitted. <strong>No patient names, credentials, or personally identifiable information are ever transmitted to AI models.</strong>
                                                </p>
                                            </div>
                                        </div>
                                    </section>

                                    <hr className="border-gray-100" />

                                    {/* Section 6: Data Retention & Account Deletion */}
                                    <section id="section-6" className="scroll-mt-28">
                                        <div className="flex items-center space-x-3 mb-4">
                                            <div className="p-2.5 rounded-xl bg-red-50 text-red-600">
                                                <Trash2 className="w-6 h-6" />
                                            </div>
                                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">6. Data Retention &amp; Account Deletion</h2>
                                        </div>

                                        <div className="space-y-6">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 mb-2">Retention</h3>
                                                <p className="text-gray-600 text-sm">
                                                    We retain your data only for as long as your account remains active or as needed to provide you with the App&apos;s services. Local-only data remains on your device until you clear the app data or uninstall the App.
                                                </p>
                                            </div>

                                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                                                <h3 className="text-lg font-bold text-gray-900 mb-2">How to Delete Your Account and Data</h3>
                                                <p className="text-gray-600 text-sm mb-4">
                                                    In compliance with Google Play Developer policies, you have full control over your data:
                                                </p>

                                                <div className="space-y-4">
                                                    <div className="flex items-start space-x-3 p-3.5 bg-white rounded-xl border border-gray-100">
                                                        <span className="w-6 h-6 rounded-full bg-[#6d123f] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                                                        <div>
                                                            <h4 className="font-semibold text-gray-900 text-sm">In-App Deletion / Sign Out</h4>
                                                            <p className="text-gray-600 text-xs md:text-sm mt-0.5">
                                                                You can sign out or clear your local tracker data at any time via the <strong>Account &amp; Settings</strong> screen.
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-start space-x-3 p-3.5 bg-white rounded-xl border border-gray-100">
                                                        <span className="w-6 h-6 rounded-full bg-[#6d123f] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                                                        <div className="space-y-2">
                                                            <h4 className="font-semibold text-gray-900 text-sm">Permanent Cloud Account Deletion Request</h4>
                                                            <p className="text-gray-600 text-xs md:text-sm">
                                                                To permanently delete your registered account, profile, and all synchronized cloud records from our servers, you may submit a request by:
                                                            </p>
                                                            <ul className="list-disc pl-5 text-xs md:text-sm text-gray-600 space-y-1">
                                                                <li>
                                                                    Emailing us at <a href="mailto:[EMAIL_ADDRESS]" className="text-[#6d123f] font-semibold hover:underline">[EMAIL_ADDRESS]</a> (or our developer contact email: <a href="mailto:[EMAIL_ADDRESS]" className="text-[#6d123f] font-semibold hover:underline">[EMAIL_ADDRESS]</a>) with the subject line <em>&ldquo;Delete My Bumply Account&rdquo;</em>, specifying your registered email address.
                                                                </li>
                                                                <li>
                                                                    Upon receiving your verified request, all associated personal and health records in our Firestore database will be permanently deleted within thirty (30) days.
                                                                </li>
                                                            </ul>

                                                            <div className="pt-2 no-print">
                                                                <a
                                                                    href="mailto:mhsdigitalhub@gmail.com?subject=Delete%20My%20Bumply%20Account&body=Hello%20Bumply%20Team%2C%0A%0APlease%20permanently%20delete%20my%20Bumply%20account%20and%20all%20associated%20data.%0A%0ARegistered%20Email%20Address%3A%20%5BInsert%20Email%5D%0A%0AThank%20you."
                                                                    className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                                                                >
                                                                    <Mail className="w-3.5 h-3.5" />
                                                                    <span>Send Deletion Email Request</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <hr className="border-gray-100" />

                                    {/* Section 7: User Rights (GDPR & CCPA Compliance) */}
                                    <section id="section-7" className="scroll-mt-28">
                                        <div className="flex items-center space-x-3 mb-4">
                                            <div className="p-2.5 rounded-xl bg-teal-50 text-teal-600">
                                                <UserCheck className="w-6 h-6" />
                                            </div>
                                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">7. User Rights (GDPR &amp; CCPA Compliance)</h2>
                                        </div>

                                        <p className="text-gray-600 mb-6">
                                            Depending on your jurisdiction (such as the European Economic Area, United Kingdom, or California), you have rights regarding your personal information:
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                                <h4 className="font-bold text-gray-900 text-sm mb-1 text-[#6d123f]">Right of Access</h4>
                                                <p className="text-xs md:text-sm text-gray-600">
                                                    You can review all records stored within the app or export your data into a JSON/PDF file.
                                                </p>
                                            </div>

                                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                                <h4 className="font-bold text-gray-900 text-sm mb-1 text-[#6d123f]">Right to Rectification</h4>
                                                <p className="text-xs md:text-sm text-gray-600">
                                                    You can edit or correct any profile, due date, health log, or medication entry directly within the App.
                                                </p>
                                            </div>

                                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                                <h4 className="font-bold text-gray-900 text-sm mb-1 text-[#6d123f]">Right to Erasure (&ldquo;Right to be Forgotten&rdquo;)</h4>
                                                <p className="text-xs md:text-sm text-gray-600">
                                                    You have the right to request the permanent deletion of your data as outlined in Section 6.
                                                </p>
                                            </div>

                                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                                <h4 className="font-bold text-gray-900 text-sm mb-1 text-[#6d123f]">Right to Withdraw Consent</h4>
                                                <p className="text-xs md:text-sm text-gray-600">
                                                    You can revoke notification permissions at any time through your device settings.
                                                </p>
                                            </div>
                                        </div>
                                    </section>

                                    <hr className="border-gray-100" />

                                    {/* Section 8: Children's Privacy */}
                                    <section id="section-8" className="scroll-mt-28">
                                        <div className="flex items-center space-x-3 mb-4">
                                            <div className="p-2.5 rounded-xl bg-orange-50 text-[#e6961d]">
                                                <Baby className="w-6 h-6" />
                                            </div>
                                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">8. Children’s Privacy</h2>
                                        </div>

                                        <p className="text-gray-600 text-base">
                                            Bumply is designed for expecting parents and adult individuals managing pregnancy care. The App is not directed toward children under 13 years of age (or 16 in certain jurisdictions), and we do not knowingly collect personal data from children.
                                        </p>
                                    </section>

                                    <hr className="border-gray-100" />

                                    {/* Section 9: Medical & Health Disclaimer */}
                                    <section id="section-9" className="scroll-mt-28">
                                        <div className="flex items-center space-x-3 mb-4">
                                            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700">
                                                <AlertTriangle className="w-6 h-6" />
                                            </div>
                                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">9. Medical &amp; Health Disclaimer</h2>
                                        </div>

                                        <div className="p-5 bg-amber-50 rounded-2xl border-2 border-amber-200 text-amber-950 space-y-3">
                                            <p className="font-semibold text-base">
                                                Bumply is an informational and personal wellness tracking tool. <strong>The App does not provide medical diagnoses, treatment plans, clinical assessments, or emergency medical care.</strong>
                                            </p>
                                            <p className="text-sm text-amber-900 leading-relaxed">
                                                Always consult your obstetrician, gynecologist, midwife, or qualified healthcare professional regarding any medical conditions, symptoms, fetal movement concerns, or medication changes during pregnancy. Never delay seeking professional medical advice because of information recorded or viewed in this App.
                                            </p>
                                        </div>
                                    </section>

                                    <hr className="border-gray-100" />

                                    {/* Section 10: Changes to This Privacy Policy */}
                                    <section id="section-10" className="scroll-mt-28">
                                        <div className="flex items-center space-x-3 mb-4">
                                            <div className="p-2.5 rounded-xl bg-gray-100 text-gray-700">
                                                <Clock className="w-6 h-6" />
                                            </div>
                                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">10. Changes to This Privacy Policy</h2>
                                        </div>

                                        <p className="text-gray-600 text-base">
                                            We may update this Privacy Policy from time to time to reflect operational, legal, or regulatory updates. We will notify you of any material changes by updating the &ldquo;Last Updated&rdquo; date at the top of this policy and, where appropriate, posting an in-app notice.
                                        </p>
                                    </section>

                                    <hr className="border-gray-100" />

                                    {/* Section 11: Contact Us */}
                                    <section id="section-11" className="scroll-mt-28">
                                        <div className="flex items-center space-x-3 mb-4">
                                            <div className="p-2.5 rounded-xl bg-rose-50 text-[#6d123f]">
                                                <Mail className="w-6 h-6" />
                                            </div>
                                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">11. Contact Us</h2>
                                        </div>

                                        <p className="text-gray-600 mb-6">
                                            If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
                                        </p>

                                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</span>
                                                <div className="flex items-center space-x-2">
                                                    <a
                                                        href="mailto:mhsdigitalhub@gmail.com"
                                                        className="text-base font-bold text-[#6d123f] hover:text-[#e6961d] transition-colors"
                                                    >
                                                        mhsdigitalhub@gmail.com
                                                    </a>
                                                    <button
                                                        onClick={() => copyToClipboard('mhsdigitalhub@gmail.com', 'email')}
                                                        className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors no-print"
                                                        title="Copy email"
                                                        aria-label="Copy email"
                                                    >
                                                        {copiedText === 'email' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                                <p className="text-xs text-gray-500">Developer Contact Email</p>
                                            </div>

                                            <div className="space-y-1">
                                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Developer Name</span>
                                                <p className="text-base font-bold text-gray-900">Bumply Development Team</p>
                                                <p className="text-xs text-gray-500">Maternal &amp; Family Health Software</p>
                                            </div>

                                            <div className="space-y-1">
                                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Package Identifier</span>
                                                <p className="text-sm font-mono font-semibold text-gray-800 bg-gray-200/70 px-2 py-1 rounded w-fit">
                                                    com.bloom.pregnancytracker
                                                </p>
                                            </div>

                                            <div className="space-y-1">
                                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Official App Website</span>
                                                <p className="text-base font-medium">
                                                    <a
                                                        href="https://indianwebify.com"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-[#6d123f] hover:text-[#e6961d] underline inline-flex items-center space-x-1"
                                                    >
                                                        <span>https://indianwebify.com</span>
                                                        <ExternalLink className="w-3.5 h-3.5" />
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </section>

                                </article>
                            </main>

                        </div>
                    </div>
                </section>

                <FooterSection />
            </div>
        </>
    );
}

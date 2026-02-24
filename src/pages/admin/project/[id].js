import React, { useEffect } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { fetchProjectById } from '../../../redux/actions/projectActions';
import {
    ArrowLeft, Pencil, Globe, Github, Star, Calendar, IndianRupee,
    Briefcase, Clock, CheckCircle2, PauseCircle, Code2, User, Tag, ExternalLink
} from 'lucide-react';

const STATUS_CONFIG = {
    'planning': { label: 'Planning', classes: 'bg-blue-100 text-blue-700', icon: Clock },
    'in-progress': { label: 'In Progress', classes: 'bg-amber-100 text-amber-700', icon: Clock },
    'completed': { label: 'Completed', classes: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
    'on-hold': { label: 'On Hold', classes: 'bg-slate-100 text-slate-600', icon: PauseCircle },
};

const fmt = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) : '—';

export default function ProjectDetail() {
    const router = useRouter();
    const { id } = router.query;
    const dispatch = useDispatch();
    const { currentProject: project, loading } = useSelector((state) => state.project);

    useEffect(() => { if (id) dispatch(fetchProjectById(id)); }, [id, dispatch]);

    if (loading || !project) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center py-32">
                    <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-orange-500 animate-spin" />
                </div>
            </AdminLayout>
        );
    }

    const statusInfo = STATUS_CONFIG[project.status] || STATUS_CONFIG['planning'];
    const StatusIcon = statusInfo.icon;

    return (
        <AdminLayout>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Link href="/admin/project" className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-orange-500 hover:border-orange-300 transition-all bg-white">
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                            {project.title}
                            {project.featured && <Star size={16} className="text-amber-400 fill-amber-400" />}
                        </h1>
                        {project.excerpt && <p className="text-slate-500 text-sm mt-0.5">{project.excerpt}</p>}
                    </div>
                </div>
                <Link href={`/admin/project/edit/${id}`}
                    className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-orange-500/20 active:scale-95 whitespace-nowrap">
                    <Pencil size={16} /> Edit Project
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Cover Image */}
                    {project.coverImage && (
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={project.coverImage} alt={project.title} className="w-full h-64 object-cover" />
                        </div>
                    )}

                    {/* Description */}
                    {project.description && (
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                            <h2 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Briefcase size={16} className="text-orange-500" /> About this Project
                            </h2>
                            <div className="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                                {project.description}
                            </div>
                        </div>
                    )}

                    {/* Technologies */}
                    {project.technologies?.length > 0 && (
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                            <h2 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Code2 size={16} className="text-orange-500" /> Technologies Used
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech) => (
                                    <span key={tech} className="inline-flex items-center bg-orange-50 text-orange-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-orange-100">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Links */}
                    {(project.projectUrl || project.githubUrl) && (
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                            <h2 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Globe size={16} className="text-orange-500" /> Project Links
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {project.projectUrl && (
                                    <a href={project.projectUrl} target="_blank" rel="noreferrer"
                                        className="inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-medium px-4 py-2.5 rounded-xl border border-blue-100 transition-all">
                                        <ExternalLink size={14} /> Live Site
                                    </a>
                                )}
                                {project.githubUrl && (
                                    <a href={project.githubUrl} target="_blank" rel="noreferrer"
                                        className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium px-4 py-2.5 rounded-xl border border-slate-200 transition-all">
                                        <Github size={14} /> View on GitHub
                                    </a>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Details Card */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
                        <h2 className="font-bold text-slate-800">Project Details</h2>

                        <div className="flex items-center gap-3">
                            <div className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-lg ${statusInfo.classes}`}>
                                <StatusIcon size={14} />
                                {statusInfo.label}
                            </div>
                            {project.featured && (
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1.5 rounded-lg border border-amber-100">
                                    <Star size={12} className="fill-amber-400 text-amber-400" /> Featured
                                </span>
                            )}
                        </div>

                        <div className="space-y-3 text-sm">
                            {project.clientName && (
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                                        <User size={14} className="text-slate-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-medium">Client</p>
                                        <p className="text-slate-800 font-semibold">{project.clientName}</p>
                                    </div>
                                </div>
                            )}

                            {project.category && (
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                                        <Tag size={14} className="text-slate-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-medium">Category</p>
                                        <p className="text-slate-800 font-semibold">{project.category}</p>
                                    </div>
                                </div>
                            )}

                            {project.budget && (
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                                        <IndianRupee size={14} className="text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-medium">Budget</p>
                                        <p className="text-slate-800 font-semibold">{project.budget}</p>
                                    </div>
                                </div>
                            )}

                            {(project.startDate || project.endDate) && (
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">
                                        <Calendar size={14} className="text-violet-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-medium">Timeline</p>
                                        <p className="text-slate-800 font-semibold">{fmt(project.startDate)} — {fmt(project.endDate)}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="pt-3 border-t border-slate-100 text-xs text-slate-400 space-y-1">
                            <p>Created: {fmt(project.createdAt)}</p>
                            <p>Updated: {fmt(project.updatedAt)}</p>
                            {project.author?.name && <p>By: <span className="font-medium text-slate-600">{project.author.name}</span></p>}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3">
                        <h2 className="font-bold text-slate-800">Quick Actions</h2>
                        <Link href={`/admin/project/edit/${id}`}
                            className="flex items-center gap-2 w-full text-sm font-medium text-slate-700 hover:text-orange-600 hover:bg-orange-50 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-orange-200 transition-all">
                            <Pencil size={14} className="text-orange-500" /> Edit Project
                        </Link>
                        <Link href="/admin/project"
                            className="flex items-center gap-2 w-full text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 transition-all">
                            <Briefcase size={14} className="text-slate-400" /> All Projects
                        </Link>
                        <Link href="/admin/project/create"
                            className="flex items-center gap-2 w-full text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 transition-all">
                            <Briefcase size={14} className="text-slate-400" /> New Project
                        </Link>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

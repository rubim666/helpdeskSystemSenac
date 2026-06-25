import { AnimatePresence, motion } from 'framer-motion';
import { LogOut, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import { AnimatedTable } from '@/components/dashboard/animated-table';
import { EmptyState } from '@/components/dashboard/empty-state';
import { FloatingAssistant } from '@/components/dashboard/floating-assistant';
import { DashboardHeader } from '@/components/dashboard/header';
import { Sidebar } from '@/components/dashboard/sidebar';
import { SkeletonGrid } from '@/components/dashboard/skeleton-grid';
import { StatCard } from '@/components/dashboard/stat-card';
import { LoadingOctopus } from '@/components/mascot/loading-octopus';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { categories, currentUser, metrics, statuses, tickets, users } from '@/data/mock';
import type { DashboardSection } from '@/types/helpdesk';

interface DashboardPageProps {
    onLogout: () => void;
}

function normalizeSection(sectionParam?: string): DashboardSection {
    const fallback: DashboardSection = 'overview';
    const accepted = new Set<DashboardSection>(['overview', 'usuarios', 'chamados', 'categorias', 'historico', 'status']);

    if (!sectionParam || !accepted.has(sectionParam as DashboardSection)) {
        return fallback;
    }

    return sectionParam as DashboardSection;
}

export function DashboardPage({ onLogout }: DashboardPageProps) {
    const { section: sectionParam } = useParams();
    const section = normalizeSection(sectionParam);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 950);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <main className="min-h-screen p-4 md:p-6">
            <div className="mx-auto flex max-w-7xl gap-4 xl:gap-6">
                <Sidebar />
                <section className="w-full space-y-4">
                    <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
                        <DashboardHeader user={currentUser} />
                    </motion.div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2 rounded-2xl border border-amber-400/30 bg-amber-600/15 px-3 py-2 text-amber-100">
                            <Sparkles className="size-4" />
                            Modo premium ativo
                        </div>
                        <Button variant="ghost" onClick={onLogout}>
                            <LogOut className="size-4" />
                            Sair
                        </Button>
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.div key={section} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                            {section === 'overview' ? (
                                <div className="space-y-4">
                                    {loading ? <SkeletonGrid /> : null}
                                    {loading ? null : (
                                        <>
                                            <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
                                                {metrics.map((metric, index) => (
                                                    <StatCard key={metric.key} metric={metric} index={index} />
                                                ))}
                                            </div>
                                            <AnimatedTable rows={tickets} />
                                        </>
                                    )}
                                </div>
                            ) : null}
                            {section === 'usuarios' ? (
                                <Card>
                                    <CardContent className="space-y-3">
                                        {users.map((user) => (
                                            <div key={user.id} className="flex items-center justify-between gap-3 rounded-xl border border-stone-700/70 bg-stone-800/45 p-3">
                                                <div>
                                                    <p className="font-medium text-white">{user.nome}</p>
                                                    <p className="text-sm text-stone-300">{user.email}</p>
                                                </div>
                                                <Badge variant={user.ativo ? 'success' : 'warning'}>{user.nivel}</Badge>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            ) : null}
                            {section === 'chamados' ? <AnimatedTable rows={tickets} /> : null}
                            {section === 'categorias' ? (
                                <Card>
                                    <CardContent className="grid grid-cols-2 gap-3 py-4 sm:grid-cols-4">
                                        {categories.map((category) => (
                                            <div key={category.id} className="rounded-xl border border-stone-700 bg-stone-800/45 p-4 text-center text-stone-200">
                                                {category.nome}
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            ) : null}
                            {section === 'status' ? (
                                <Card>
                                    <CardContent className="space-y-3 py-4">
                                        {statuses.map((status) => (
                                            <div key={status.id} className="flex items-center justify-between rounded-xl bg-stone-800/45 p-3">
                                                <p className="capitalize text-stone-100">{status.nome}</p>
                                                <Badge variant={status.ativo ? 'success' : 'warning'}>{status.ativo ? 'Ativo' : 'Inativo'}</Badge>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            ) : null}
                            {section === 'historico' ? (
                                <EmptyState
                                    title="Histórico em preparação"
                                    description="O polvo está organizando o timeline de interações para este módulo."
                                />
                            ) : null}
                            {section === 'criarChamado' ? (
                                <Card>
                                    <CardContent className="space-y-3 py-4">
                                            <div key="criarChamado" className="flex items-center justify-between rounded-xl bg-stone-800/45 p-3">
                                                <p className="capitalize text-stone-100">Criar Chamado</p>
                                                <Badge variant="success">Ativo</Badge>
                                            </div>
                                    </CardContent>
                                </Card>
                            ) : null}
                        </motion.div>
                    </AnimatePresence>
                </section>
            </div>
            <FloatingAssistant />
            <nav className="glass-panel fixed bottom-3 left-1/2 z-40 flex -translate-x-1/2 gap-2 rounded-2xl p-2 lg:hidden">
                {[
                    { key: 'overview', label: 'Home' },
                    { key: 'chamados', label: 'Chamados' },
                    { key: 'usuarios', label: 'Usuários' },
                    { key: 'criarChamado', label: 'Criar Chamado' },

                ].map((item) => (
                    <NavLink
                        key={item.key}
                        to={item.key === 'overview' ? '/dashboard' : `/dashboard/${item.key}`}
                        className={({ isActive }) =>
                            `rounded-xl px-3 py-2 text-sm transition-all ${
                                isActive ? 'bg-amber-600/30 text-white' : 'text-stone-300'
                            }`
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}
            </nav>
            {loading ? <LoadingOctopus /> : null}
        </main>
    );
}
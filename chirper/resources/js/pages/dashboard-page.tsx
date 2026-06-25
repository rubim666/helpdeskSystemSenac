import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import { AnimatedTable } from "../components/dashboard/animated-table";
import { EmptyState } from "../components/dashboard/empty-state";
import { FloatingAssistant } from "../components/dashboard/floating-assistant";
import { DashboardHeader } from "../components/dashboard/header";
import { Sidebar } from "../components/dashboard/sidebar";
import { SkeletonGrid } from "../components/dashboard/skeleton-grid";
import { StatCard } from "../components/dashboard/stat-card";
import { LoadingOctopus } from "../components/mascot/loading-octopus";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  categories,
  currentUser,
  metrics,
  statuses,
  tickets,
  users,
} from "../data/mock";
import type { DashboardSection } from "../types/helpdesk";

interface DashboardPageProps {
  onLogout: () => void;
}

function normalizeSection(sectionParam?: string): DashboardSection {
  const fallback: DashboardSection = "overview";
  const accepted = new Set<DashboardSection>([
    "overview",
    "usuarios",
    "chamados",
    "categorias",
    "historico",
    "status",
    "criarChamado",
  ]);

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
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
          >
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
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {section === "overview" ? (
                <div className="space-y-4">
                  {loading ? <SkeletonGrid /> : null}
                  {loading ? null : (
                    <>
                      <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
                        {metrics.map((metric, index) => (
                          <StatCard
                            key={metric.key}
                            metric={metric}
                            index={index}
                          />
                        ))}
                      </div>
                      <AnimatedTable rows={tickets} />
                    </>
                  )}
                </div>
              ) : null}
              {section === "usuarios" ? (
                <Card>
                  <CardContent className="space-y-3">
                    {users.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between gap-3 rounded-xl border border-stone-700/70 bg-stone-800/45 p-3"
                      >
                        <div>
                          <p className="font-medium text-white">{user.nome}</p>
                          <p className="text-sm text-stone-300">{user.email}</p>
                        </div>
                        <Badge variant={user.ativo ? "success" : "warning"}>
                          {user.nivel}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ) : null}
              {section === "chamados" ? <AnimatedTable rows={tickets} /> : null}
              {section === "categorias" ? (
                <Card>
                  <CardContent className="grid grid-cols-2 gap-3 py-4 sm:grid-cols-4">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className="rounded-xl border border-stone-700 bg-stone-800/45 p-4 text-center text-stone-200"
                      >
                        {category.nome}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ) : null}
              {section === "status" ? (
                <Card>
                  <CardContent className="space-y-3 py-4">
                    {statuses.map((status) => (
                      <div
                        key={status.id}
                        className="flex items-center justify-between rounded-xl bg-stone-800/45 p-3"
                      >
                        <p className="capitalize text-stone-100">
                          {status.nome}
                        </p>
                        <Badge variant={status.ativo ? "success" : "warning"}>
                          {status.ativo ? "Ativo" : "Inativo"}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ) : null}
              {section === "historico" ? (
                <EmptyState
                  title="Histórico em preparação"
                  description="O polvo está organizando o timeline de interações para este módulo."
                />
              ) : null}
              {section === "criarChamado" ? (
                <Card>
                  <CardContent className="space-y-3 py-4">
                    
                      <p className="capitalize text-stone-100">Criar Chamado</p>
                      {/* Título, patrimônio, Descrição */}
                      <form>

                        <div className="space-y-12">
                            <div
                            key="criarChamado"
                            style={{fontSize: "30px"}}
                            className="flex items-center text-[14px]"
                            >
                            </div>

                          <div className="border-b border-white/10 pb-12">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                              <div className="sm:col-span-4">
                                <label
                                  htmlFor="nome"
                                  className="block text-sm/6 font-medium text-white"
                                >
                                  Nome
                                </label>
                                <div className="mt-2">
                                  <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                                    <div className="shrink-0 text-base text-gray-400 select-none sm:text-sm/6">
                                    </div>
                                    <input
                                      id="nome"
                                      type="text"
                                      name="nome"
                                      placeholder="janesmith"
                                      className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                                    />
                                  </div>

                                <div className="col-span-full">
                                  <label htmlFor="about" className="block text-sm/6 font-medium text-white">Descrição</label>
                                  <div className="mt-2">
                                    <textarea id="about" name="about" rows={3} className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"></textarea>
                                  </div>
                                  <p className="mt-3 text-sm/6 text-gray-400">Descreva o problema.</p>
                                    <button className="blob-btn">
                                    Novo chamado
                                    <span className="blob-btn__inner">
                                    <span className="blob-btn__blobs">
                                        <span className="blob-btn__blob"></span>
                                        <span className="blob-btn__blob"></span>
                                        <span className="blob-btn__blob"></span>
                                        <span className="blob-btn__blob"></span>
                                    </span>
                                    </span>
                                </button>

                                </div>

                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
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
          { key: "overview", label: "Home" },
          { key: "chamados", label: "Chamados" },
          { key: "usuarios", label: "Usuários" },
          { key: "criarChamado", label: "Criar Chamado" },
        ].map((item) => (
          <NavLink
            key={item.key}
            to={
              item.key === "overview" ? "/dashboard" : `/dashboard/${item.key}`
            }
            className={({ isActive }) =>
              `rounded-xl px-3 py-2 text-sm transition-all ${
                isActive ? "bg-amber-600/30 text-white" : "text-stone-300"
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

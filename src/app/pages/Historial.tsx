import {
    Bell, Menu, User, ChevronDown,
    MoreHorizontal, HelpCircle, LogOut,
    Globe as GlobeIcon
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import Starfield from "../features/auth/components/Starfield";
import Pill from "../features/auth/components/Pill";

// ------- data mock (sacar cuando haya backend) -------
const timeline = new Array(9).fill(0).map((_, i) => ({
    id: i,
    date: "Viernes, 17 de julio del 2025",
    title: i === 2 ? "El árbol y la manzana…" : "El arbol y la manzana…",
    active: i === 2,
}));

// ------- esfera central estilo mockup -------
function Globe() {
    return (
        <div className="relative aspect-square w-full max-w-[620px] mx-auto">
            {/* halo exterior */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.95)_0%,rgba(221,231,255,0.45)_32%,rgba(168,85,247,0.22)_58%,rgba(0,0,0,0)_66%)]" />
            {/* cuerpo */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_40%_30%,#ffffff_0%,#c7d4ff_38%,#7a57b8_62%,#2a1d3d_82%)] shadow-[0_20px_60px_rgba(0,0,0,0.45)]" />
            {/* brillo especular */}
            <div className="absolute -top-5 left-8 h-44 w-44 rounded-full bg-white/50 blur-2xl" />
            {/* texto centrado */}
            <div className="absolute inset-0 flex items-center justify-center p-10">

            </div>
            {/* flechas */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-8">
                <motion.button whileTap={{ scale: .95 }} className="grid place-items-center h-12 w-12 rounded-full bg-fuchsia-700/60 border border-fuchsia-400/40 text-white">
                    <ChevronDown className="rotate-90" />
                </motion.button>
                <motion.button whileTap={{ scale: .95 }} className="grid place-items-center h-12 w-12 rounded-full bg-fuchsia-700/60 border border-fuchsia-400/40 text-white">
                    <ChevronDown className="-rotate-90" />
                </motion.button>
            </div>
        </div>
    );
}

export default function HistorialNodes() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen w-full bg-[radial-gradient(60%_80%_at_50%_0%,#1b0f2a_0%,#0b0810_55%,#06050b_100%)] text-white overflow-hidden">
            {/* fondo de estrellas */}
            <Starfield />

            {/* top bar */}
            <header className="relative z-12 flex items-center justify-between px-8 lg:px-16 py-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                    {/* logo circular + marca */}
                    <div className="h-9 w-9 grid place-items-center rounded-full bg-white/10 font-black"></div>
                    <span className="font-semibold tracking-wide text-lg"></span>
                </div>

                {/* perfil / acciones */}
                <div className="flex items-center gap-3 lg:gap-6">
                    <button className="rounded-full p-2 bg-white/5 border border-white/10"><Bell size={18} /></button>
                    <div className="hidden md:flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 border border-white/10">
                        <div className="h-7 w-7 rounded-full bg-white/20 grid place-items-center"><User size={14} /></div>
                        <div className="leading-tight">
                            <div className="text-xs font-semibold">Mora Avalos</div>
                            <div className="text-[10px] text-white/70">moraavalos@gmail.com</div>
                        </div>
                        <ChevronDown size={14} className="opacity-70" />
                    </div>
                    <button className="rounded-full p-2 bg-white/5 border border-white/10 md:hidden"><Menu size={18} /></button>
                </div>
            </header>

            {/* layout principal */}
            <main className="relative z-0 mx-auto grid max-w-[1500px] grid-cols-12 gap-6 px-4 py-6 lg:px-8 lg:py-8">
                {/* ===== sidebar izquierdo ===== */}
                <aside className="col-span-12 md:col-span-4 xl:col-span-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 h-[88vh] overflow-y-auto text-[15px]">
                    {/* título y descripción */}
                    <div className="mb-2 text-[15px] font-semibold text-white/85">{t('historial.title')}</div>
                    <div className="text-[12px] text-white/50 mb-5">{t('historial.description')}</div>

                    {/* timeline con barra violeta y puntos */}
                    <div className="relative">
                        <div className="absolute left-3 top-2 bottom-2 w-[3px] rounded bg-fuchsia-400" />
                        <ul className="space-y-7 pl-10 pr-2">
                            {timeline.map((n) => (
                                <li key={n.id} className="relative">
                                    <div className={`absolute -left-[34px] top-[2px] h-[16px] w-[16px] rounded-full ring-2 ${n.active ? 'bg-fuchsia-400 ring-fuchsia-300' : 'bg-transparent ring-white/30'}`} />
                                    <div className="text-[11px] text-white/60">{n.date}</div>
                                    <div className={`truncate ${n.active ? 'text-white font-semibold' : 'text-white/85'}`}>{n.title}</div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-12">
                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            className="group flex w-full items-center justify-center gap-2 rounded-xl
                         bg-gradient-to-r from-fuchsia-700 to-fuchsia-600
                         px-6 py-4 text-[15px] font-bold shadow-[0_0_25px_rgba(217,70,239,0.35)]
                         border border-fuchsia-400/30 hover:from-fuchsia-600 hover:to-fuchsia-600"
                        >
                            {t('historial.oniriaPro')}
                            <span className="text-fuchsia-200 text-lg">★</span>
                        </motion.button>
                    </div>
                </aside>

                {/* ===== panel central con marco sci-fi ===== */}
                <section className="col-span-12 md:col-span-8 xl:col-span-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 md:p-6">
                    {/* barra superior del panel (pills + insignias) */}
                    <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button className="h-10 w-10 grid place-items-center rounded-xl bg-white/5 border border-white/10">
                                <MoreHorizontal size={18} />
                            </button>
                            <div className="flex items-center gap-2">
                                <Pill>{/* fecha tipo label */}Jueves, 15 de septiembre</Pill>
                                <Pill>
                                    {t('historial.visibility')}:&nbsp;
                                    <span className="inline-flex items-center gap-1">
                                        <GlobeIcon size={14} /> {t('historial.public')}
                                    </span>
                                </Pill>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-white/70 mr-2">{t('historial.insignia')}</span>

                            <button className="ml-2 rounded-full p-2 bg-white/5 border border-white/10"><HelpCircle size={16} /></button>
                        </div>
                    </div>

                    {/* marco / contenedor del orbe con “esquinas” */}
                    <div className="relative rounded-2xl border border-fuchsia-400/25 p-6 md:p-8">
                        <div className="pointer-events-none absolute -top-1 left-8 h-[6px] w-40 bg-fuchsia-400/70 rounded" />
                        <div className="pointer-events-none absolute -top-1 right-24 h-[6px] w-24 bg-fuchsia-400/70 rounded" />
                        <div className="pointer-events-none absolute -bottom-1 right-8 h-[6px] w-40 bg-fuchsia-400/70 rounded" />
                        <div className="pointer-events-none absolute -bottom-1 left-24 h-[6px] w-24 bg-fuchsia-400/70 rounded" />

                        {/* columna de barras a la izquierda (UI deco) */}
                        <div className="absolute left-5 top-16 flex flex-col gap-2">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="h-4 w-3 rounded-sm bg-fuchsia-500/70" />
                            ))}
                        </div>

                        {/* orbe central */}
                        <Globe />
                    </div>
                </section>
            </main>

            {/* menú flotante */}
            <div className="fixed right-6 top-5 z-20">
                <button className="rounded-full p-2 bg-white/10 border border-white/20"><Menu size={18} /></button>
            </div>

            {/* acciones footer */}
            <div className="fixed bottom-4 right-4 z-20 hidden md:flex items-center gap-2 text-xs text-white/60">
                <button className="rounded-full bg-white/10 px-3 py-1 border border-white/10 hover:bg-white/15">{t('historial.soporte')}</button>
                <button className="rounded-full bg-white/10 px-3 py-1 border border-white/10 hover:bg-white/15">{t('historial.atajos')}</button>
                <button className="rounded-full bg-white/10 px-3 py-1 border border-white/10 hover:bg-white/15 flex items-center gap-1">
                    <LogOut size={12} /> {t('historial.salir')}
                </button>
            </div>
        </div>
    );
}

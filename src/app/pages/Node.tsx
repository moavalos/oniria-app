import {
    MoreHorizontal, HelpCircle, LogOut,
    Globe as GlobeIcon,
    Menu
} from "lucide-react";
import { useTranslation } from "react-i18next";

import Starfield from "../features/auth/components/Starfield";
import Pill from "../features/auth/components/Pill";
import Header from "../features/auth/components/Header";
import Card from "@/shared/components/Card";
import NavigationArrows from "../features/auth/components/NavigationArrows";
import LeftPanel from "../features/auth/components/LeftPanel";

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
            <NavigationArrows
                onPrev={() => console.log("Prev")}
                onNext={() => console.log("Next")}
            />
        </div>
    );
}

export default function Node() {
    const { t } = useTranslation();

    const handleInterpretar = (dream: string) => {
        console.log("Interpretando sueño:", dream);
    };

    const handlePersonalizar = () => {
        console.log("Ir a Personalizar habitación");
    };

    const handleInsignias = () => {
        console.log("Ir a Mis insignias");
    };
    
    return (
        <div className="min-h-screen w-full bg-[radial-gradient(60%_80%_at_50%_0%,#1b0f2a_0%,#0b0810_55%,#06050b_100%)] text-white overflow-hidden">
            {/* fondo de estrellas */}
            <Starfield />

            {/* top bar */}
            <Header />

            {/* layout principal */}
            <main className="relative z-0 mx-auto grid max-w-[1500px] grid-cols-12 gap-6 px-4 py-6 lg:px-8 lg:py-8">

                <LeftPanel
                    onInterpretar={handleInterpretar}
                    onPersonalizar={handlePersonalizar}
                    onInsignias={handleInsignias}
                    showQuoteCard={false}
                />

                <Card className="col-span-12 md:col-span-8 xl:col-span-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 md:p-6">
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

                        <Globe />
                    </div>
                </Card>
            </main>

            <div className="fixed right-6 top-5 z-20">
                <button className="rounded-full p-2 bg-white/10 border border-white/20"><Menu size={18} /></button>
            </div>

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

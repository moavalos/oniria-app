import Card from "@/shared/components/Card";
import { motion } from "framer-motion";

type TimelineItem = { id: number; date: string; title: string; active: boolean };

type SidebarProps = {
    title: string;
    description: string;
    ctaText: string;
    timeline: TimelineItem[];
};

export default function Sidebar({ title, description, ctaText, timeline }: SidebarProps) {
    return (
        <Card className="col-span-12 md:col-span-4 xl:col-span-4 p-6 h-[88vh] overflow-y-auto text-[15px]">
            {/* título y descripción */}
            <div className="mb-2 text-[15px] font-semibold text-white/85">{title}</div>
            <div className="text-[12px] text-white/50 mb-5">{description}</div>

            {/* timeline con barra violeta y puntos */}
            <div className="relative">
                <div className="absolute left-3 top-2 bottom-2 w-[3px] rounded bg-fuchsia-400" />
                <ul className="space-y-7 pl-10 pr-2">
                    {timeline.map((n) => (
                        <li key={n.id} className="relative">
                            <div
                                className={`absolute -left-[34px] top-[2px] h-[16px] w-[16px] rounded-full ring-2 ${n.active
                                        ? "bg-fuchsia-400 ring-fuchsia-300"
                                        : "bg-transparent ring-white/30"
                                    }`}
                            />
                            <div className="text-[11px] text-white/60">{n.date}</div>
                            <div
                                className={`truncate ${n.active ? "text-white font-semibold" : "text-white/85"
                                    }`}
                            >
                                {n.title}
                            </div>
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
                    {ctaText}
                    <span className="text-fuchsia-200 text-lg">★</span>
                </motion.button>
            </div>
        </Card>
    );
}

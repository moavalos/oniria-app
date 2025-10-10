import React from "react";

export default function Pill({ children }: { children: React.ReactNode }) {
    return (
        <div className="rounded-full bg-fuchsia-700/50 px-3 py-1 text-xs text-white/90 border border-fuchsia-400/30 shadow-[0_0_10px_rgba(168,85,247,0.4)]">
            {children}
        </div>
    );
}

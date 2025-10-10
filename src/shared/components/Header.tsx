import { Bell, ChevronDown, Menu, User } from "lucide-react";

export default function Header() {
    return (
        <header className="relative z-12 flex items-center justify-between px-6 sm:px-8 lg:px-16 py-4 border-b border-white/10">
            <div className="flex items-center gap-3">
                <span className="font-semibold tracking-wide text-lg"></span>
            </div>

            <div className="flex items-center gap-3 lg:gap-6">
                <button
                    className="rounded-full p-2 bg-white/5 border border-white/10 
                               hover:bg-fuchsia-600/20 hover:border-fuchsia-400/30 
                               transition-all duration-200 ease-out"
                >
                    <Bell size={18} className="text-white hover:text-fuchsia-300 transition-colors duration-200" />
                </button>

                {/* Perfil */}
                <div
                    className="hidden md:flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 border border-white/10
                               hover:bg-fuchsia-600/20 hover:border-fuchsia-400/30 transition-all duration-200 ease-out cursor-pointer"
                >
                    <div className="h-7 w-7 rounded-full bg-white/20 grid place-items-center 
                                    hover:bg-fuchsia-600/30 transition-colors duration-200">
                        <User size={14} className="text-white hover:text-fuchsia-300" />
                    </div>
                    <div className="leading-tight">
                        <div className="text-xs font-semibold hover:text-fuchsia-200 transition-colors duration-200">
                            Mora Avalos
                        </div>
                        <div className="text-[10px] text-white/70 hover:text-fuchsia-300 transition-colors duration-200">
                            moraavalos@gmail.com
                        </div>
                    </div>
                    <ChevronDown size={14} className="opacity-70 hover:text-fuchsia-300 transition-colors duration-200" />
                </div>

                {/* Menu */}
                <button
                    className="rounded-full p-2 bg-white/5 border border-white/10 md:hidden
                               hover:bg-fuchsia-600/20 hover:border-fuchsia-400/30 
                               transition-all duration-200 ease-out"
                >
                    <Menu size={18} className="text-white hover:text-fuchsia-300 transition-colors duration-200" />
                </button>
            </div>
        </header>
    );
}
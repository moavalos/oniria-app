import { Bell, ChevronDown, Menu, User } from "lucide-react";
import { useAuth } from "@/app/features/auth/context/AuthContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user, signOut } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <header className="relative z-12 flex items-center justify-between px-8 lg:px-16 py-4 border-b border-white/10">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 grid place-items-center rounded-full bg-white/10 font-black"></div>
        <span className="font-semibold tracking-wide text-lg"></span>
      </div>

      <div className="flex items-center gap-3 lg:gap-6">
        <div>
          <button
            title="Logout"
            className="rounded-full p-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:cursor-pointer"
            onClick={handleSignOut}
          >
            {t("header.logout", { defaultValue: "Cerrar sesión" })}
          </button>
        </div>
        <button
          title="Bell"
          className="rounded-full p-2 bg-white/5 border border-white/10"
        >
          <Bell size={18} />
        </button>
        <div className="hidden md:flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 border border-white/10">
          <div className="h-7 w-7 rounded-full bg-white/20 grid place-items-center">
            <User size={14} />
          </div>
          <div className="leading-tight">
            <div className="text-xs font-semibold">
              {user?.user_metadata?.full_name || "Mora Avalos"}
            </div>
            <div className="text-[10px] text-white/70">
              {user?.email || "moraavalos@gmail.com"}
            </div>
          </div>
          <ChevronDown size={14} className="opacity-70" />
        </div>
        <button
          title="Menu"
          className="rounded-full p-2 bg-white/5 border border-white/10 md:hidden"
        >
          <Menu size={18} />
        </button>
      </div>
    </header>
  );
}
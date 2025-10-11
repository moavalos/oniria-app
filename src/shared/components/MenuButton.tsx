import type { ReactNode } from "react";
import ChevronRightIcon from "../../assets/icons/ChevronRightIcon";

type MenuButtonProps = {
    icon: ReactNode;
    title: string;
    description: string;
    onClick: () => void;
};

export default function MenuButton({ icon, title, description, onClick }: MenuButtonProps) {
    return (
        <button
            onClick={onClick}
            className="w-full mb-3 flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-3 py-3 hover:bg-white/[0.08] transition-colors duration-200"
        >
            <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full grid place-items-center bg-white/10 border border-white/10">
                    {icon}
                </div>
                <div className="leading-tight text-left">
                    <div className="text-[12px] font-semibold">{title}</div>
                    <div className="text-[11px] text-white/60">{description}</div>
                </div>
            </div>
            <ChevronRightIcon className="text-white/60" />
        </button>
    );
}
import ChevronDownIcon from "@/assets/icons/ChevronDownIcon";
import UserIcon from "@/assets/icons/UserIcon";

type UserProfileProps = {
    name: string;
    email: string;
    onClick?: () => void;
};

export default function UserProfile({ name, email, onClick }: UserProfileProps) {
    return (
        <div
            onClick={onClick}
            className="hidden md:flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 border border-white/10
                 hover:bg-fuchsia-600/20 hover:border-fuchsia-400/30 transition-all duration-200 ease-out cursor-pointer"
        >
            <div className="h-7 w-7 rounded-full bg-white/20 grid place-items-center 
                      hover:bg-fuchsia-600/30 transition-colors duration-200">
                <UserIcon className="text-white hover:text-fuchsia-300" />
            </div>
            <div className="leading-tight">
                <div className="text-xs font-semibold hover:text-fuchsia-200 transition-colors duration-200">
                    {name}
                </div>
                <div className="text-[10px] text-white/70 hover:text-fuchsia-300 transition-colors duration-200">
                    {email}
                </div>
            </div>
            <ChevronDownIcon className="opacity-70 hover:text-fuchsia-300 transition-colors duration-200" />
        </div>
    );
}
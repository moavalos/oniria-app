import BackButton from "@/shared/components/BackButton";
import { useNavigate } from "react-router";

type SidebarHeaderProps = {
    title: string;
    description: string;
};

export default function SidebarHeader({ title, description }: SidebarHeaderProps) {
    const navigate = useNavigate();
    const onBackHome = () => {
        navigate('/home');
    };
    return (
        <>
            <BackButton onClick={onBackHome} />

            <div className="mb-2 text-[15px] font-semibold text-white/85">
                {title}
            </div>
            <div className="text-[12px] text-white/50 mb-5">
                {description}
            </div>
        </>
    );
}
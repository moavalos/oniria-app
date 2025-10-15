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

            <div className="text-[15px] font-semibold text-white/85 mt-5">
                {title}
            </div>
            <div className="text-[12px] text-white/50 mt-3">
                {description}
            </div>
        </>
    );
}
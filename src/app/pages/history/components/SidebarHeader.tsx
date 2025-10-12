type SidebarHeaderProps = {
    title: string;
    description: string;
};

export default function SidebarHeader({ title, description }: SidebarHeaderProps) {
    return (
        <>
            <div className="mb-2 text-[15px] font-semibold text-white/85">
                {title}
            </div>
            <div className="text-[12px] text-white/50 mb-5">
                {description}
            </div>
        </>
    );
}
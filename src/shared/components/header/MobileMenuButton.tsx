import MenuIcon from "@/app/features/components/icons/MenuIcon";

type MobileMenuButtonProps = {
    onClick?: () => void;
};

export default function MobileMenuButton({ onClick }: MobileMenuButtonProps) {
    return (
        <button
            onClick={onClick}
            className="header-button md:hidden"
            aria-label="Menú"
        >
            <MenuIcon className="header-button-icon" />
        </button>
    );
}
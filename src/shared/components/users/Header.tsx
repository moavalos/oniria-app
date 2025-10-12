import "./styles/Header.css";
import HeaderLogo from "./HeaderLogo";
import HeaderActions from "@/app/features/users/actions/HeaderActions";

type HeaderProps = {
    logoText?: string;
    userName?: string;
    userEmail?: string;
    onLogoClick?: () => void;
    onNotificationClick?: () => void;
    onProfileClick?: () => void;
    onMenuClick?: () => void;
};

export default function Header({
    logoText = "",
    userName = "",
    userEmail = "",
    onLogoClick,
    onNotificationClick,
    onProfileClick,
    onMenuClick,
}: HeaderProps) {
    return (
        <header className="header">
            <HeaderLogo text={logoText} onClick={onLogoClick} />
            <HeaderActions
                userName={userName}
                userEmail={userEmail}
                onNotificationClick={onNotificationClick}
                onProfileClick={onProfileClick}
                onMenuClick={onMenuClick}
            />
        </header>
    );
}

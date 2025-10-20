import "./styles/Header.css";
import HeaderLogo from "./HeaderLogo";
import HeaderActions from "@/app/features/users/actions/UserActions";

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
    <header className="header container-header mx-auto">
      <HeaderLogo text={logoText} onClick={onLogoClick} />
      <HeaderActions
        onNotificationClick={onNotificationClick}
        onProfileClick={onProfileClick}
        onMenuClick={onMenuClick}
      />
    </header>
  );
}

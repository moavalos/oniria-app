import NotificationButton from "@/assets/icons/NotificationButton";
import MobileMenuButton from "@/shared/components/users/MobileMenuButton";
import UserProfile from "@/shared/components/users/UserProfile";

type HeaderActionsProps = {
    userName: string;
    userEmail: string;
    onNotificationClick?: () => void;
    onProfileClick?: () => void;
    onMenuClick?: () => void;
};

export default function HeaderActions({
    userName,
    userEmail,
    onNotificationClick,
    onProfileClick,
    onMenuClick,
}: HeaderActionsProps) {
    return (
        <div className="header-actions">
            <NotificationButton onClick={onNotificationClick} />
            <UserProfile
                name={userName}
                email={userEmail}
                onClick={onProfileClick}
            />
            <MobileMenuButton onClick={onMenuClick} />
        </div>
    );
}
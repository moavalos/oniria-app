import NotificationButton from "@/assets/icons/store/NotificationButton";
import MobileMenuButton from "@/app/shared/components/users/MobileMenuButton";
import UserProfile from "@/app/shared/components/users/UserProfile";
import { useAuth } from "../../auth/hooks/useAuth";

type UserActionsProps = {
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
  onMenuClick?: () => void;
};

export default function UserActions({
  onNotificationClick,
  onProfileClick,
  onMenuClick,
}: UserActionsProps) {
  const { user, signOut } = useAuth();

  const onClick = () => {
    if (onProfileClick) {
      onProfileClick();
    } else {
      signOut();
    }
  };

  return (
    <div className="header-actions">
      <NotificationButton onClick={onNotificationClick} />
      <UserProfile
        name={user?.user_metadata.full_name ?? "Invitado"}
        email={user?.email ?? ""}
        onClick={onProfileClick}
      />
      <MobileMenuButton onClick={onMenuClick} />
    </div>
  );
}

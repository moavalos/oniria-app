import BellIcon from "./BellIcon";

type NotificationButtonProps = {
  onClick?: () => void;
};

export default function NotificationButton({
  onClick,
}: NotificationButtonProps) {
  return (
    <button
      onClick={onClick}
      className="header-button backdrop-blur-2xl"
      aria-label="Notificaciones"
    >
      <BellIcon className="header-button-icon" />
    </button>
  );
}

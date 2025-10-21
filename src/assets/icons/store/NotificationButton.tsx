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
      className="flex header-button bg-gray-700/45 h-full aspect-square items-center justify-center backdrop-blur-2xl"
      aria-label="Notificaciones"
    >
      <BellIcon className="header-button-icon" />
    </button>
  );
}

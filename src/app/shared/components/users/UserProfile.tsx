import ChevronDownIcon from "@/assets/icons/store/ChevronDownIcon";
import UserIcon from "@/assets/icons/store/UserIcon";

type UserProfileProps = {
  name: string;
  email: string;
  onClick?: () => void;
};

export default function UserProfile({
  name,
  email,
  onClick,
}: UserProfileProps) {
  return (
    <div
      onClick={onClick}
      className="hidden md:flex items-center gap-2 rounded-full px-3 py-1.5 border transition-all duration-200 ease-out cursor-pointer backdrop-blur-2xl"
      style={{
        backgroundColor: "var(--user-bg)",
        borderColor: "var(--user-border)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "var(--user-hover-bg)";
        e.currentTarget.style.borderColor = "var(--user-hover-border)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "var(--user-bg)";
        e.currentTarget.style.borderColor = "var(--user-border)";
      }}
    >
      <div
        className="h-7 w-7 rounded-full grid place-items-center transition-colors duration-200"
        style={{ backgroundColor: "var(--user-icon-bg)" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "var(--user-icon-hover-bg)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "var(--user-icon-bg)")
        }
      >
        <UserIcon className="transition-colors duration-200" />
      </div>

      <div className="leading-tight">
        <div
          className="text-xs font-semibold transition-colors duration-200"
          style={{ color: "var(--user-text-primary)" }}
        >
          {name}
        </div>
        <div
          className="text-[10px] transition-colors duration-200"
          style={{ color: "var(--user-text-muted)" }}
        >
          {email}
        </div>
      </div>

      <ChevronDownIcon className="transition-colors duration-200 opacity-70" />
    </div>
  );
}

import Icon from "@/assets/icons/Icon";

export default function UserLike() {
  return (
    <div
      className="hidden h-full md:flex bg-gray-700/45 items-center gap-2 rounded-full px-3 py-1.5 border transition-all duration-200 ease-out cursor-pointer backdrop-blur-2xl
      min-w-6 w-44
      "
      style={{
        borderColor: "var(--user-border)",
      }}
    >
      <p className="text-sm text-nowrap">¿Te gusta la app?</p>
      <Icon name="unLike" className="w-6 h-6 text-white cursor-pointer" />
    </div>
  );
}

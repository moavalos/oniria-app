import Icon from "@/assets/icons/Icon";
import type { IconName } from "@/assets/icons/iconsStore";
import type { BadgeComponentProps } from "@/engine/components/Badges";

interface BadgeCardProps extends BadgeComponentProps {}

const objectsDescriptions = [
  {
    name: "portal",
    title: "El Portal",
    description:
      "Aquí podrás registrar tus sueños, explorar tu historia y descubrir los patrones que habitan en tu mente.”",
  },
];

export default function BadgeCard({ objectName }: BadgeCardProps) {
  const object = objectsDescriptions.find((obj) => obj.name === objectName);
  if (!object) return null;

  return (
    <div
      className="w-3xs flex flex-col gap-2 rounded-[8px] px-3 py-1.5 border border-gray-500 cursor-pointer backdrop-blur-md bg-gray-600/50"
      style={{
        animation: "fadeIn 0.3s ease-out",
      }}
    >
      <div className="flex items-center justify-start gap-2">
        <Icon
          name={object.name as IconName}
          className="w-6 h-6 text-white/80 "
        />
        <h3 className="text-light">{object.title}</h3>
      </div>

      <span className="block h-[1px] w-full bg-gray-400/30" />
      <p className="text-sm leading-tight text-white/80 tracking-wide">
        {object.description}
      </p>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

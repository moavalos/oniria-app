import { useProgress } from "@react-three/drei";

export default function LoaderSystem() {
  const { active, progress } = useProgress();
  console.log({ active, progress });

  return active && <div>{`Loading... ${progress} %`}</div>;
}

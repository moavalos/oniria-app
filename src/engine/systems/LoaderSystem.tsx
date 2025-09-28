import { useProgress } from "@react-three/drei";

export default function LoaderSystem() {
  const { active, progress } = useProgress();

  return active && <div>{`Loading... ${progress} %`}</div>;
}

import { useProgress } from "@react-three/drei";

export default function LoaderSystem() {
  const { active, progress, errors } = useProgress();

  return active && <div>{`Loading... ${progress} %`}</div>;
}

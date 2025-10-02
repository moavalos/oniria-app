import { useProgress } from "@react-three/drei";

export default function LoaderSystem() {
  const { active, progress, errors } = useProgress();

  console.log(`Loading progress: ${progress} % - Errors: ${errors} `);

  return active && <div>{`Loading... ${progress} %`}</div>;
}

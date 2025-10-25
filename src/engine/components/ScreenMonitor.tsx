import { Html } from "@react-three/drei";

interface screenProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}

export default function ScreenMonitor(props: screenProps) {
  return (
    <Html
      rotation={props.rotation}
      className="pointer-events-none"
      position={props.position}
      scale={props.scale}
      distanceFactor={1.17}
      transform
      rotation-order="ZXY"
      occlude
    >
      <iframe
        src="./src/app/features/screen/screensaver.html"
        style={{
          width: "1920px",
          height: "980px",
        }}
      />
    </Html>
  );
}

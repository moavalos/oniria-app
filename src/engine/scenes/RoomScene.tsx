import CameraSystem from "@engine/systems/CameraSystem";
import RendererSystem from "../systems/RendererSystem";
import InteractionSystem from "../systems/InteractionSystem";
import AnimationSystem from "../systems/AnimationSystem";
import FrameSystem from "../systems/FrameSystem";

export default function RoomScene() {
  return (
    <>
      <CameraSystem />
      {/* <mesh position={[0, 1, 0]} name="testBox">
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="red" />
      </mesh> */}

      <RendererSystem />
      <InteractionSystem />
      <AnimationSystem />
      <FrameSystem />
    </>
  );
}
//

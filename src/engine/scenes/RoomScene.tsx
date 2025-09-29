import AnimationSystem from "@engine/systems/AnimationSystem";
import CameraSystem from "@engine/systems/CameraSystem";
import RendererSystem from "@engine/systems/RendererSystem";

export default function RoomScene() {
  return (
    <>
      <CameraSystem />
      <RendererSystem />
      <AnimationSystem />
    </>
  );
}

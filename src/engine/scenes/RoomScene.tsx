import {
  CameraSystem,
  RendererSystem,
  InteractionSystem,
  AnimationSystem,
  FrameSystem,
} from "@engine/systems";

export default function RoomScene() {
  return (
    <>
      <RendererSystem />
      <CameraSystem />
      <InteractionSystem />
      <AnimationSystem />
      <FrameSystem />
    </>
  );
}
//

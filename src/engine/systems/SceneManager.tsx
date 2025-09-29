import { useLocation } from "react-router";
import RoomScene from "@engine/scenes/RoomScene";

export default function SceneManager() {
  const location = useLocation();

  switch (location.pathname) {
    case "/":
      return <RoomScene />;
    default:
      return null;
  }
}

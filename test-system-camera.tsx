// Test para verificar que el patrón System.Camera funciona
import { System } from "./src/engine";

// Verificar que System.Camera está disponible
const Camera = System.Camera;

console.log("✅ System.Camera está disponible:", !!Camera);

export default function TestSystemCamera() {
  return <Camera enableControls={true} autoConfigureForRoom={true} />;
}

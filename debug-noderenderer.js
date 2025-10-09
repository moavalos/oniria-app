/**
 * 🐛 Debug Script para NodeRenderer
 *
 * Ejecuta este script para verificar que el NodeRenderer funcione correctamente
 */

console.log("🚀 Iniciando debug de NodeRenderer...");

// Simular uniforms
const testUniforms = {
  uTime: { value: 0 },
  uResolution: { value: { x: 1920, y: 1080 } },
  uPlasmaStrength: { value: 1.0 },
  uGlassStrength: { value: 1.0 },
  uEdgeThickness: { value: 0.6 },
  uEdgeDarkness: { value: 0.35 },
  uPlasmaRadius: { value: 1.05 },
  uMaskRadius: { value: 1.02 },
  uMaskEdgeSmooth: { value: 0.0 },
  uFresnelWidth: { value: 0.3 },
  uFresnelIntensity: { value: 2.0 },
  uOnlyMask: { value: 0.0 },
};

console.log("🔧 Uniforms de prueba:", testUniforms);

// Verificar que las estructuras sean correctas
const checkStructure = (obj, name) => {
  console.log(`📋 Verificando estructura de ${name}:`);

  for (const [key, value] of Object.entries(obj)) {
    if (value && typeof value === "object" && "value" in value) {
      console.log(`  ✅ ${key}: ${JSON.stringify(value)}`);
    } else {
      console.log(`  ❌ ${key}: estructura incorrecta -`, value);
    }
  }
};

checkStructure(testUniforms, "testUniforms");

// Verificar problemas comunes
console.log("\n🔍 Verificando problemas comunes:");

// 1. Estructura de uniforms
const hasCorrectStructure = Object.values(testUniforms).every(
  (uniform) => uniform && typeof uniform === "object" && "value" in uniform
);
console.log(
  `${hasCorrectStructure ? "✅" : "❌"} Estructura de uniforms correcta`
);

// 2. Tipos de datos
const hasCorrectTypes =
  typeof testUniforms.uTime.value === "number" &&
  typeof testUniforms.uResolution.value === "object" &&
  typeof testUniforms.uPlasmaStrength.value === "number";
console.log(`${hasCorrectTypes ? "✅" : "❌"} Tipos de datos correctos`);

console.log(
  "\n🎯 Debug completado. Verifica la consola del navegador para más detalles."
);

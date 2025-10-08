import * as THREE from "three";
import { useEngineCore } from "@/engine/Engine";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { EngineState } from "@/engine/types";
import fragmentShader from "@engine/shaders/nodes/fragmentShader.glsl";
import vertexShader from "@engine/shaders/nodes/vertexShader.glsl";
import { Environment } from "@react-three/drei";

export function NodeRenderer() {
  const { gl, scene, size, loopService, engineState } = useEngineCore();

  // Referencias para cleanup
  const meshRef = useRef<THREE.Mesh | null>(null);
  const prevBackground = useRef<THREE.Color | THREE.Texture | null>(null);

  // Solo funcionar cuando el engine está listo
  const isEngineReady = engineState === EngineState.READY;

  // Render target para el shader de fondo
  const renderTarget = useMemo(
    () =>
      new THREE.WebGLRenderTarget(size.width, size.height, {
        type: THREE.FloatType,
        colorSpace: THREE.SRGBColorSpace,
        format: THREE.RGBAFormat,
        depthBuffer: false,
        stencilBuffer: false,
      }),
    [size.width, size.height]
  );

  // Escena separada para el shader de fondo
  const NodeScene = useMemo(() => new THREE.Scene(), []);

  // Cámara ortográfica para render fullscreen
  const orthoCam = useMemo(
    () => new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1),
    []
  );

  // Uniforms del shader de fondo
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      uPlasmaStrength: { value: 1.0 }, // más o menos “energía” interna
      uGlassStrength: { value: 1.0 }, // brillos y borde del contenedor
      uEdgeThickness: { value: 0.6 }, // 0.2 = borde grueso | 0.9 = fino
      uEdgeDarkness: { value: 0.35 }, // oscurecimiento de borde
      uPlasmaRadius: { value: 1.05 }, // radio del plasma dentro de la esfera
      uSpecularRotation: { value: 0.0 },
      uFlareColor: { value: new THREE.Color(0.8, 0.4, 1.0) }, // violeta
      uFlareIntensity: { value: 1.4 },
      uPulseSpeed: { value: 2.0 },
      uBackIntensity: { value: 0.15 },
      uArrivalTime: { value: 4.0 }, // segundos hasta que el flare se detiene
      uDensity: { value: 3.0 }, // Densidad del túnel
      uDepth: { value: 5.0 }, // Profundidad del túnel
      // Paleta de colores base
      uA: { value: new THREE.Vector3(0.1, 0.4, 0.9) },
      uB: { value: new THREE.Vector3(0.5, 0.0, 0.8) },
      uC: { value: new THREE.Vector3(0.3, 0.8, 0.1) },
      uD: { value: new THREE.Vector3(0.0, 0.3, 0.57) },
      // Configuración del orbe brillante
      uOrbColor: { value: new THREE.Vector3(0.8, 0.2, 1.0) }, // violeta
      uOrbSpeed: { value: 2.0 },
      uOrbSize: { value: 0.1 },
    }),
    [size.width, size.height]
  );

  // Crear el mesh del shader de fondo
  const createBackgroundMesh = useCallback(() => {
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms,
      fragmentShader,
      vertexShader,
    });
    const mesh = new THREE.Mesh(geometry, material);
    NodeScene.add(mesh);
    meshRef.current = mesh;
  }, [NodeScene, uniforms]);

  // Inicialización: guardar background anterior y crear mesh
  useEffect(() => {
    if (!isEngineReady || !gl || !scene) return;

    // Guardar el background anterior para restaurarlo
    prevBackground.current = scene.background;

    // Crear el mesh del shader
    createBackgroundMesh();

    return () => {
      if (scene && prevBackground.current !== undefined) {
        scene.background = prevBackground.current;
      }
      renderTarget.dispose();
    };
  }, [isEngineReady, gl, scene, createBackgroundMesh, renderTarget]);

  // Loop de renderizado: actualizar shader y aplicar como background
  useEffect(() => {
    if (!isEngineReady || !loopService || !meshRef.current || !gl || !scene) {
      return;
    }

    const renderBackgroundShader = (_: unknown, deltaTime: number) => {
      if (!meshRef.current) return;

      // Actualizar tiempo del shader
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value += deltaTime;

      // Renderizar shader a texture
      gl.setRenderTarget(renderTarget);
      gl.render(NodeScene, orthoCam);
      gl.setRenderTarget(null);

      // Aplicar texture como background de la escena
      scene.background = renderTarget.texture;
    };

    loopService.subscribe(renderBackgroundShader);
    return () => loopService.unsubscribe(renderBackgroundShader);
  }, [
    isEngineReady,
    loopService,
    gl,
    scene,
    renderTarget,
    NodeScene,
    orthoCam,
  ]);

  return (
    <>
      <NodeRenderer />
      <Environment preset="warehouse" />
    </>
  );
}

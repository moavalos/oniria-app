import * as THREE from "three";

export const HighlightShader = {
    uniforms: {
        uColor: { value: new THREE.Color(0x00ffa8) },
        uIntensity: { value: 1.5 },
        uTime: { value: 0 },
        uPower: { value: 2.0 },
        uScanWidth: { value: 0.5 },
        uScanPos: { value: 0.0 },
        uHeight: { value: 1.0 },
        uMinY: { value: 0.0 },
    },
    vertexShader: `
    varying vec3 vNormal;
    varying vec3 vViewDir;
    varying vec3 vLocalPos;
    varying vec3 vWorldPos;

    void main() {
    vLocalPos = position;                   // 👈 coordenadas locales del objeto
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,
    fragmentShader: `
    uniform vec3 uColor;
    uniform float uIntensity;
    uniform float uTime;
    uniform float uPower;
    uniform float uScanWidth;
    uniform float uScanPos;
    uniform float uHeight;
    uniform float uMinY;

    varying vec3 vNormal;
    varying vec3 vViewDir;
    varying vec3 vLocalPos;

    void main() {
   

    float ndv = abs(dot(normalize(vNormal), normalize(vViewDir)));
    ndv = clamp(ndv, 0.0, 1.0);
    float fresnel = pow(1.0 - ndv, uPower);


    float localY = vLocalPos.y  ;  // 0 en base, 1 en tope
    float distToLine = abs(vLocalPos.y - uScanPos);       // ahora uScanPos debe estar entre 0–1
    float scan = smoothstep(uScanWidth, 0.0, distToLine);

      float glow = max(fresnel, scan);
      vec3 color = uColor * glow * uIntensity;

      gl_FragColor = vec4(color, 0.2 * glow);
    }
  `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
};

export type HighlightOptions = {
    color?: number;
    intensity?: number;
    power?: number;
    scanWidth?: number;
    scanPos?: number;
};


export class HighlightService {
    private active: Set<THREE.Mesh> = new Set();

    /**
     * Agrega highlight a un objeto. Si es un Mesh, aplica directamente.
     * Si es un Group/Object3D, aplica a todos los meshes hijos.
     */
    addToObject(object: THREE.Object3D, opts: HighlightOptions = {}) {
        if ((object as any).isMesh) {
            // Si es un mesh directo, usar el método add normal
            this.add(object as THREE.Mesh, opts);
        } else {
            // Si es un grupo, aplicar a todos los meshes hijos
            // Excluir overlays de highlight que ya fueron agregados
            object.traverse((child) => {
                if ((child as any).isMesh &&
                    child !== object &&
                    !(child as any).userData?._isHighlightOverlay) {
                    this.add(child as THREE.Mesh, opts);
                }
            });
        }
    }

    /**
     * Remueve highlight de un objeto. Si es un Mesh, remueve directamente.
     * Si es un Group/Object3D, remueve de todos los meshes hijos.
     */
    removeFromObject(object: THREE.Object3D) {
        if ((object as any).isMesh) {
            // Si es un mesh directo, usar el método remove normal
            this.remove(object as THREE.Mesh);
        } else {
            // Si es un grupo, remover de todos los meshes hijos
            // Excluir overlays de highlight
            object.traverse((child) => {
                if ((child as any).isMesh &&
                    child !== object &&
                    !(child as any).userData?._isHighlightOverlay) {
                    this.remove(child as THREE.Mesh);
                }
            });
        }
    }

    /**
     * Agrega una capa de glow al mesh seleccionado (no modifica material original).
     * No duplica transformaciones: el overlay es hijo con transform local identidad.
     */
    add(mesh: THREE.Mesh, opts: HighlightOptions = {}) {
        if (!mesh || this.active.has(mesh)) return;

        const overlayMat = new THREE.ShaderMaterial({
            uniforms: THREE.UniformsUtils.clone(HighlightShader.uniforms),
            vertexShader: HighlightShader.vertexShader,
            fragmentShader: HighlightShader.fragmentShader,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });


        // overlayMat.uniforms.uSpeed.value = opts.speed ?? 3.0;

        const overlay = new THREE.Mesh(mesh.geometry, overlayMat);
        const bbox = overlay.geometry.boundingBox ?? new THREE.Box3().setFromObject(mesh);


        overlayMat.uniforms.uHeight = { value: bbox.max.y - bbox.min.y };
        overlayMat.uniforms.uMinY = { value: bbox.min.y };
        //color violeta por defecto
        overlayMat.uniforms.uColor.value = new THREE.Color(opts.color ?? 0xff00ff);
        overlayMat.uniforms.uIntensity.value = opts.intensity ?? 2.5;
        overlayMat.uniforms.uPower.value = opts.power ?? 5.0;
        overlayMat.uniforms.uScanWidth.value = opts.scanWidth ?? 0.1;
        overlayMat.uniforms.uScanPos.value = opts.scanPos ?? 0.0;

        // con esto prevengo problemas de z-fighting
        overlay.frustumCulled = false;
        overlay.renderOrder = 999;
        overlay.scale.copy(mesh.scale).multiplyScalar(1.002);

        overlay.material.depthTest = true;
        overlay.material.depthWrite = false;
        overlay.material.polygonOffset = true;
        overlay.material.polygonOffsetFactor = -1;
        overlay.material.polygonOffsetUnits = -2;
        overlay.material.side = THREE.FrontSide;
        overlay.matrixAutoUpdate = true;
        overlay.position.set(0, 0, 0);
        overlay.rotation.set(0, 0, 0);
        overlay.scale.set(1, 1, 1);

        // Marcar el overlay para que sea excluido en traverse
        (overlay as any).userData._isHighlightOverlay = true;

        mesh.add(overlay);
        (mesh as any).userData._highlightOverlay = overlay;

        this.active.add(mesh);
    }

    remove(mesh: THREE.Mesh) {
        if (!mesh || !this.active.has(mesh)) return;
        const overlay: THREE.Mesh | undefined = (mesh as any).userData?._highlightOverlay;
        if (overlay) {
            mesh.remove(overlay);
            if (overlay.material && (overlay.material as THREE.Material).dispose) {
                (overlay.material as THREE.Material).dispose();
            }
            // No dispose de geometry: es compartida con el mesh original
            delete (mesh as any).userData._highlightOverlay;
        }
        this.active.delete(mesh);
    }

    update(_dt: number) {

        for (const mesh of this.active) {
            const overlay: THREE.Mesh | undefined = (mesh as any).userData?._highlightOverlay;
            const mat = overlay?.material as THREE.ShaderMaterial | undefined;
            if (mat && mat.uniforms?.uTime) {
                mat.uniforms.uTime.value = _dt;
            }
            if (mat && mat.uniforms?.uScanPos) {
                mat.uniforms.uScanPos.value = Math.abs(Math.sin(_dt * 1.1) * 2.5); // Velocidad de escaneo
            }
        }
    }

    clear() {
        for (const mesh of Array.from(this.active)) this.remove(mesh);
        this.active.clear();
    }
}

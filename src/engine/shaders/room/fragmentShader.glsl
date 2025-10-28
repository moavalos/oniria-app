
uniform sampler2D uTextureA;
uniform sampler2D uTextureB;
uniform float uMixFactor;

varying vec2 vUv;

void main() {
    
    vec4 colorA = texture2D(uTextureA, vUv);
    vec4 colorB = texture2D(uTextureB, vUv);

    //srgb to linear
    colorA.rgb = pow(colorA.rgb, vec3(2.2));
    colorB.rgb = pow(colorB.rgb, vec3(2.2));
    
    // Mezclar entre las dos texturas usando uMixFactor
    // 0.0 = solo textura A, 1.0 = solo textura B
    vec4 finalColor = mix(colorA, colorB, uMixFactor);

    //linear to srgb
    finalColor.rgb = pow(finalColor.rgb, vec3(1.0/2.2));    

    
    gl_FragColor = finalColor;

    // aplicar toneMapping + conversión de colorSpace de Three.js
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}

precision highp float;

uniform float uTime;
uniform vec2  uResolution;

// Mezcla / fuerza de cada capa
uniform float uPlasmaStrength;
uniform float uGlassStrength;
uniform float uPlasmaRadius;

// Control de máscara de transparencia
uniform float uMaskRadius;     // radio del círculo visible (0.0–1.5)
uniform float uMaskEdgeSmooth; // borde suave (0.0–0.2)

varying vec2 vUv;

#define TAU 6.28318530718

// ----------------- helpers -----------------
float rand(vec2 n){return fract(sin(dot(n,vec2(12.9898,4.1414)))*43758.5453);}
float noise(vec2 p){
  vec2 ip=floor(p),u=fract(p);
  u=u*u*(3.0-2.0*u);
  float res=mix(
    mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
    mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
  return res*res;
}
float fbm(vec2 p,int oct){
  float s=0.0,m=0.0,a=0.5;
  for(int i=0;i<10;i++){
    if(i>=oct)break;
    s+=a*noise(p);
    m+=a;
    a*=0.5;
    p*=2.0;
  }
  return s/m;
}
float luma(vec3 c){return dot(c,vec3(0.299,0.587,0.114));}
vec3 pal(float t,vec3 a,vec3 b,vec3 c,vec3 d){return a+b*cos(TAU*(c*t+d));}

// --------- vidrio ---------
vec3 glassLayer(vec2 uv,float t){
  float l=dot(uv,uv);
  float sm=smoothstep(1.02,0.98,l);
  float d=sm*l*l*l*2.0;

  vec3 norm=normalize(vec3(uv.x,uv.y,0.7-d));

  float nx=fbm(uv*2.0+t*0.1+25.69,5);
  float ny=fbm(uv*2.0+t*0.1+26.31,5);
  float n=fbm(uv*3.0+2.0*vec2(nx,ny)+sin(t)*0.5,4);
  n=pow(n,1.4);

  vec3 col=vec3(n*0.6+0.25);
  float a=atan(uv.y,uv.x)/TAU+t*0.1;
  col*=pal(a,vec3(0.1),vec3(.3),vec3(1.),vec3(0.0,0.1,0.2));
  col*=vec3(1.0,0.7,0.5);

  vec3 cd=abs(col);
  vec3 c=col*d;
  c+=(c*0.5+vec3(1.0)-luma(c))
    *vec3(max(0.0,pow(dot(norm,vec3(0,0,-1)),5.0)*3.0));
  float g=1.8*smoothstep(0.6,1.0,fbm(norm.xy*3.0/(1.0+norm.z),3))*d;
  c+=g;

  col=c+col*pow((1.0-smoothstep(1.0,0.55,l)
                -pow(max(0.0,length(uv)-1.0),0.7))*1.5,3.0);
  col+=abs(norm)*(1.0-d)*sm*0.25;

  return col;
}

// --------- plasma interno ---------
vec3 plasmaLayer(vec2 p,float t){
  vec2 z=vec2(0.0);
  vec2 i=vec2(0.0);
  vec2 f=p*(z+=4.2-4.0*abs(0.3-dot(p,p)));
  vec4 O=vec4(0.0);
  for(i.y=1.;i.y<8.0;i.y++){
    O+=(sin(f)+1.5).xyyx*abs(f.x-f.y);
    f+=cos(f.yx*i.y+i+t)/i.y+0.7;
  }
  O=tanh(7.0*exp(z.x-4.-p.x*vec4(-0.5,0.5,.001,0.0))/O);
  O=pow(O,vec4(1.7));
  O.rgb*=vec3(1.9,1.1,1.9);
  return O.rgb;
}

// --------- MAIN ---------
void main(){
  vec2 uv=(vUv-0.5)*2.0;

  float r=length(uv);
  float t=uTime;

  // --- máscara radial usando step/distance ---
  float dist = distance(uv, vec2(0.0));
  float alpha = smoothstep(uMaskRadius, uMaskRadius - uMaskEdgeSmooth, dist);
  //alpha = 1.0 - alpha; // dentro blanco (1), afuera transparente (0)

  // --- capas internas ---
  float plasmaMask = smoothstep(uPlasmaRadius, 0.0, r);
  vec3 colPlasma = plasmaLayer(uv, t) *  uPlasmaStrength;
  vec3 colGlass  = glassLayer(uv, t)  * uGlassStrength;

  // mezcla
  vec3 color = colPlasma + colGlass * (1.0 - 0.2 * plasmaMask);
  float services = exp(-pow(r * 1.8, 2.0));
  color += services * 0.15;
  color = pow(color, vec3(1.8));

  gl_FragColor = vec4(color, alpha);
}


#define PI 3.14159

varying vec2 vUv;
uniform float uTime;
uniform float uPortalAlpha;
uniform float uDensity;  
uniform float uRadius;   
uniform float uAngle;    
uniform float uHue;       
uniform float uSaturation; 
uniform float uRadiusFactor;
uniform float uGainOffset;
uniform float uGainScale;

vec4 lerp(vec4 a, vec4 b, float t) {
    return (a * vec4(t)) + (b * vec4(1.0-t));
}
vec4 lerp(vec4 a, vec4 b, vec4 t) {
    return (a * t) + (b * (vec4(1.0) * t));
}
vec4 hue2rgb(float hue) {
    hue = fract(hue); //only use fractional part of hue, making it loop
    float r = abs(hue * 6.0 - 3.0) - 1.0; //red
    float g = 2.0 - abs(hue * 6.0 - 2.0); //green
    float b = 2.0 - abs(hue * 6.0 - 4.0); //blue
    vec4 rgb = vec4(r,g,b, 1.0); //combine components
    rgb = clamp(rgb, 0.0, 1.0); //clamp between 0 and 1
    return rgb;
}
vec4 hsv2rgb(vec3 hsv) {
    vec4 rgb = hue2rgb(hsv.x); //apply hue
    rgb = lerp(vec4(1.0), rgb, 1.0 - hsv.y); //apply saturation
    rgb = rgb * hsv.z; //apply value
    return rgb;
}
float getValueFromNumber(vec4 vector, int num) {
    if (num == 0) return vector.r;
    if (num == 1) return vector.g;
    if (num == 2) return vector.b;
    if (num == 3) return vector.a;
}
int getLargest(vec4 vector) {
    int largest = 0;
    if (vector.g > getValueFromNumber(vector, largest)) largest = 1;
    if (vector.b > getValueFromNumber(vector, largest)) largest = 2;
    if (vector.a > getValueFromNumber(vector, largest)) largest = 3;
    return largest;
}
vec4 normalizeColor(vec4 color) {
    vec4 normalized = vec4(color.r, color.g, color.b, color.a);
    int largest = getLargest(color);
    if (largest == 0) normalized /= vec4(color.r);
    if (largest == 1) normalized /= vec4(color.g);
    if (largest == 2) normalized /= vec4(color.b);
    if (largest == 3) normalized /= vec4(color.a);
    return normalized;
}

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
    return a + b*cos(6.28318*(c*t+d));
}
vec2 hash( vec2 p ){
    //p = mod(p, 4.0); // tile
    p = vec2(dot(p,vec2(127.1,311.7)),
             dot(p,vec2(269.5,183.3)));
    return fract(sin(p)*18.5453);
}
vec2 voronoi( in vec2 x, float iTime ){
    vec2 n = floor( x );
    vec2 f = fract( x );

	vec3 m = vec3( 9.0 );
    for( int j=-1; j<=1; j++ )
    for( int i=-1; i<=1; i++ )
    {
        vec2  g = vec2( float(i), float(j) );
        vec2  o = hash( n + g );
      
	    vec2  r = g - f + (0.5+0.5*sin(iTime+6.2831*o));
		float d = dot( r, r );
        if( d<m.x )
            m = vec3( d, o );
    }

    return vec2( sqrt(m.x), m.y+m.z );
}
vec2 swirlUV( float effectRadius, float fxAngle, vec2 _uv, vec2 center ){
    float effectAngle = fxAngle * PI;
    center = center == vec2(0., 0.) ? vec2(.5, .5) : center;
    
    vec2 uv = _uv - center;
    
    float len = length(uv );
    float angle = atan(uv.y, uv.x) + effectAngle * smoothstep(effectRadius, 0., len);
    float radius = length(uv);

    return vec2(radius * cos(angle), radius * sin(angle)) + center;
}
vec4 portalEffect(vec4 color, float voronoiDensity, float time, float radius, float angle, vec2 _uv, vec2 center) {
    vec2 uv = swirlUV(radius, angle, _uv, center);
    return vec4(voronoi(voronoiDensity * uv, time).x) * color;
}



void main(){

  vec2  uv      = vUv;
  vec2  center  = vec2(0.5);

  // Color base
//   vec4  color   = hsv2rgb(vec3(uHue, uSaturation, 0.8)) * vec4(2.0);
  vec4  color   = vec4(palette(4.1, 
                   vec3(0.5,0.4,0.6),   
                   vec3(0.5,0.0,0.9),   
                   vec3(.2,0.8,max(uSaturation, 0.5)),   
                   vec3(0.0,0.13,1.57)),uPortalAlpha);

   vec4 portalCol = vec4(1.0);
   if (distance(uv, center) > uRadius) {
        portalCol = vec4(1.0);
    }
  
  float d = distance(uv, center);

  float distGain = (1.0 - (d  / (uRadius / uRadiusFactor)) - uGainOffset) * uGainScale;

  portalCol = portalEffect(color, uDensity, uTime, uRadius, uAngle, uv, center) * distGain * portalCol;

  vec4  atmosphere = vec4(1.0);
   
  float value = 1.0 - ((portalCol.r + portalCol.g + portalCol.b + portalCol.a) / 5.0);

  value = pow(value, 3.0);

  vec4 finalCol = lerp(atmosphere, portalCol, clamp(abs(value * uPortalAlpha), 0.0, 1.0));

  gl_FragColor = finalCol;
}
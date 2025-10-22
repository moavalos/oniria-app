#define DITHERING
#define BACKGROUND

//#define TONEMAPPING

//-------------------
#define pi 3.14159265
#define R(p, a) p=cos(a)*p+sin(a)*vec2(p.y, -p.x)

// Varying del vertex shader
varying vec2 vUv;

// Uniforms de Three.js
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform sampler2D uTexture0;  // iChannel0 - textura
uniform sampler2D uTexture1;  // iChannel1 - keyboard (puedes usar otra textura o remover)
uniform sampler2D uTexture2;  // iChannel2 - textura

// Ruido de iq
float noise( in vec3 x )
{
    vec3 p = floor(x);
    vec3 f = fract(x);
	f = f*f*(3.0-2.0*f);
	vec2 uv = (p.xy+vec2(37.0,17.0)*p.z) + f.xy;
	vec2 rg = textureLod( uTexture0, (uv+ 0.5)/256.0, 0.0 ).yx;
	return 1. - 0.82*mix( rg.x, rg.y, f.z );
}

float fbm(vec3 p)
{
   return noise(p*.06125)*.5 + noise(p*.125)*.25 + noise(p*.25)*.125 + noise(p*.4)*.2;
}

float length2( vec2 p )
{
	return sqrt( p.x*p.x + p.y*p.y );
}

float length8( vec2 p )
{
	p = p*p; p = p*p; p = p*p;
	return pow( p.x + p.y, 1.0/8.0 );
}


float Disk( vec3 p, vec3 t )
{
    vec2 q = vec2(length2(p.xy)-t.x,p.z*0.5);
    return max(length8(q)-t.y, abs(p.z) - t.z);
}

//==============================================================
// Ruido espiral de otaviogood - https://www.shadertoy.com/view/ld2SzK
//--------------------------------------------------------------
// Este ruido espiral funciona agregando y rotando ondas senoidales sucesivamente mientras aumenta la frecuencia.
// Debería funcionar igual en todas las computadoras ya que no se basa en una función hash como otros ruidos.
// Puede ser mucho más rápido que otras funciones de ruido si está bien con algo de repetición.
const float nudge = 0.8;	// tamaño del vector perpendicular
float normalizer = 1.0 / sqrt(1.0 + nudge*nudge);	// teorema de pitágoras en ese perpendicular para mantener la escala
float SpiralNoiseC(vec3 p)
{
    float n = 0.0;	// cantidad de ruido
    float iter = 2.0;
    for (int i = 0; i < 8; i++)
    {
        // agregar sin y cos escalados inversamente con la frecuencia
        n += -abs(sin(p.y*iter) + cos(p.x*iter)) / iter;	// abs para un aspecto estriado
        // rotar agregando perpendicular y escalando hacia abajo
        p.xy += vec2(p.y, -p.x) * nudge;
        p.xy *= normalizer;
        // rotar en otro eje
        p.xz += vec2(p.z, -p.x) * nudge;
        p.xz *= normalizer;
        // aumentar la frecuencia
        iter *= 1.733733;
    }
    return n;
}

float NebulaNoise(vec3 p)
{
    float final = Disk(p.xzy,vec3(2.0,1.8,1.25));
    final += fbm(p*90.);
    final += SpiralNoiseC(p.zxy*0.5123+100.0)*3.0;

    return final;
}

float map(vec3 p) 
{
	R(p.xz, uMouse.x*0.12*pi+uTime*0.1);

	float NebNoise = abs(NebulaNoise(p/0.5)*0.5);
    
	return NebNoise+0.07;
}
//--------------------------------------------------------------

// asignar color al medio
vec3 computeColor( float density, float radius )
{
	// color basado solo en la densidad, da impresión de oclusión dentro
	// del medio
	vec3 result = mix( vec3(0.0,.0,.1), vec3(0.0,0.1,0.26), density );
	
	// color agregado al medio
	vec3 colCenter = 0.*vec3(0.8,1.0,1.0);
	vec3 colEdge = 1.*vec3(0.,0.9,0.7);
	result *= mix( colCenter, colEdge, radius+1./1.2);
	
	return result;
}


bool RaySphereIntersect(vec3 org, vec3 dir, out float near, out float far)
{
	float b = dot(dir, org);
	float c = dot(org, org) - 8.;
	float delta = b*b - c;
	if( delta < 0.0) 
		return false;
	float deltasqrt = sqrt(delta);
	near = -b - deltasqrt;
	far = -b + deltasqrt;
	return far > 0.0;
}

// Aplica la curva fílmica de la presentación de John Hable
// Más detalles en: http://filmicgames.com/archives/75
vec3 ToneMapFilmicALU(vec3 _color)
{
	_color = max(vec3(0), _color - vec3(0.004));
	_color = (_color * (6.2*_color + vec3(0.5))) / (_color * (6.2 * _color + vec3(1.7)) + vec3(0.06));
	return _color;
}

void main()
{  
    // Usar el mismo enfoque que el nodo: coordenadas UV centradas
    vec2 uv = (vUv - 0.5) * 2.0; // Rango [-1, 1]
    
    const float KEY_1 = 49.5/256.0;
	const float KEY_2 = 50.5/256.0;
	const float KEY_3 = 51.5/256.0;
    float key = 0.0;
    // Si necesitas el keyboard, usa uTexture1. Si no, comenta estas líneas o usa valor fijo
    key += 0.7*texture(uTexture1, vec2(KEY_1,0.25)).x;
    key += 0.7*texture(uTexture1, vec2(KEY_2,0.25)).x;
    key += 0.7*texture(uTexture1, vec2(KEY_3,0.25)).x;

	// ro: origen del rayo
	// rd: dirección del rayo
	// Usar coordenadas UV normalizadas como el nodo
	vec3 rd = normalize(vec3(uv, 1.));
	vec3 ro = vec3(0., 0., -6.+key*1.6);
    
	// ld, td: densidad local, total
	// w: factor de ponderación
	float ld=0., td=0., w=0.;

	// t: longitud del rayo
	// d: función de distancia
	float d=1., t=0.;
    
    const float h = 0.1;
   
	vec4 sum = vec4(0.0);
   
    float min_dist=0.0, max_dist=0.0;

    if(RaySphereIntersect(ro, rd, min_dist, max_dist))
    {
       
	t = min_dist*step(t,min_dist);
   
	// bucle de raymarching
	for (int i=0; i<64; i++) 
	{
	 
		vec3 pos = ro + t*rd;
  
		// Condiciones de ruptura del bucle.
	    if(td>0.9 || d<0.1*t || t>10. || sum.a > 0.99 || t>max_dist) break;
        
        // evaluar función de distancia
        float d = map(pos);
		       
		// cambiar esta cadena para controlar la densidad
		d = max(d,0.0);
        
        
        float timeScale = 1.; // Ajustar la escala de tiempo para controlar la velocidad
        vec3 randomOffset = vec3(
            sin(uTime * 1.) * 0.2, // desplazamiento en x
            cos(uTime +0.2) * 0.2, // desplazamiento en y
            sin(uTime +1.5) * uTime*0.01 + 0.2  // desplazamiento en z
        );

        // Aplicar el desplazamiento a la posición de la estrella
        vec3 starPos = vec3(0.0) + randomOffset; // Posición original más el desplazamiento aleatorio

        // Cálculos de luz puntual usando la posición de la estrella en movimiento
        vec3 ldst = starPos - pos;
        // cálculos de luz puntual
        //vec3 ldst = vec3(0.0)-pos;
        float lDist = max(length(ldst), 0.001);

        // el color de la luz
        vec3 lightColor=vec3(0.9,0.5,0.5);
        
         sum.rgb+=(vec3(0.3,0.1*sin(uTime/2.)+0.2,.2)/(lDist*lDist*1.)/80.); // la estrella en sí !!!!!!!!!!!!
        sum.rgb+=(lightColor/exp(lDist*lDist*lDist*clamp(1.-uTime*0.1, 0.08, 1.))/20.); // bloom !!!!!!!!!!!!!
        
		if (d<h) 
		{
			// calcular densidad local
			ld = h - d;
            
            // calcular factor de ponderación
			w = (1. - td) * ld;
     
			// acumular densidad
			td += w + 1./200.;
		
			vec4 col = vec4( computeColor(td,lDist), td );
            
            // emisión
            sum += sum.a * vec4(sum.rgb, 0.0) * 0.1;	
            
			// escala uniforme de densidad
			col.a *= 0.2;
			// colorear por alfa
			col.rgb *= col.a;
			// mezcla alfa en contribución
			sum = sum + col*(1.0 - sum.a);  
       
		}
      
		td += 1./70.;

      
		
        // intentando optimizar el tamaño del paso cerca de la cámara y cerca de la fuente de luz
        t += max(d * 0.1 * max(min(length(ldst),length(ro)),1.0), 0.01);
        
	}
    
    // dispersión simple
	//sum *= 1. / exp( ld * 0.2 ) * 0.6;
    
     if (uTime <= 20.) {
        sum *= clamp(uTime * 0.05, 0.0, .6) / exp(ld * 0.2) * 0.6;
    } else {
        sum = (sum / exp(ld * 0.1 + .32) * .5);
    }
        
   	sum = clamp( sum, 0.0, 1.0 );
    sum.xyz = sum.xyz*sum.xyz*(3.0-2.0*sum.xyz);
    
	}

   
    #ifdef TONEMAPPING
    gl_FragColor = vec4(ToneMapFilmicALU(sum.xyz*2.2),1.0);
	#else
    gl_FragColor = vec4(sum.xyz,1.0);
	//gl_FragColor = vec4(1.0,1.0,1.0,1.0);
    #endif
}
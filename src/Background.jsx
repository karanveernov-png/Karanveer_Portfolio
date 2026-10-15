// ============================================================================
// PROJECT ABYSS — BACKGROUND ENGINE
// WebGL Ocean Shader + 2D Particle Canvas Overlay
// ============================================================================
import React, { useRef, useEffect } from "react";

// ============================================================================
// REAL-TIME PHYSICALLY INSPIRED OCEAN WEBGL SHADER + 2D FALLBACK
// ============================================================================
const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  varying vec2 v_uv;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_scroll;
  uniform vec2 u_mouse;
  uniform float u_intro;
  uniform float u_octaves;
  uniform float u_fbmOctaves;

  // ── Noise / Hash primitives ──────────────────────────────────────────────
  float hash(vec2 p) {
    p = fract(p * vec2(127.1, 311.7));
    p += dot(p, p + 74.39);
    return fract(p.x * p.y);
  }
  float hash1(float n) { return fract(sin(n) * 43758.5453); }

  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1,0)), u.x),
      mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x), u.y);
  }

  // Value noise derivative (returns vec3: .x=val, .yz=grad)
  vec3 noised(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f*f*(3.0-2.0*f), du = 6.0*f*(1.0-f);
    float a = hash(i), b = hash(i+vec2(1,0));
    float c = hash(i+vec2(0,1)), d = hash(i+vec2(1,1));
    float k0=a, k1=b-a, k2=c-a, k3=a-b-c+d;
    return vec3(k0+k1*u.x+k2*u.y+k3*u.x*u.y,
                du*(vec2(k1+k3*u.y, k2+k3*u.x)));
  }

  // ── Ocean wave elevation (Gerstner-inspired multi-octave) ────────────────
  float seaOctave(vec2 uv, float choppy) {
    uv += noise(uv);
    vec2 wv = 1.0 - abs(sin(uv));
    vec2 sw = abs(cos(uv));
    wv = mix(wv, sw, wv);
    return pow(1.0 - pow(wv.x * wv.y, 0.65), choppy);
  }

  float oceanHeight(vec2 p, float t) {
    float freq=0.55, amp=0.52, choppy=2.6;
    vec2 uv = p;
    float h = 0.0;
    mat2 m = mat2(1.6,1.2,-1.2,1.6);
    for (int i=0;i<6;i++) {
      if (float(i)>=u_octaves) break;
      float d = seaOctave((uv+vec2(t*0.35,-t*0.22))*freq, choppy);
      d += seaOctave((uv-vec2(t*0.28,t*0.19))*freq, choppy);
      h += d*amp;
      uv *= m; freq*=1.85; amp*=0.24; choppy=mix(choppy,1.0,0.2);
    }
    return h;
  }

  // ── Fractional Brownian Motion ───────────────────────────────────────────
  float fbm(vec2 p) {
    float v=0.0, a=0.5;
    mat2 r = mat2(0.80,0.60,-0.60,0.80);
    for (int i=0;i<5;i++) {
      if (float(i)>=u_fbmOctaves) break;
      v += a*noise(p);
      p = r*p*2.02 + vec2(0.11*u_time,-0.07*u_time);
      a *= 0.5;
    }
    return v;
  }

  // ── Physically-based caustics (interference pattern) ────────────────────
  // Two interfering ripple sets produce sharp bright lines – much closer to
  // real underwater caustic patterns than a plain noise product.
  float caustics(vec2 uv, float t) {
    vec2 p1 = uv * 4.8 + vec2( t*0.19, -t*0.13);
    vec2 p2 = uv * 3.5 + vec2(-t*0.15,  t*0.11);
    vec2 p3 = uv * 6.2 - vec2( t*0.09,  t*0.17);

    float v1 = abs(sin(p1.x + noise(p1)*1.4) * sin(p1.y + noise(p1+7.3)*1.4));
    float v2 = abs(sin(p2.x + noise(p2)*1.2) * sin(p2.y + noise(p2+3.7)*1.2));
    float v3 = abs(sin(p3.x + noise(p3)*0.9) * sin(p3.y + noise(p3+5.1)*0.9));

    float c = 1.0 - (v1*v2*v3);
    c = smoothstep(0.55, 0.98, c);
    return c * c;
  }

  // Secondary high-frequency caustic layer for surface shimmering
  float causticsFine(vec2 uv, float t) {
    vec2 p = uv * 9.0 + vec2(t*0.24, -t*0.18);
    float v = abs(sin(p.x+noise(p*1.1)*1.6)*sin(p.y+noise(p*0.9+8.0)*1.6));
    return smoothstep(0.6, 0.98, 1.0 - v) * 0.4;
  }

  // ── Realistic sky model (Preetham-inspired) ──────────────────────────────
  vec3 skyColor(vec2 dir, vec3 sunDir, float nightT) {
    float cosTheta = clamp(dir.y, 0.0, 1.0);
    float cosGamma = clamp(dot(vec3(dir, 0.0), sunDir), -1.0, 1.0);
    float gamma = acos(cosGamma);

    // Rayleigh day sky
    vec3 rayleigh = vec3(0.27, 0.50, 0.89);
    float rPhase = 0.75*(1.0+cosGamma*cosGamma);
    vec3 dayCol = rayleigh * rPhase * (1.0-nightT);

    // Horizon glow (scattering limb)
    float limb = pow(1.0-cosTheta, 4.0);
    dayCol += vec3(0.62, 0.74, 0.82) * limb * 0.38 * (1.0-nightT);

    // Sun disk + halo
    float sunDisk = smoothstep(0.0025, 0.0, gamma-0.03) * (1.0-nightT);
    float sunHalo = exp(-gamma*gamma*18.0) * 0.55 * (1.0-nightT);
    dayCol += vec3(1.0, 0.95, 0.82)*sunDisk + vec3(0.9,0.75,0.55)*sunHalo;

    // Night: dark gradient + stars rendered in main()
    vec3 nightCol = vec3(0.012,0.028,0.062) + cosTheta*vec3(0.02,0.04,0.08);
    return mix(dayCol, nightCol, nightT);
  }

  void main() {
    vec2 uv = v_uv;
    float aspect = u_resolution.x / max(u_resolution.y, 1.0);
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

    // ── Zone blending factors ────────────────────────────────────────────
    float submerge     = smoothstep(0.04, 0.14, u_scroll) * (1.0 - smoothstep(0.72, 0.85, u_scroll));
    float abyssFactor  = smoothstep(0.24, 0.68, u_scroll) * (1.0 - smoothstep(0.72, 0.86, u_scroll));
    float nightBeacon  = smoothstep(0.70, 0.84, u_scroll);
    // 180–540 m range (scroll ~0.13–0.30) — epipelagic/mesopelagic twilight
    float twilightZone = smoothstep(0.11, 0.18, u_scroll) * (1.0 - smoothstep(0.30, 0.38, u_scroll));
    // Surface caustic region (upper ocean when submerged)
    float shallowUW    = smoothstep(0.06, 0.18, u_scroll) * (1.0 - smoothstep(0.22, 0.32, u_scroll));

    // ── Horizon & sun ───────────────────────────────────────────────────
    float horizonY = mix(0.55, 0.49, nightBeacon) + (u_scroll < 0.25 ? u_scroll * 1.05 : 0.0);
    float sunX = mix(0.58, 0.62, nightBeacon) + (u_mouse.x - 0.5)*0.06;
    vec3 sunDir = normalize(vec3(sunX*1.4 - 0.5, 0.28, 1.0));

    // ── Sky ─────────────────────────────────────────────────────────────
    float skyT  = clamp((uv.y - horizonY) / max(1.0-horizonY, 0.001), 0.0, 1.0);
    vec2 skyDir = vec2(p.x, uv.y - horizonY + 0.05);
    vec3 skyCol = skyColor(skyDir / max(length(skyDir),0.001), sunDir, nightBeacon);

    // Stratocumulus cloud layer
    float cn1 = fbm(vec2(p.x*1.1 + u_time*0.009, skyT*4.2));
    float cn2 = fbm(vec2(p.x*2.4 - u_time*0.007 + 3.1, skyT*6.8));
    float clouds = smoothstep(0.44, 0.62, cn1) * 0.22 + smoothstep(0.48, 0.64, cn2)*0.12;
    skyCol = mix(skyCol, vec3(0.82,0.88,0.94)*mix(1.0,0.4,nightBeacon), clouds*(1.0-skyT*0.6));

    // Lighthouse sweep
    float sweepAngle = sin(u_time * 0.52) * 0.65 + 0.35;
    float beamDir = abs((uv.x-(0.5+sunX-0.5))*aspect - (uv.y-horizonY)*sweepAngle*2.8);
    float beamCone = exp(-beamDir*4.2) * exp(-abs(uv.y-horizonY)*4.8);
    float distToBeacon = length(vec2((uv.x-0.5-(sunX-0.5))*aspect, uv.y-horizonY-0.02));
    vec3 lighthouseGlow = (vec3(0.96,0.76,0.46)*exp(-distToBeacon*15.0) +
                           vec3(0.88,0.64,0.36)*beamCone*0.42) * nightBeacon;
    skyCol += lighthouseGlow;

    // Stars
    vec2 starCell = floor(uv * vec2(580.0,330.0));
    float starSeed = hash(starCell);
    float starMask = step(0.9962, starSeed) * smoothstep(0.25,0.75, skyT);
    float twinkle = 0.55 + 0.45*sin(u_time*1.8 + starSeed*62.0);
    skyCol += vec3(0.80,0.88,0.98) * starMask * twinkle * nightBeacon;

    // ── Ocean surface (3-D projected plane) ─────────────────────────────
    float waterDist = max(horizonY - uv.y, 0.0018);
    float perspZ    = 1.0 / waterDist;
    vec2  waterWorld = vec2(p.x * perspZ * 0.26, perspZ * 0.36);

    float eps = 0.024*(1.0 + perspZ*0.04);
    float hC  = oceanHeight(waterWorld, u_time);
    float hX  = oceanHeight(waterWorld + vec2(eps,0), u_time);
    float hZ  = oceanHeight(waterWorld + vec2(0,eps), u_time);

    vec3 N = normalize(vec3((hC-hX)/eps*0.34, 1.0, (hC-hZ)/eps*0.34));
    vec3 V = normalize(vec3(p.x*0.45, max(waterDist*1.4,0.04), 1.0));
    float fresnel = pow(1.0 - clamp(dot(N,V),0.0,1.0), 4.2);

    // Water albedo with sub-surface scattering tint
    vec3 dayWaterDeep    = vec3(0.012, 0.068, 0.128);
    vec3 dayWaterScatter = vec3(0.055, 0.210, 0.295);
    vec3 nightWaterDeep  = vec3(0.006, 0.020, 0.048);
    vec3 nightWaterScat  = vec3(0.020, 0.072, 0.118);
    vec3 waterBase = mix(dayWaterDeep, nightWaterDeep, nightBeacon);
    vec3 waterSSS  = mix(dayWaterScatter, nightWaterScat,  nightBeacon);
    float crestF = smoothstep(0.45,1.15,hC)*(1.0-waterDist*0.65);
    vec3 waterCol = mix(waterBase, waterSSS, crestF);

    // Sky reflection (Fresnel)
    vec3 skyHorizon = mix(vec3(0.52,0.66,0.75), vec3(0.06,0.12,0.20), nightBeacon);
    waterCol = mix(waterCol, skyHorizon*0.92, clamp(fresnel*0.82,0.0,1.0));

    // Specular glint (Blinn-Phong)
    vec3 L = normalize(vec3(sunX*1.8-0.5, 0.28, 1.0));
    vec3 H = normalize(L+V);
    float spec = pow(max(dot(N,H),0.0), 88.0);
    float specCorridor = exp(-abs((uv.x-0.5-(sunX-0.5))*aspect + N.x*0.5)*mix(8.0,14.0,waterDist));
    vec3 daySpec  = vec3(0.94,0.97,1.00)*(spec*1.8+specCorridor*0.42*smoothstep(0.5,1.1,hC))*(1.0-nightBeacon);
    vec3 nightSpec= vec3(0.96,0.74,0.44)*(spec*2.1+specCorridor*0.58*smoothstep(0.5,1.1,hC))*nightBeacon;
    waterCol += daySpec + nightSpec;

    // Whitecap foam
    float steep = length(vec2((hC-hX)/eps,(hC-hZ)/eps));
    float foamM = smoothstep(0.62,1.35,steep)*smoothstep(0.30,0.95,hC);
    float foamD = noise(waterWorld*5.5 + vec2(u_time*0.45,-u_time*0.33));
    foamM *= smoothstep(0.32,0.88,foamD)*(1.0-waterDist*0.4);
    vec3 foamColor = mix(vec3(0.84,0.92,0.96),vec3(0.95,0.80,0.56),nightBeacon*0.5);
    waterCol = mix(waterCol, foamColor, clamp(foamM*0.72,0.0,1.0));

    // Horizon mist
    float hMist = smoothstep(0.0,0.030,abs(uv.y-horizonY));
    vec3 surfaceScene = uv.y > horizonY ? skyCol : waterCol;
    surfaceScene = mix(skyHorizon*mix(0.95,0.50,nightBeacon), surfaceScene, hMist);

    // ── Underwater realm ─────────────────────────────────────────────────
    // Physically accurate Beer-Lambert exponential extinction:
    // Red light absorbed quickest, blue-green penetrates deepest.
    float depth = u_scroll; // proxy for depth 0..1
    vec3 beersExt = exp(-vec3(0.42, 0.14, 0.06) * depth * 12.0);

    // Base underwater ambient (twilight gradient)
    vec3 epipelagicTop  = vec3(0.055, 0.235, 0.330);
    vec3 epipelagicBot  = vec3(0.020, 0.100, 0.175);
    vec3 mesopelagicCol = vec3(0.008, 0.038, 0.078);
    vec3 bathypelagicCol= vec3(0.002, 0.009, 0.022);

    vec3 uwTop = mix(epipelagicTop, mesopelagicCol, smoothstep(0.14,0.50,u_scroll));
    uwTop = mix(uwTop, bathypelagicCol, abyssFactor);
    vec3 uwBot = mix(epipelagicBot, bathypelagicCol, smoothstep(0.17,0.58,u_scroll));
    vec3 uwCol = mix(uwBot, uwTop, pow(uv.y, 1.1));
    uwCol *= beersExt;

    // ── Snell's Window (view upward from underwater) ─────────────────────
    float snellR = 0.78;
    vec2 snellCenter = vec2(0.5 + (u_mouse.x-0.5)*0.08, 0.78);
    float snellDist = length((uv - snellCenter)*vec2(aspect,1.0));
    float snellMask = smoothstep(snellR, snellR-0.06, snellDist);
    // Refracted sky visible through Snell's window (distorted)
    vec2 snellUV = uv + (uv-snellCenter)*0.18*snellMask;
    float snellSky = smoothstep(0.0,0.10, snellUV.y-horizonY+0.02);
    vec3 snellCol = mix(vec3(0.06,0.22,0.36), skyHorizon*0.85, snellSky);
    float snellW = snellMask * (1.0 - abyssFactor*0.95) * shallowUW * 0.70;
    uwCol = mix(uwCol, snellCol, snellW);

    // ── Realistic caustics (two-layer interference) ──────────────────────
    float causticDepth = shallowUW * (1.0 - smoothstep(0.22,0.36,u_scroll));
    float snellFalloff = smoothstep(snellR+0.12, snellR-0.06, snellDist);
    vec2 causticUV = vec2(p.x*1.8, uv.y*2.6);
    float caust = caustics(causticUV, u_time);
    float caustFine = causticsFine(causticUV*1.4, u_time);
    float caustTotal = (caust*0.68 + caustFine*0.32);
    // Brighter caustics right under Snell's window, falls off laterally
    caustTotal *= (0.35 + snellFalloff*0.65);
    uwCol += vec3(0.08,0.30,0.42) * caustTotal * causticDepth * 0.90;

    // ── Volumetric crepuscular god-rays ──────────────────────────────────
    float rayDepth = 1.0 - abyssFactor;
    float rayOriginX = 0.5 + (u_mouse.x-0.5)*0.12;
    // Five discrete ray beams with turbulence
    float godRays = 0.0;
    for (int ri=0; ri<5; ri++) {
      float rOff = float(ri)*0.13 - 0.26;
      float rX = (uv.x - rayOriginX - rOff) * aspect;
      float rDist = rX - (uv.y-0.95)*rOff*0.6;
      float rMod = noise(vec2(rDist*4.0 + float(ri)*2.3, u_time*0.12 + float(ri)*0.8));
      float ray = exp(-abs(rDist)*mix(5.0,9.0, abs(rOff))) * rMod;
      ray *= smoothstep(1.0, 0.35, uv.y);        // fade toward bottom
      ray *= exp(-float(ri)*0.18);               // brighter inner rays
      godRays += ray * (0.6 + rOff*rOff*0.4);
    }
    godRays = pow(clamp(godRays,0.0,1.0), 1.3);
    vec3 rayColor = mix(vec3(0.10,0.38,0.52), vec3(0.04,0.15,0.25), u_scroll*1.5);
    uwCol += rayColor * godRays * 0.60 * rayDepth * shallowUW;

    // ── Marine snow (suspended organic particles) ────────────────────────
    // Three layers at different drift speeds/sizes give parallax depth
    vec2 s1uv = p*3.8  + vec2(u_time*0.016 + noise(p)*0.04, -u_time*0.028 + u_scroll*1.8);
    vec2 s2uv = p*7.2  + vec2(-u_time*0.012, -u_time*0.019 + u_scroll*3.1);
    vec2 s3uv = p*14.0 + vec2(u_time*0.022 + 1.7, -u_time*0.031 + u_scroll*4.5);
    float snow1 = smoothstep(0.970, 0.996, noise(s1uv*5.8));
    float snow2 = smoothstep(0.975, 0.997, noise(s2uv*5.8));
    float snow3 = smoothstep(0.980, 0.998, noise(s3uv*5.8));
    float snowAmt = snow1*0.18 + snow2*0.10 + snow3*0.05;
    vec3 snowCol = mix(vec3(0.60,0.76,0.84), vec3(0.38,0.55,0.68), abyssFactor);
    uwCol += snowCol * snowAmt * (0.30 + 0.70*(1.0-abyssFactor));

    // ── Bathymetric topology contours ─────────────────────────────────────
    float slopeMask = smoothstep(0.45,0.0,uv.y)*smoothstep(0.28,0.65,u_scroll);
    float topo = fbm(vec2(p.x*2.2, uv.y*3.8 - u_scroll*1.5));
    float contour = smoothstep(0.022,0.0,abs(fract(topo*9.0)-0.5));
    uwCol += vec3(0.04,0.14,0.22)*contour*slopeMask*0.18;

    // ── Bioluminescent micro-sparkle (abyss only) ─────────────────────────
    float bioDepth = smoothstep(0.45, 0.65, u_scroll);
    vec2 bioUV = p*18.0 + vec2(u_time*0.06, u_time*0.04);
    float bio = smoothstep(0.984, 0.999, noise(bioUV*3.0));
    float bioPulse = 0.5 + 0.5*sin(u_time*2.1 + hash(floor(bioUV*3.0))*18.0);
    uwCol += vec3(0.10,0.70,0.90)*bio*bioPulse*bioDepth*0.55;

    // ── Compose surface + underwater ─────────────────────────────────────
    vec3 finalCol = mix(surfaceScene, uwCol, submerge);

    // ── Optical lens vignette ─────────────────────────────────────────────
    float vig = smoothstep(1.22, 0.22, length(p*vec2(0.74,0.95)));
    // Extra darken at corners underwater
    vig = mix(vig, vig*vig, submerge*0.5);
    finalCol *= mix(0.66, 1.0, vig);

    // Intro cinematic reveal
    finalCol *= mix(0.28, 1.0, u_intro);

    // ── ACES filmic tonemap ───────────────────────────────────────────────
    finalCol *= 1.14;
    finalCol = (finalCol*(2.51*finalCol+0.03))/(finalCol*(2.43*finalCol+0.59)+0.14);
    finalCol = pow(max(finalCol,0.0), vec3(0.96));

    // Ordered dither (avoids color banding on gradients)
    float dither = (hash(uv*u_resolution + fract(u_time)) - 0.5) / 255.0;
    finalCol += dither * 1.8;

    gl_FragColor = vec4(clamp(finalCol,0.0,1.0), 1.0);
  }
`;

export function OceanicCanvas({ scrollProgress, reducedMotion, introProgress }) {
  const canvasRef = useRef(null);
  const scrollRef = useRef(scrollProgress);
  const introRef = useRef(introProgress);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    introRef.current = introProgress;
  }, [introProgress]);

  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current = {
        x: e.clientX / Math.max(window.innerWidth, 1),
        y: 1.0 - e.clientY / Math.max(window.innerHeight, 1),
      };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", {
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
      }) || canvas.getContext("experimental-webgl");

    let rafId = null;

    if (!gl) {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const render2D = () => {
        const w = (canvas.width = window.innerWidth);
        const h = (canvas.height = window.innerHeight);
        const s = scrollRef.current;
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        if (s < 0.18) {
          grad.addColorStop(0, "#13293d");
          grad.addColorStop(0.45, "#5c7a8c");
          grad.addColorStop(0.46, "#143647");
          grad.addColorStop(1, "#051421");
        } else if (s < 0.82) {
          grad.addColorStop(0, "#072838");
          grad.addColorStop(0.5, "#03121f");
          grad.addColorStop(1, "#01060c");
        } else {
          grad.addColorStop(0, "#040b14");
          grad.addColorStop(0.48, "#182838");
          grad.addColorStop(0.5, "#2b241d");
          grad.addColorStop(1, "#030911");
        }
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
        if (!reducedMotion) {
          rafId = requestAnimationFrame(render2D);
        }
      };
      render2D();
      return () => {
        if (rafId) cancelAnimationFrame(rafId);
      };
    }

    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uScroll = gl.getUniformLocation(program, "u_scroll");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uIntro = gl.getUniformLocation(program, "u_intro");
    const uOctaves = gl.getUniformLocation(program, "u_octaves");
    const uFbmOctaves = gl.getUniformLocation(program, "u_fbmOctaves");

    // Device-tier starting point: phones and low-core-count machines start
    // with fewer wave octaves and a lower internal render resolution, since
    // the sea-state loop is by far the most expensive part of this shader.
    const lowPower =
      window.innerWidth < 768 ||
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
      /Mobi|Android|iPhone/i.test(navigator.userAgent || "");

    let octaves = lowPower ? 3.0 : 6.0;
    let fbmOctaves = lowPower ? 3.0 : 5.0;
    let resScale = lowPower ? 0.82 : 1.0;
    const MIN_RES_SCALE = 0.55;
    const MAX_RES_SCALE = 1.0;
    const MIN_OCTAVES = 2.0;
    const MAX_OCTAVES = 6.0;

    const applyCanvasSize = () => {
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        window.innerWidth < 768 ? 1.0 : 1.5
      );
      const w = Math.max(1, Math.floor(window.innerWidth * dpr * resScale));
      const h = Math.max(1, Math.floor(window.innerHeight * dpr * resScale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    applyCanvasSize();
    window.addEventListener("resize", applyCanvasSize);

    let startTime = performance.now();
    let hiddenAt = 0;
    let smoothScroll = scrollRef.current;

    // Rolling frame-time average with hysteresis: a sustained slow patch
    // trades render resolution, then wave detail, for speed; a sustained
    // fast patch earns fidelity back gradually so quality never thrashes.
    let lastFrameAt = performance.now();
    let avgFrameMs = 16.7;
    let framesSinceAdjust = 0;

    const adjustQuality = () => {
      if (reducedMotion) return;
      framesSinceAdjust++;
      if (framesSinceAdjust < 50) return;
      framesSinceAdjust = 0;
      if (avgFrameMs > 23 && (resScale > MIN_RES_SCALE || octaves > MIN_OCTAVES)) {
        if (resScale > MIN_RES_SCALE) {
          resScale = Math.max(MIN_RES_SCALE, resScale - 0.1);
          applyCanvasSize();
        } else {
          octaves = Math.max(MIN_OCTAVES, octaves - 1);
          fbmOctaves = Math.max(2.0, fbmOctaves - 1);
        }
      } else if (avgFrameMs < 14 && resScale < MAX_RES_SCALE) {
        resScale = Math.min(MAX_RES_SCALE, resScale + 0.08);
        applyCanvasSize();
      }
    };

    const render = (now) => {
      const frameDelta = now - lastFrameAt;
      lastFrameAt = now;
      avgFrameMs += (frameDelta - avgFrameMs) * 0.08;
      adjustQuality();

      const elapsed = reducedMotion ? 12.0 : (now - startTime) * 0.001;
      smoothScroll += (scrollRef.current - smoothScroll) * 0.08;

      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, elapsed);
      gl.uniform1f(uScroll, smoothScroll);
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1f(uIntro, introRef.current);
      gl.uniform1f(uOctaves, octaves);
      gl.uniform1f(uFbmOctaves, fbmOctaves);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafId = requestAnimationFrame(render);
    };

    // Stop driving the GPU entirely while the tab is backgrounded, and
    // shift the clock forward by the hidden duration on return so the
    // ocean doesn't visibly jump when focus comes back.
    const handleVisibility = () => {
      if (document.hidden) {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
        hiddenAt = performance.now();
      } else if (!rafId) {
        if (hiddenAt) startTime += performance.now() - hiddenAt;
        lastFrameAt = performance.now();
        rafId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    rafId = requestAnimationFrame(render);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", applyCanvasSize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
        display: "block",
        willChange: "transform",
      }}
    />
  );
}

// ============================================================================
// OCEAN PARTICLES — Bubbles, fish, jellyfish & marine snow
// Rendered on a 2D canvas overlay, z-indexed above the WebGL canvas.
// Populates the water column from just under the surface through the
// mesopelagic twilight zone, thinning out as the water goes fully dark.
// ============================================================================
export function OceanParticles({ scrollProgress }) {
  const canvasRef = useRef(null);
  const stateRef  = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Lighter creature counts on phones / low-core devices so the extra
    // marine life never costs more than the wave shader already budgets.
    const lowPower =
      window.innerWidth < 768 ||
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
      /Mobi|Android|iPhone/i.test(navigator.userAgent || "");

    // ── Resize ────────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Seed bubbles ──────────────────────────────────────────────────────
    const BUBBLE_COUNT = lowPower ? 34 : 68;
    const bubbles = Array.from({ length: BUBBLE_COUNT }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: 1.2 + Math.random() * 4.2,
      speed: 0.00018 + Math.random() * 0.00042,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.6 + Math.random() * 1.2,
      opacity: 0.12 + Math.random() * 0.28,
      phase: Math.random() * Math.PI * 2,
    }));

    // ── Seed marine snow ─────────────────────────────────────────────────
    // Tiny drifting organic particles — the detritus that gives deep water
    // its sense of volume and depth in real footage.
    const SNOW_COUNT = lowPower ? 22 : 48;
    const snow = Array.from({ length: SNOW_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.5 + Math.random() * 1.3,
      fall: 0.00004 + Math.random() * 0.00009,
      drift: (Math.random() - 0.5) * 0.00006,
      opacity: 0.06 + Math.random() * 0.16,
    }));

    // ── Seed fish ─────────────────────────────────────────────────────────
    // Tiny silhouette fish, realistic proportions. Baitfish spawn in small
    // schools that share a heading and speed, so they read on screen as a
    // coordinated shoal rather than independent singles.
    const FISH_COUNT = lowPower ? 12 : 22;
    const SCHOOL_SIZE = 4;
    let schoolCursor = SCHOOL_SIZE;
    let currentSchool = null;
    const fish = Array.from({ length: FISH_COUNT }, () => {
      const dir = Math.random() > 0.5 ? 1 : -1;
      const type = Math.floor(Math.random() * 3); // 0=baitfish, 1=reef, 2=lanternfish
      const inSchool = type === 0;

      if (inSchool && schoolCursor >= SCHOOL_SIZE) {
        currentSchool = {
          x: Math.random(),
          y: 0.12 + Math.random() * 0.84,
          speed: (0.00014 + Math.random() * 0.00022) * dir,
          dir,
        };
        schoolCursor = 0;
      }
      if (inSchool) schoolCursor++;

      return {
        x: inSchool ? currentSchool.x + (Math.random() - 0.5) * 0.05 : Math.random(),
        y: inSchool
          ? currentSchool.y + (Math.random() - 0.5) * 0.05
          : 0.1 + Math.random() * 0.86,
        speed: inSchool
          ? currentSchool.speed * (0.9 + Math.random() * 0.2)
          : (0.00012 + Math.random() * 0.00026) * dir,
        scale: inSchool ? 8 + Math.random() * 7 : 10 + Math.random() * 26,
        dir: inSchool ? currentSchool.dir : dir,
        bob: Math.random() * Math.PI * 2,
        bobAmp: 0.004 + Math.random() * 0.012,
        bobSpeed: 0.4 + Math.random() * 0.8,
        opacity: 0.16 + Math.random() * 0.34,
        tailPhase: Math.random() * Math.PI * 2,
        type,
      };
    });

    // ── Seed jellyfish ────────────────────────────────────────────────────
    // Slow vertical pulsers with trailing, waving tentacles — bioluminescent
    // enough to stay visible deeper into the dark water than ordinary fish.
    const JELLY_COUNT = lowPower ? 2 : 5;
    const jellies = Array.from({ length: JELLY_COUNT }, () => ({
      x: Math.random(),
      y: 0.12 + Math.random() * 0.8,
      scale: 16 + Math.random() * 20,
      drift: (Math.random() - 0.5) * 0.00014,
      rise: -0.00005 - Math.random() * 0.00007,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.5 + Math.random() * 0.5,
      opacity: 0.2 + Math.random() * 0.3,
      hue: Math.random() > 0.5 ? "teal" : "violet",
      tentacles: 5 + Math.floor(Math.random() * 3),
    }));

    // ── Distant large silhouette (ray) — desktop only, rare & subtle ───────
    const rays = lowPower
      ? []
      : [
          {
            x: -0.2,
            y: 0.3 + Math.random() * 0.3,
            speed: 0.000045,
            scale: 120,
            wingPhase: Math.random() * Math.PI * 2,
            opacity: 0.1,
          },
        ];

    // ── Draw a single fish silhouette ─────────────────────────────────────
    // Each type has a distinct body shape for variety
    const drawFish = (ctx, f, t) => {
      const { x, y, scale, dir, opacity, tailPhase, type } = f;
      const cx = x * canvas.width;
      const cy = y * canvas.height;
      const tailWag = Math.sin(t * 2.8 + tailPhase) * 0.28;

      ctx.save();
      ctx.translate(cx, cy);
      if (dir < 0) ctx.scale(-1, 1);
      ctx.globalAlpha = opacity;

      if (type === 0) {
        // Small baitfish — streamlined teardrop
        ctx.fillStyle = "rgba(160,210,230,1)";
        ctx.beginPath();
        ctx.ellipse(0, 0, scale * 0.52, scale * 0.18, 0, 0, Math.PI * 2);
        ctx.fill();
        // Tail
        ctx.beginPath();
        ctx.moveTo(-scale * 0.48, 0);
        ctx.lineTo(-scale * 0.82, -scale * 0.22 + tailWag * scale);
        ctx.lineTo(-scale * 0.82,  scale * 0.22 + tailWag * scale);
        ctx.closePath();
        ctx.fill();
        // Eye
        ctx.fillStyle = "rgba(20,40,60,0.9)";
        ctx.beginPath();
        ctx.arc(scale * 0.32, -scale * 0.04, scale * 0.06, 0, Math.PI * 2);
        ctx.fill();
      } else if (type === 1) {
        // Mid reef fish — deeper body, dorsal fin
        ctx.fillStyle = "rgba(90,170,195,1)";
        ctx.beginPath();
        ctx.ellipse(0, 0, scale * 0.48, scale * 0.24, 0, 0, Math.PI * 2);
        ctx.fill();
        // Dorsal fin
        ctx.beginPath();
        ctx.moveTo(-scale*0.1, -scale*0.22);
        ctx.quadraticCurveTo(scale*0.12, -scale*0.48, scale*0.28, -scale*0.22);
        ctx.closePath();
        ctx.fill();
        // Tail
        ctx.beginPath();
        ctx.moveTo(-scale*0.42, 0);
        ctx.lineTo(-scale*0.72, -scale*0.28 + tailWag*scale);
        ctx.lineTo(-scale*0.72,  scale*0.28 + tailWag*scale);
        ctx.closePath();
        ctx.fill();
        // Eye
        ctx.fillStyle = "rgba(15,30,50,0.95)";
        ctx.beginPath();
        ctx.arc(scale*0.28, -scale*0.05, scale*0.072, 0, Math.PI*2);
        ctx.fill();
        // Pupil glint
        ctx.fillStyle = "rgba(200,230,250,0.6)";
        ctx.beginPath();
        ctx.arc(scale*0.29, -scale*0.06, scale*0.024, 0, Math.PI*2);
        ctx.fill();
      } else {
        // Lanternfish — elongated, photophore dots
        ctx.fillStyle = "rgba(50,120,160,1)";
        ctx.beginPath();
        ctx.ellipse(0, 0, scale*0.62, scale*0.16, 0, 0, Math.PI*2);
        ctx.fill();
        // Tail fork
        ctx.beginPath();
        ctx.moveTo(-scale*0.58, 0);
        ctx.lineTo(-scale*0.90, -scale*0.20 + tailWag*scale*0.8);
        ctx.lineTo(-scale*0.80, 0);
        ctx.lineTo(-scale*0.90,  scale*0.20 + tailWag*scale*0.8);
        ctx.closePath();
        ctx.fill();
        // Photophore glow dots
        for (let d = 0; d < 5; d++) {
          const px = -scale*0.30 + d*scale*0.12;
          const py =  scale*0.10;
          const pIntensity = 0.4 + 0.6*Math.sin(t*1.6 + d*0.8 + tailPhase);
          ctx.beginPath();
          ctx.arc(px, py, scale*0.028, 0, Math.PI*2);
          ctx.fillStyle = `rgba(80,220,200,${pIntensity*0.85})`;
          ctx.fill();
        }
        // Eye
        ctx.fillStyle = "rgba(10,25,45,0.95)";
        ctx.beginPath();
        ctx.arc(scale*0.44, -scale*0.03, scale*0.065, 0, Math.PI*2);
        ctx.fill();
      }
      ctx.restore();
    };

    // ── Draw a single jellyfish ──────────────────────────────────────────
    // A pulsing bell with soft bioluminescent glow and trailing tentacles
    // that wave independently, drifting slowly upward through the water.
    const drawJellyfish = (ctx, j, t) => {
      const { x, y, scale, opacity, pulsePhase, hue, tentacles } = j;
      const cx = x * canvas.width;
      const cy = y * canvas.height;
      const pulse = 0.82 + Math.sin(t * j.pulseSpeed + pulsePhase) * 0.18;
      const core = hue === "teal" ? "124, 224, 208" : "182, 150, 226";

      ctx.save();
      ctx.translate(cx, cy);
      ctx.globalAlpha = opacity;

      // Soft outer glow
      const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, scale * 1.8 * pulse);
      glow.addColorStop(0, `rgba(${core}, 0.35)`);
      glow.addColorStop(1, `rgba(${core}, 0)`);
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 0, scale * 1.8 * pulse, 0, Math.PI * 2);
      ctx.fill();

      // Bell
      ctx.beginPath();
      ctx.moveTo(-scale * 0.62 * pulse, 0);
      ctx.quadraticCurveTo(-scale * 0.62 * pulse, -scale * 0.95, 0, -scale * 0.98);
      ctx.quadraticCurveTo(scale * 0.62 * pulse, -scale * 0.95, scale * 0.62 * pulse, 0);
      ctx.quadraticCurveTo(0, scale * 0.22, -scale * 0.62 * pulse, 0);
      ctx.closePath();
      ctx.fillStyle = `rgba(${core}, 0.55)`;
      ctx.fill();
      ctx.strokeStyle = `rgba(${core}, 0.8)`;
      ctx.lineWidth = 0.6;
      ctx.stroke();

      // Trailing tentacles
      for (let i = 0; i < tentacles; i++) {
        const tx = (-0.5 + i / (tentacles - 1)) * scale * 0.9;
        const sway = Math.sin(t * 1.3 + pulsePhase + i) * scale * 0.22;
        ctx.beginPath();
        ctx.moveTo(tx, scale * 0.1);
        ctx.quadraticCurveTo(tx + sway * 0.5, scale * 0.9, tx + sway, scale * 1.7);
        ctx.strokeStyle = `rgba(${core}, ${0.4 - i * 0.015})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.restore();
    };

    // ── Draw the distant ray — a slow, wide silhouette for scale ─────────
    const drawRay = (ctx, r, t) => {
      const cx = r.x * canvas.width;
      const cy = r.y * canvas.height;
      const flap = Math.sin(t * 0.6 + r.wingPhase) * 0.22;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.globalAlpha = r.opacity;
      ctx.fillStyle = "rgba(60,100,130,1)";
      ctx.beginPath();
      ctx.moveTo(0, -r.scale * 0.12);
      ctx.quadraticCurveTo(r.scale * 0.5, -r.scale * (0.4 + flap), r.scale * 0.95, 0);
      ctx.quadraticCurveTo(r.scale * 0.5, r.scale * (0.4 - flap), 0, r.scale * 0.12);
      ctx.quadraticCurveTo(-r.scale * 0.5, r.scale * (0.4 - flap), -r.scale * 0.95, 0);
      ctx.quadraticCurveTo(-r.scale * 0.5, -r.scale * (0.4 + flap), 0, -r.scale * 0.12);
      ctx.closePath();
      ctx.fill();
      // Tail
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-r.scale * 1.5, r.scale * 0.04);
      ctx.strokeStyle = "rgba(60,100,130,0.7)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
    };

    // ── Animation loop ─────────────────────────────────────────────────────
    let rafId;
    let startTime = performance.now();

    const render = (now) => {
      const t = (now - startTime) * 0.001;
      const scroll = stateRef.current ?? 0;

      // Ordinary fish & bubbles populate from just under the surface
      // through the mesopelagic twilight zone, fading before full darkness.
      const visibility = Math.max(0,
        Math.min(1, (scroll - 0.035) / 0.05) *
        Math.min(1, (0.58 - scroll) / 0.10)
      );

      // Bioluminescent creatures generate their own light, so they stay
      // visible a little deeper into the dark water than ordinary fish.
      const bioVisibility = Math.max(0,
        Math.min(1, (scroll - 0.05) / 0.07) *
        Math.min(1, (0.70 - scroll) / 0.10)
      );

      const overallVisibility = Math.max(visibility, bioVisibility);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (overallVisibility < 0.005) {
        rafId = requestAnimationFrame(render);
        return;
      }

      const W = canvas.width, H = canvas.height;

      // Marine snow — tiny drifting detritus for a sense of volume
      for (const sp of snow) {
        sp.y += sp.fall;
        sp.x += sp.drift;
        if (sp.y > 1.02) { sp.y = -0.02; sp.x = Math.random(); }
        if (sp.x > 1.02) sp.x = -0.02;
        if (sp.x < -0.02) sp.x = 1.02;
        const alpha = sp.opacity * overallVisibility;
        ctx.beginPath();
        ctx.arc(sp.x * W, sp.y * H, sp.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(190, 215, 225, ${alpha})`;
        ctx.fill();
      }

      // Bubbles
      for (const b of bubbles) {
        b.y -= b.speed;
        b.wobble += b.wobbleSpeed * 0.016;
        if (b.y < -0.02) {
          b.y = 1.02;
          b.x = Math.random();
        }
        const bx = (b.x + Math.sin(b.wobble) * 0.012) * W;
        const by = b.y * H;
        const alpha = b.opacity * visibility;

        // Bubble ring
        ctx.beginPath();
        ctx.arc(bx, by, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(160,220,240,${alpha * 0.9})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Internal highlight (refraction glint)
        ctx.beginPath();
        ctx.arc(bx - b.r*0.28, by - b.r*0.28, b.r*0.32, 0, Math.PI*2);
        ctx.fillStyle = `rgba(230,248,255,${alpha * 0.55})`;
        ctx.fill();

        // Faint fill
        ctx.beginPath();
        ctx.arc(bx, by, b.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100,180,210,${alpha * 0.07})`;
        ctx.fill();
      }

      // Distant ray — slow glide, very subtle, pure scale/atmosphere
      for (const r of rays) {
        r.x += r.speed;
        if (r.x > 1.3) { r.x = -0.3; r.y = 0.2 + Math.random() * 0.4; }
        drawRay(ctx, { ...r, opacity: r.opacity * visibility }, t);
      }

      // Fish
      for (const f of fish) {
        f.x += f.speed;
        f.bob += f.bobSpeed * 0.016;
        if (f.x > 1.12) f.x = -0.12;
        if (f.x < -0.12) f.x = 1.12;

        const origY = f.y;
        f.y += Math.sin(f.bob) * f.bobAmp;
        const fVisibility = f.type === 2 ? bioVisibility : visibility;
        drawFish(ctx, { ...f, opacity: f.opacity * fVisibility }, t);
        f.y = origY;
      }

      // Jellyfish — slow vertical drifters, bioluminescent glow
      for (const j of jellies) {
        j.y += j.rise;
        j.x += j.drift + Math.sin(t * 0.3 + j.pulsePhase) * 0.00004;
        if (j.y < -0.08) { j.y = 1.05; j.x = Math.random(); }
        drawJellyfish(ctx, { ...j, opacity: j.opacity * bioVisibility }, t);
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Keep scroll value accessible in render loop without re-mounting
  useEffect(() => {
    stateRef.current = scrollProgress;
  }, [scrollProgress]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 1,
        display: "block",
      }}
    />
  );
}

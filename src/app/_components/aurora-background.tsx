'use client';

import { useEffect, useRef } from 'react';

const VERTEX = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

// Domain-warped fractal noise: a slow liquid aurora that bends toward the
// cursor, with a faint star field on top. Kept dark so text stays readable.
const FRAGMENT = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_scroll;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = m * p; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  vec2 m = (u_mouse - 0.5) * vec2(u_res.x / u_res.y, 1.0);
  float t = u_time * 0.04;

  // Warp the field toward the cursor.
  vec2 toMouse = m - p;
  p += toMouse * 0.12 * exp(-length(toMouse) * 1.8);

  vec2 q = vec2(fbm(p * 1.4 + t), fbm(p * 1.4 - t + 3.1));
  vec2 r = vec2(fbm(p * 1.4 + 2.0 * q + vec2(1.7, 9.2) + t * 1.3),
                fbm(p * 1.4 + 2.0 * q + vec2(8.3, 2.8) - t));
  float f = fbm(p * 1.4 + 2.5 * r);

  vec3 base   = vec3(0.020, 0.039, 0.082);
  vec3 indigo = vec3(0.26, 0.22, 0.78);
  vec3 cyan   = vec3(0.13, 0.83, 0.93);

  vec3 col = base;
  col = mix(col, indigo * 0.32, smoothstep(0.4, 0.95, f));
  col = mix(col, cyan * 0.36, smoothstep(0.62, 1.05, f * (0.6 + r.x)));
  col += cyan * 0.07 * exp(-length(m - (gl_FragCoord.xy - 0.5 * u_res) / u_res.y) * 3.0);

  // Faint twinkling stars.
  vec2 cell = floor(gl_FragCoord.xy / 3.0);
  float star = step(0.9982, hash(cell)) * (0.5 + 0.5 * sin(u_time * 2.0 + hash(cell + 7.0) * 40.0));
  col += vec3(0.55, 0.85, 1.0) * star * 0.32;

  // Drift the palette slightly as the page scrolls, and darken the edges.
  col = mix(col, col.brg * 1.05, u_scroll * 0.35);
  col *= 1.0 - 0.5 * length(uv - 0.5);

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    return null;
  }
  return shader;
}

/**
 * Full-screen WebGL aurora behind the page. Renders at a fraction of the
 * screen resolution (it's all soft gradients, so nobody can tell) to stay
 * cheap. Reduced motion gets one still frame; no WebGL leaves the CSS
 * gradient underneath.
 */
export default function AuroraBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // A fresh canvas per mount: a context lost in cleanup can't be revived, so
    // reusing one canvas would leave a dead (white) surface after a remount.
    const canvas = document.createElement('canvas');
    canvas.className = 'absolute inset-0 w-full h-full opacity-0 transition-opacity duration-1000';
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl) return;
    container.appendChild(canvas);

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, 'u_res');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uScroll = gl.getUniformLocation(program, 'u_scroll');

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    let frame = 0;

    const resize = () => {
      // Soft gradients survive heavy downscaling; phones get even fewer pixels.
      const scale = window.innerWidth < 768 ? 0.35 : 0.5;
      canvas.width = Math.round(window.innerWidth * scale);
      canvas.height = Math.round(window.innerHeight * scale);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };

    const draw = (now: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      gl.uniform1f(uTime, reduceMotion ? 12 : now / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uScroll, max > 0 ? window.scrollY / max : 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduceMotion) frame = requestAnimationFrame(draw);
    };

    const onPointer = (e: PointerEvent) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = 1 - e.clientY / window.innerHeight;
    };

    resize();
    canvas.style.opacity = '1';
    frame = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    if (!reduceMotion) window.addEventListener('pointermove', onPointer, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      canvas.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 bg-background overflow-hidden pointer-events-none"
    >
      {/* CSS fallback if WebGL is unavailable */}
      <div className="absolute -top-[15%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-indigo-600/10 blur-[160px]" />
    </div>
  );
}

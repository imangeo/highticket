import { useEffect, useRef } from "react";

const VERTEX_SHADER = `#version 300 es
precision highp float;
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;
out vec4 outputColor;
uniform float uTime;
uniform vec2 uResolution;

#define TAU 6.28318530718

mat2 rotate2D(float angle) {
  float sine = sin(angle);
  float cosine = cos(angle);
  return mat2(cosine, -sine, sine, cosine);
}

vec3 spectrum(float value) {
  vec3 phase = vec3(0.02, 0.34, 0.68);
  return 0.52 + 0.48 * cos(TAU * (phase + value));
}

float roundedBox(vec2 point, vec2 size, float radius) {
  vec2 distanceToEdge = abs(point) - size + radius;
  return min(max(distanceToEdge.x, distanceToEdge.y), 0.0) + length(max(distanceToEdge, 0.0)) - radius;
}

void main() {
  float smallestSide = min(uResolution.x, uResolution.y);
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / smallestSide;
  float radius = length(uv);

  float rotation = log(radius + 0.27) * 1.72 - uTime * 0.13;
  vec2 flow = rotate2D(rotation) * uv;

  flow += vec2(
    sin(flow.y * 5.0 + uTime * 0.38),
    cos(flow.x * 4.6 - uTime * 0.31)
  ) * 0.035;

  vec3 color = vec3(0.0);

  for (int index = 0; index < 3; index++) {
    float layer = float(index);
    vec2 position = rotate2D(layer * 2.08 + sin(uTime * 0.08 + layer) * 0.12) * flow;

    float wave = position.x * 7.2 +
      sin(position.y * 4.6 + uTime * (0.42 + layer * 0.07)) * 1.65 +
      sin(position.y * 9.0 - uTime * 0.22 + layer) * 0.38;

    float distanceToLine = abs(sin(wave));
    float glow = 0.014 / max(distanceToLine, 0.018);
    vec3 layerColor = spectrum(layer * 0.205 + uTime * 0.012);
    color += layerColor * glow;
  }

  vec2 gridCoordinates = gl_FragCoord.xy / smallestSide;
  vec2 cell = fract(gridCoordinates * 3.2) - 0.5;
  float boxDistance = abs(roundedBox(cell, vec2(0.39), 0.075));
  float gridGlow = 0.0025 / max(boxDistance, 0.018);

  color += vec3(0.08, 0.13, 0.18) * gridGlow;

  float vignette = 1.0 - smoothstep(0.32, 1.35, radius);
  color *= 0.38 + vignette * 0.82;
  color = 1.0 - exp(-color * 1.18);

  outputColor = vec4(color, 1.0);
}
`;

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Could not create WebGL shader.");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) ?? "Shader compilation failed.";
    gl.deleteShader(shader);
    throw new Error(message);
  }
  return shader;
}

function createProgram(gl) {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  const program = gl.createProgram();
  if (!program) throw new Error("Could not create WebGL program.");

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message =
      gl.getProgramInfoLog(program) ?? "WebGL program linking failed.";
    gl.deleteProgram(program);
    throw new Error(message);
  }
  return program;
}

export default function GlobalPrism({ speed = 1, dprLimit = 2 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
    });

    if (!gl) {
      console.error("WebGL 2 is not supported.");
      return;
    }

    let animationFrame = 0;
    let program = null;
    let buffer = null;
    let vertexArray = null;
    let resizeObserver = null;

    try {
      program = createProgram(gl);
      buffer = gl.createBuffer();
      vertexArray = gl.createVertexArray();

      gl.bindVertexArray(vertexArray);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        gl.STATIC_DRAW,
      );

      const positionLocation = gl.getAttribLocation(program, "aPosition");
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      const timeLocation = gl.getUniformLocation(program, "uTime");
      const resolutionLocation = gl.getUniformLocation(program, "uResolution");

      gl.clearColor(0, 0, 0, 1);

      const resize = () => {
        const bounds = canvas.getBoundingClientRect();
        const pixelRatio = Math.min(
          Math.max(window.devicePixelRatio || 1, 1),
          Math.max(dprLimit, 1),
        );
        const width = Math.max(1, Math.ceil(bounds.width * pixelRatio));
        const canvasHeight = Math.max(1, Math.ceil(bounds.height * pixelRatio));

        if (canvas.width !== width || canvas.height !== canvasHeight) {
          canvas.width = width;
          canvas.height = canvasHeight;
        }
        gl.viewport(0, 0, canvas.width, canvas.height);
      };

      const render = (milliseconds) => {
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(program);
        gl.bindVertexArray(vertexArray);

        if (resolutionLocation) {
          gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
        }
        if (timeLocation) {
          gl.uniform1f(timeLocation, milliseconds * 0.001 * speed);
        }
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      };

      const animate = (milliseconds) => {
        render(milliseconds);
        animationFrame = requestAnimationFrame(animate);
      };

      resize();
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas);

      animationFrame = requestAnimationFrame(animate);
    } catch (error) {
      console.error("GlobalPrism error:", error);
    }

    return () => {
      resizeObserver?.disconnect();
      cancelAnimationFrame(animationFrame);
      if (buffer) gl.deleteBuffer(buffer);
      if (vertexArray) gl.deleteVertexArray(vertexArray);
      if (program) gl.deleteProgram(program);
    };
  }, [dprLimit, speed]);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-black overflow-hidden pointer-events-none">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full block select-none pointer-events-none"
      />
    </div>
  );
}

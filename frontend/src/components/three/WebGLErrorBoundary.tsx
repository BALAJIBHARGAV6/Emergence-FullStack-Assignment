import { Component, type ReactNode } from 'react';

interface Props {
  fallback: ReactNode;
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class WebGLErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('WebGL/Three.js error caught by boundary:', error.message);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/**
 * Bulletproof WebGL availability check.
 * Tests for disabled/sandboxed GPU by inspecting GL_VENDOR, GL_RENDERER,
 * unmasked renderer info, shader compilation, and framebuffer creation.
 * Result is cached after first run.
 */
let _webglResult: boolean | null = null;
export function isWebGLAvailable(): boolean {
  if (_webglResult !== null) return _webglResult;
  try {
    const canvas = document.createElement('canvas');
    const gl = (
      canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: true }) ||
      canvas.getContext('webgl', { failIfMajorPerformanceCaveat: true }) ||
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl')
    ) as WebGLRenderingContext | null;

    if (!gl) {
      _webglResult = false;
      return false;
    }

    // Check masked parameters (GL_VENDOR / GL_RENDERER)
    const vendor = String(gl.getParameter(gl.VENDOR) || '');
    const renderer = String(gl.getParameter(gl.RENDERER) || '');
    if (
      vendor.toLowerCase().includes('disabled') ||
      renderer.toLowerCase().includes('disabled') ||
      renderer.toLowerCase().includes('swiftshader')
    ) {
      _webglResult = false;
      return false;
    }

    // Check unmasked parameters via debug extension
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      const uVendor = String(gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || '');
      const uRenderer = String(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '');
      if (
        uVendor.toLowerCase().includes('disabled') ||
        uRenderer.toLowerCase().includes('disabled')
      ) {
        _webglResult = false;
        return false;
      }
    }

    // Test shader compilation
    const vs = gl.createShader(gl.VERTEX_SHADER);
    if (!vs) { _webglResult = false; return false; }
    gl.shaderSource(vs, 'attribute vec4 p;void main(){gl_Position=p;}');
    gl.compileShader(vs);
    const compiled = gl.getShaderParameter(vs, gl.COMPILE_STATUS);
    gl.deleteShader(vs);
    if (!compiled) { _webglResult = false; return false; }

    // Test framebuffer + texture (actual GPU memory allocation)
    const fb = gl.createFramebuffer();
    const tex = gl.createTexture();
    if (!fb || !tex) { _webglResult = false; return false; }
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    const fbStatus = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    gl.deleteTexture(tex);
    gl.deleteFramebuffer(fb);
    if (fbStatus !== gl.FRAMEBUFFER_COMPLETE) {
      _webglResult = false;
      return false;
    }

    // Check for context lost
    if (gl.isContextLost()) {
      _webglResult = false;
      return false;
    }

    _webglResult = true;
    return true;
  } catch {
    _webglResult = false;
    return false;
  }
}

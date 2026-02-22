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

// Robust WebGL check that actually tests renderer creation
let _webglResult: boolean | null = null;
export function isWebGLAvailable(): boolean {
  if (_webglResult !== null) return _webglResult;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) {
      _webglResult = false;
      return false;
    }
    // Test that we can actually use it (check for sandboxed/disabled GPU)
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      if (typeof renderer === 'string' && renderer.toLowerCase().includes('disabled')) {
        _webglResult = false;
        return false;
      }
    }
    // Try creating a simple shader to verify the context actually works
    const shader = gl.createShader(gl.VERTEX_SHADER);
    if (!shader) {
      _webglResult = false;
      return false;
    }
    gl.deleteShader(shader);
    _webglResult = true;
    return true;
  } catch {
    _webglResult = false;
    return false;
  }
}

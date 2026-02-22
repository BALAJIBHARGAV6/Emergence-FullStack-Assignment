import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Run WebGL check BEFORE React mounts - cache the result globally
import { isWebGLAvailable } from './components/three/WebGLErrorBoundary';
isWebGLAvailable(); // pre-cache so components never attempt Canvas on bad GPU

// Suppress any WebGL errors that slip through (Three.js console.error + throws)
const origConsoleError = console.error;
console.error = (...args: unknown[]) => {
  const msg = typeof args[0] === 'string' ? args[0] : String(args[0] ?? '');
  if (msg.includes('WebGL') || msg.includes('webgl')) return; // swallow
  origConsoleError.apply(console, args);
};

window.addEventListener('error', (event) => {
  if (
    event.message?.includes('WebGL') ||
    event.message?.includes('webgl') ||
    event.message?.includes('THREE')
  ) {
    event.preventDefault();
  }
});

window.addEventListener('unhandledrejection', (event) => {
  const reason = String(event.reason ?? '');
  if (reason.includes('WebGL') || reason.includes('webgl') || reason.includes('THREE')) {
    event.preventDefault();
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

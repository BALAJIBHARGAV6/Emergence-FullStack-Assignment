import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Suppress WebGL context creation errors on devices without GPU support
window.addEventListener('error', (event) => {
  if (
    event.message?.includes('WebGL') ||
    event.message?.includes('webgl')
  ) {
    event.preventDefault();
    console.warn('WebGL not available — using CSS fallback.');
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

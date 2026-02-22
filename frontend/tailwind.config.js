/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          light: '#EFF6FF',
          dark: '#1E40AF',
        },
        accent: {
          green: '#10B981',
          'green-light': '#ECFDF5',
          pink: '#EC4899',
          'pink-light': '#FDF2F8',
        },
        text: {
          primary: '#0F172A',
          secondary: '#475569',
          muted: '#94A3B8',
        },
        border: '#E2E8F0',
      },
      fontFamily: {
        heading: ['Clash Display', 'Syne', 'sans-serif'],
        body: ['General Sans', 'DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        blue: '0 4px 24px rgba(37, 99, 235, 0.08)',
        'blue-lg': '0 8px 40px rgba(37, 99, 235, 0.12)',
      },
    },
  },
  plugins: [],
};

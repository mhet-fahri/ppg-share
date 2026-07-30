/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Poppins"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#e3f2fd',
          100: '#bbdefb',
          200: '#90caf9',
          300: '#64b5f6',
          400: '#42a5f5',
          500: '#2196f3',
          600: '#1E88E5', // Professional Blue
          700: '#1565C0', // Primary Dark
          800: '#0d47a1',
          900: '#0a2472',
        },
        secondary: {
          DEFAULT: '#F5F7FA', // Light Gray Background
        },
        accent: {
          DEFAULT: '#FFD700', // Gold
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      boxShadow: {
        'card': '0 2px 4px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 8px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.08)',
      }
    },
  },
  plugins: [],
}

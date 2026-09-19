/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        dark: {
          bg: '#080c14',
          card: '#0e1524',
          cardHover: '#141d32',
          border: '#1e293b',
          borderHover: '#334155',
          text: '#f8fafc',
          muted: '#94a3b8',
        }
      }
    },
  },
  plugins: [],
}

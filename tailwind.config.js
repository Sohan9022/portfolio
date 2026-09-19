/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        serif: ['Newsreader', 'Georgia', 'serif'],
      },
      colors: {
        paper: {
          DEFAULT: '#FBFBFA',
          subtle: '#F6F6F3',
          card: '#FFFFFF',
          border: '#EAEAE7',
          borderSubtle: '#F0F0EC',
          borderHover: '#D5D5CE',
          tag: '#F1F1EC',
        },
        ink: {
          DEFAULT: '#121214',
          secondary: '#4A4A46',
          muted: '#666663',
          faint: '#9E9E96',
        },
        accent: {
          DEFAULT: '#0F172A',
          blue: '#2563EB',
          emerald: '#059669',
          amber: '#D97706',
          purple: '#7C3AED',
        }
      }
    },
  },
  plugins: [],
}

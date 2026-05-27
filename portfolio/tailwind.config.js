/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        mk: {
          bg: '#F5F0E8',
          yellow: '#FFE500',
          red: '#FF4C39',
          blue: '#1C1CF0',
          ink: '#1A1A1A',
          strip: '#1A1A1A',
        },
        dev: {
          bg: '#0D1117',
          orange: '#F54E00',
          green: '#00FF87',
          muted: '#8B949E',
          surface: '#161B22',
          border: '#30363D',
          text: '#E6EDF3',
        },
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        dmsans: ['"DM Sans"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        jetbrains: ['"JetBrains Mono"', 'monospace'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        blob: 'blob 8s ease-in-out infinite',
        grain: 'grain 0.5s steps(1) infinite',
        marquee: 'marquee 20s linear infinite',
        'cursor-blink': 'blink 1s step-end infinite',
        'dash-flow': 'dashFlow 1.5s linear infinite',
        'pulse-slow': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2%, -3%)' },
          '20%': { transform: 'translate(-4%, 2%)' },
          '30%': { transform: 'translate(3%, -5%)' },
          '40%': { transform: 'translate(-2%, 4%)' },
          '50%': { transform: 'translate(-4%, 3%)' },
          '60%': { transform: 'translate(4%, 0%)' },
          '70%': { transform: 'translate(0, 3%)' },
          '80%': { transform: 'translate(1%, 5%)' },
          '90%': { transform: 'translate(-3%, 2%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        dashFlow: {
          '0%': { strokeDashoffset: '10' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
}

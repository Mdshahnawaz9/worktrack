/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Enable dark mode via class
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',       // Tailwind blue-600
        secondary: '#1E40AF',     // Tailwind blue-800
        accent: '#10B981',        // Tailwind emerald-500
        muted: '#6B7280',         // Tailwind gray-500
        darkBg: '#111827',        // Tailwind gray-900
        lightBg: '#F9FAFB',       // Tailwind gray-50
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        soft: '0 4px 12px rgba(0, 0, 0, 0.1)',
        'soft-dark': '0 4px 12px rgba(255, 255, 255, 0.05)',
      },
    },
  },
  plugins: [],
};

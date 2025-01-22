/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,tx,tsx}'],
  theme: {
    screens: {
      'xs': '420px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography'),
  ],
  daisyui: {
    themes: [
      {
        primary: {
          "primary": "#E1803E",
          "secondary": "#F4A261",
          "accent": "#00A5CF",
          "neutral": "#3A3A3A",
          "base-100": "#1E1E1E",
          "info": "#3B82F6",
          "success": "#2BA84A",
          "warning": "#F59E0B",
          "error": "#DC2626",
        },
      }
    ],
  },
};

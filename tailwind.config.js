/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Adjust the path as needed for your project
    './public/index.html', // If you use Tailwind in HTML files
  ],
   theme: {
    extend: {
      fontFamily: {
        'sf-pro': ['SF Pro Text', 'sans-serif'], // Add the custom font family here
      },
       keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'fade-out': {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.9)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-out': 'fade-out 0.3s ease-in',
      },
      colors: {
        'active-bg': '#F5F3FF',
        'inactive-bg': '#FFFFFF',
        'active-text': '#4F35F3',
        'text-color': '#65676D', // Inactive text color
      },
    },
  },
  plugins: [],
}
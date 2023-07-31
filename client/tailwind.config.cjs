/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: '#10B981', // Or whatever shade of green you want as the default green
          '50': '#F0FDF4', // You can also add different shades
          '100': '#DCFCE7',
          // ... and so on
        }
      }
    }
  },
  plugins: [],
};

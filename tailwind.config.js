/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ajusta esto según la estructura de tu proyecto
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1475E3",
        secondary: "#5F68D9",
        tertiary: "#5F8ED9",
        quaternary: "#B0F5FF",
        alert: "#9649E3",
        senary: "#A0B6D9",
        aquaternary: "#c3cfe2",
        black: "#1A1A1A",
      },
    },
  },
  plugins: [],
};

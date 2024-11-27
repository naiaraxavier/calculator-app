/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      animation: {
        flash: "flash 0.1s ease-out",
      },
      keyframes: {
        flash: {
          "0%": { backgroundColor: "rgba(255, 255, 255, 0.5)" },
          "50%": { backgroundColor: "rgba(255, 255, 255, 1)" },
          "100%": { backgroundColor: "rgba(255, 255, 255, 0.5)" },
        },
      },
    },
  },
  plugins: [],
};

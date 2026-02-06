/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/_layout.tsx", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#25283D",      // main background / text
          primary: "#8F3985",   // main action color
          secondary: "#A675A1", // supporting UI
          accent: "#CEA2AC",    // highlights
          light: "#EFD9CE",     // backgrounds / cards
        },
      }
    },
  },
  plugins: [],
}
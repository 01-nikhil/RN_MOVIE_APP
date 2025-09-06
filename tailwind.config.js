/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary:'#030014',
        secondary:'#151312',
        light:{
          100:'#D6C6FF',
          200:'A8B5DB',
          300:'#9CA4AB'
        },
        dark:{
          100:'#221f3d',
          200:'#0f0d23'
        },
        accent: "#AB8BFF", // the one you gave
        midnight: "#0D1B2A", // deep dark blue
        ocean: "#1B263B", // secondary dark tone
        sky: "#00C6FF", // neon-ish blue for highlights
        royal: "#0072FF", // rich gradient blue
        candy: "#FF61D2", // pink-purple glow
        fire: "#FF9966", // warm orange accent
        gold: "#FFD700", // premium vibe for ratings/stars
      },
      backgroundImage: {
        "gradient-hero":
          "linear-gradient(135deg, #0D1B2A 0%, #1B263B 50%, #0072FF 100%)",
        "gradient-accent":
          "linear-gradient(135deg, #AB8BFF 0%, #00C6FF 100%)",
        "gradient-pop":
          "linear-gradient(135deg, #FF61D2 0%, #FF9966 100%)",
      },
      fontFamily: {
      montserrat: ["MontserratRegular"],
      montserratBold: ["MontserratBold"],
    },
    },
  },
  plugins: [],
};

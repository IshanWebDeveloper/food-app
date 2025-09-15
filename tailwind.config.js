/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        JakartaRegular: ["JakartaRegular"],
        JakartaSemiBold: ["JakartaSemiBold"],
        JakartaBold: ["JakartaBold"],
        JakartaMedium: ["JakartaMedium"],
        JakartaExtraBold: ["JakartaExtraBold"],
        JakartaExtraLight: ["JakartaExtraLight"],
        JakartaLight: ["JakartaLight"],
        LobsterRegular: ["LobsterRegular"],
      },
    },
  },
  plugins: [],
};

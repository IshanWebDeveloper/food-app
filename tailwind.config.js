/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "media", // use system theme; you can switch to "class" if needed
  theme: {
    extend: {
      colors: {
        // brand
        primary: "#00CCBC",
        // light scheme
        light: {
          text: "#1A1A1A",
          label: "#2E3333",
          background: "#FFFFFF",
          background2: "#f9fafa", // very light gray
          inputText: "#000000",
          textSecondary: "#687076",
          borderColor: "#00CCBC",
          borderColor2: "#E2E8F0",
          footerOuterColor: "#2e3333",
          footerInnerColor: "#434848",
          error: "#FF0033",
          tint: "#00CCBC",
          icon: "#687076",
          green: "#4D7C1B",
          buttonPrimary: "#00CCBC",
          buttonSecondary: "#2E3333",
          tabIconDefault: "#9BA1A6",
          tabIconSelected: "#00CCBC",
        },
        // dark scheme
        dark: {
          text: "#ECEDEE",
          background: "#151718",
          tint: "#00CCBC",
          icon: "#9BA1A6",
          buttonPrimary: "#00CCBC",
          buttonSecondary: "#2E3333",
          tabIconDefault: "#9BA1A6",
          tabIconSelected: "#00CCBC",
        },
      },
      fontFamily: {
        IBMPlexSans_100Thin: ["IBMPlexSans_100Thin"],
        IBMPlexSans_100Thin_Italic: ["IBMPlexSans_100Thin_Italic"],
        IBMPlexSans_200ExtraLight: ["IBMPlexSans_200ExtraLight"],
        IBMPlexSans_200ExtraLight_Italic: ["IBMPlexSans_200ExtraLight_Italic"],
        IBMPlexSans_300Light: ["IBMPlexSans_300Light"],
        IBMPlexSans_300Light_Italic: ["IBMPlexSans_300Light_Italic"],
        IBMPlexSans_400Regular: ["IBMPlexSans_400Regular"],
        IBMPlexSans_400Regular_Italic: ["IBMPlexSans_400Regular_Italic"],
        IBMPlexSans_500Medium: ["IBMPlexSans_500Medium"],
        IBMPlexSans_500Medium_Italic: ["IBMPlexSans_500Medium_Italic"],
        IBMPlexSans_600SemiBold: ["IBMPlexSans_600SemiBold"],
        IBMPlexSans_600SemiBold_Italic: ["IBMPlexSans_600SemiBold_Italic"],
        IBMPlexSans_700Bold: ["IBMPlexSans_700Bold"],
        IBMPlexSans_700Bold_Italic: ["IBMPlexSans_700Bold_Italic"],

        // Semantic aliases (optional)
        plexSans: ["IBMPlexSans_400Regular"],
        plexSansItalic: ["IBMPlexSans_400Regular_Italic"],
        plexSansMedium: ["IBMPlexSans_500Medium"],
        plexSansSemiBold: ["IBMPlexSans_600SemiBold"],
        plexSansBold: ["IBMPlexSans_700Bold"],
        plexSansBoldItalic: ["IBMPlexSans_700Bold_Italic"],
        plexSansLight: ["IBMPlexSans_300Light"],
        plexSansThin: ["IBMPlexSans_100Thin"],
        plexSansExtraLight: ["IBMPlexSans_200ExtraLight"],
        plexSansBlack: ["IBMPlexSans_900Black"],
      },
    },
  },
  plugins: [],
};

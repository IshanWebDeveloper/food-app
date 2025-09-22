/**
 * Deliveroo-inspired colour scheme for light and dark mode.
 * Primary brand colour is teal (#00CCBC).
 */

const tintColorLight = "#00CCBC"; // Deliveroo teal
const tintColorDark = "#00CCBC";

export const Colors = {
  light: {
    text: "#1A1A1A", // near black
    primary: "#00CCBC", // Deliveroo teal
    label: "#2E3333", // dark gray
    background: "#FFFFFF",
    background2: "#f9fafa", // very light gray
    inputText: "#000000",
    textSecondary: "#687076", // muted gray
    borderColor: "#00CCBC",
    borderColor2: "#E2E8F0",
    footerOuterColor: "#2e3333",
    footerInnerColor: "#434848",
    error: "#FF0033",
    tint: tintColorLight,
    icon: "#687076",
    green: "#4D7C1B", // rgb(77, 124, 27) to hex
    buttonPrimary: "#00CCBC",
    buttonSecondary: "#2E3333",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#1A1A1A",
    background: "#FFFFFF",
    tint: tintColorDark,
    icon: "#9BA1A6",
    buttonPrimary: "#00CCBC",
    buttonSecondary: "#2E3333",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};

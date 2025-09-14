/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    primary: "#EF2A39",
    label: "#11181C",
    background: "#fff",
    inputText: "#000",
    borderColor: "#E4E4E4",
    error: "#ff0033",
    tint: tintColorLight,
    icon: "#687076",
    button: "#0a7ea4",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    button: "#0a7ea4",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};

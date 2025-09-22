import { AuthProvider } from "@/context/authContext";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import {
  IBMPlexSans_100Thin,
  IBMPlexSans_100Thin_Italic,
  IBMPlexSans_200ExtraLight,
  IBMPlexSans_200ExtraLight_Italic,
  IBMPlexSans_300Light,
  IBMPlexSans_300Light_Italic,
  IBMPlexSans_400Regular,
  IBMPlexSans_400Regular_Italic,
  IBMPlexSans_500Medium,
  IBMPlexSans_500Medium_Italic,
  IBMPlexSans_600SemiBold,
  IBMPlexSans_600SemiBold_Italic,
  IBMPlexSans_700Bold,
  IBMPlexSans_700Bold_Italic,
} from "@expo-google-fonts/ibm-plex-sans";
// Import your global CSS file
import "../global.css";
import { StatusBar } from "expo-status-bar";
/**
 * Root Layout is the highest-level layout in the app, wrapping all other layouts and screens.
 * It provides:
 * 1. Global authentication context via SessionProvider
 * 2. Gesture handling support for the entire app
 * 3. Global styles and configurations
 *
 * This layout affects every screen in the app, including both authenticated
 * and unauthenticated routes.
 */
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
export default function Root() {
  // Set up the auth context and render our layout inside of it.
  const [loaded, error] = useFonts({
    IBMPlexSans_100Thin,
    IBMPlexSans_100Thin_Italic,
    IBMPlexSans_200ExtraLight,
    IBMPlexSans_200ExtraLight_Italic,
    IBMPlexSans_300Light,
    IBMPlexSans_300Light_Italic,
    IBMPlexSans_400Regular,
    IBMPlexSans_400Regular_Italic,
    IBMPlexSans_500Medium,
    IBMPlexSans_500Medium_Italic,
    IBMPlexSans_600SemiBold,
    IBMPlexSans_600SemiBold_Italic,
    IBMPlexSans_700Bold,
    IBMPlexSans_700Bold_Italic,
  });
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  return (
    <ReactQueryProvider>
      <AuthProvider>
        {/* 
        GestureHandlerRootView is required for:
        - Drawer navigation gestures
        - Swipe gestures
        - Other gesture-based interactions
        Must wrap the entire app to function properly
      */}
        <GestureHandlerRootView style={{ flex: 1, padding: 0 }}>
          {/* 
          Slot renders child routes dynamically
          This includes both (app) and (auth) group routes
        */}

          <StatusBar style="dark" translucent />
          <Slot />
        </GestureHandlerRootView>
      </AuthProvider>
    </ReactQueryProvider>
  );
}

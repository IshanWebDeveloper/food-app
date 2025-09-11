import { SessionProvider } from "@/context";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
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
export default function Root() {
  // Set up the auth context and render our layout inside of it.
  const [loaded] = useFonts({
    "Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    "Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    Jakarta: require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  });
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <ReactQueryProvider>
      <SessionProvider>
        {/* 
        GestureHandlerRootView is required for:
        - Drawer navigation gestures
        - Swipe gestures
        - Other gesture-based interactions
        Must wrap the entire app to function properly
      */}
        <GestureHandlerRootView style={{ flex: 1, paddingTop: 0 }}>
          {/* 
          Slot renders child routes dynamically
          This includes both (app) and (auth) group routes
        */}
          <StatusBar style="dark" translucent />
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "none",
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(protected)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </GestureHandlerRootView>
      </SessionProvider>
    </ReactQueryProvider>
  );
}

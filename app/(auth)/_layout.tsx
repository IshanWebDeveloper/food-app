import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
const Layout = () => {
  return (
    <Stack
      screenOptions={{
        statusBarTranslucent: true,
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;

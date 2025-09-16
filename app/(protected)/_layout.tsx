import AntDesign from "@expo/vector-icons/AntDesign";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="food/[id]"
        options={{
          headerShown: true,
          title: "",
          headerTitleAlign: "center",
          headerTransparent: true,
          headerRight: () => (
            <AntDesign name="search1" size={24} color="black" />
          ),
        }}
      />
      <Stack.Screen
        name="order"
        options={{
          headerShown: true,
          title: "",
          headerTitleAlign: "center",
          headerTransparent: true,
          headerRight: () => (
            <AntDesign name="search1" size={24} color="black" />
          ),
        }}
      />
      <Stack.Screen
        name="payment-success-modal"
        options={{
          headerShown: false,
          title: "",
          headerTitleAlign: "center",
          headerTransparent: true,
          headerBackButtonDisplayMode: "default",
          presentation: "transparentModal",
          animation: "fade",
        }}
      />
    </Stack>
  );
};

export default Layout;

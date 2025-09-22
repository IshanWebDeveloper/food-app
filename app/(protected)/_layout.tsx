import AntDesign from "@expo/vector-icons/AntDesign";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack
      initialRouteName="(home)"
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
      }}
    >
      <Stack.Screen name="(home)" options={{ headerShown: false }} />
      <Stack.Screen
        name="food/[id]"
        options={{
          headerShown: false,
          presentation: "modal",
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
    </Stack>
  );
};

export default Layout;

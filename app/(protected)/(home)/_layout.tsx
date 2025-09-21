import { Stack } from "expo-router";
import { Image, ImageSourcePropType, View } from "react-native";
import Header from "@/components/Header";
export const TabIcon = ({
  source,
  focused,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) => (
  <View
    className={`flex flex-row items-center justify-center rounded-full ${
      focused ? " bg-general-300" : ""
    }`}
  >
    <View
      className={`h-12 w-12 items-center justify-center rounded-full ${
        focused ? "bg-general-400" : ""
      }`}
    >
      <Image
        source={source}
        tintColor="white"
        resizeMode="contain"
        className="h-7 w-7"
      />
    </View>
  </View>
);

export default function Layout() {
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerTransparent: true,
        headerShown: true,
        animation: "none",
        header: () => <Header />,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerTitle: "",
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: true,
          presentation: "transparentModal",
        }}
      />

      <Stack.Screen
        name="payment-success-modal"
        options={{
          headerShown: false,
          presentation: "transparentModal",
          animation: "fade",
        }}
      />
    </Stack>
  );
}

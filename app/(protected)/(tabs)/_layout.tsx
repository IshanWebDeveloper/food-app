import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import BackButton from "@/components/BackButton";
const TabIcon = ({
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
    <Tabs
      initialRouteName="home"
      screenOptions={{
        headerTransparent: true,
        headerTitle: "",
        headerShown: true,
        headerLeftContainerStyle: { paddingLeft: 16 },
        headerLeft: () => <BackButton />,
        headerRight: () => (
          <AntDesign name="setting" size={24} color="white" className="mr-4" />
        ),
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          borderRadius: 50,
          paddingBottom: 0, // ios only
          overflow: "hidden",
          marginHorizontal: 20,
          marginBottom: 20,
          height: 78,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
        },
        tabBarItemStyle: {
          borderRadius: 50,
          overflow: "hidden",
          marginHorizontal: 0,
          padding: 0,
          height: 78,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,

          tabBarIcon: ({ focused }) => (
            <AntDesign name="home" size={24} color="black" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          headerShown: true,
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="shoppingcart"
              size={24}
              color="black"
              focused={focused}
            />
          ),
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: true,
          tabBarIcon: ({ focused }) => (
            <AntDesign name="user" size={24} color="black" focused={focused} />
          ),
          tabBarStyle: { display: "none" },
        }}
      />
    </Tabs>
  );
}

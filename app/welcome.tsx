import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import AppLogoName from "@/components/AppLogoName";
import Button from "@/components/Button";
const Home = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-green">
      <LinearGradient
        // Background Linear Gradient
        colors={["#FF939B", "#EF2A39"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        className="absolute top-0 left-0 right-0 bottom-0 rounded-3xl p-4 items-center"
      >
        <View className="flex h-full w-full items-center justify-center relative">
          <AppLogoName textStyle="text-6xl text-white" />

          <Button
            className="flex-row items-center justify-center absolute bottom-20"
            onPress={() => router.push("/sign-in")}
            mode="outlined"
            style={{
              borderColor: "white",
              borderWidth: 0.75,
              backgroundColor: "transparent",
              width: 300,
            }}
          >
            Get Started
          </Button>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Home;

import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import AppLogoName from "@/components/AppLogoName";
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
        <View className="flex h-full w-full items-center justify-center">
          <AppLogoName textStyle="text-6xl" />

          <CustomButton
            title="Get Started"
            onPress={() => router.push("/sign-in")}
            IconRight={() => (
              <Ionicons name="arrow-forward" size={20} color="white" />
            )}
            textVariant="default"
            bgVariant="secondary"
            className="w-[200px] border border-white my-4 p-2 text-white"
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Home;

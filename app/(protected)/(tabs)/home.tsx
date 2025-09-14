import CustomButton from "@/components/CustomButton";
import { AuthContext } from "@/context/authContext";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useRouteInfo, useRouter } from "expo-router/build/hooks";
import { useContext } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { handleSignOut: signOut } = useContext(AuthContext);
  const { authState } = useAuthStore();
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut();
    router.replace("/welcome");
  };
  return (
    <SafeAreaView className="bg-black flex-1">
      <View className="flex-1 p-5">
        <View className="mb-5 flex-row items-center justify-between">
          <Text className="font-JakartaBold text-2xl text-white">
            Hello, {authState.user?.name}
          </Text>
          <CustomButton title="Sign Out" onPress={() => handleSignOut()} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

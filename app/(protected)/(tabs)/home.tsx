import { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const handleSignOut = () => {};

  const [hasPermission, setHasPermission] = useState<boolean>(false);

  return (
    <SafeAreaView className="bg-general-500">
      <View className="flex-1 p-5">
        <View className="mb-5 flex-row items-center justify-between">
          <Text className="font-JakartaBold text-2xl text-white">
            Hello, Ishan
          </Text>
          <TouchableOpacity
            onPress={handleSignOut}
            className="rounded-full bg-white p-2"
          ></TouchableOpacity>
        </View>
      </View>
      s
    </SafeAreaView>
  );
};

export default Home;

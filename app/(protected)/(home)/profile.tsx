import { View, Text, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useContext } from "react";
import Header from "@/components/Header";
import { AuthContext } from "@/context/authContext";
import Toast from "react-native-toast-message";

const Profile = () => {
  const { handleSignOut } = useContext(AuthContext);
  return (
    <View className="flex-1 items-start justify-start flex flex-col bg-white">
      <Header showOnlyCloseButton />
      <View className="flex-1 w-full px-4 py-6 space-y-6">
        {/* Signout button */}
        <TouchableOpacity
          className="px-6 py-4 bg-primary rounded-md"
          onPress={handleSignOut}
        >
          <Text className="text-white text-center text-base font-plexSemiBold">
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

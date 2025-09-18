import { Image } from "react-native";
import React from "react";
import { ThemedView } from "./ThemedView";
import { Colors } from "@/constants/Colors";

interface AppLogoNameProps {
  viewStyle?: string;
  textStyle?: string;
  hideTagline?: boolean;
}

const AppLogoName: React.FC<AppLogoNameProps> = ({ viewStyle }) => {
  return (
    <ThemedView className={`w-[160px] h-12 ${viewStyle} ml-4`}>
      <Image
        source={require("../assets/images/deliveroo.png")}
        tintColor={Colors.light.primary}
        className="w-full h-full"
        resizeMethod="resize"
        resizeMode="cover"
      />
    </ThemedView>
  );
};

export default AppLogoName;

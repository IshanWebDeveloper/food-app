import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface AppLogoNameProps {
  viewStyle?: string;
  textStyle?: string;
  hideTagline?: boolean;
}

const AppLogoName: React.FC<AppLogoNameProps> = ({
  viewStyle,
  textStyle,
  hideTagline = false,
}) => {
  return (
    <View
      className={` h-fit w-fit p-2 items-center justify-center ${viewStyle}`}
    >
      <Text
        className={`mb-2 text-6xl text-white ${textStyle}`}
        style={{ fontFamily: "LobsterRegular" }}
      >
        FoodGo
      </Text>

      {!hideTagline && (
        <View className="mb-2">
          <Text className="text-xl font-normal text-white">
            Delicious food, delivered fast
          </Text>
        </View>
      )}
    </View>
  );
};

export default AppLogoName;

const styles = StyleSheet.create({});

import { View, Text } from "react-native";
import React from "react";

interface TabProps {
  title?: string;
  isActive?: boolean;
}

const Tab = ({ title, isActive }: TabProps) => {
  return (
    <View
      className={`py-[2px] px-4 rounded-2xl border border-gray-200 w-fit h-fit flex justify-center items-center ${isActive ? "bg-primary" : "bg-transparent"}`}
    >
      <Text
        className={`text-base font-plexSansBold ${isActive ? "text-white" : "text-gray-500"}`}
      >
        {title}
      </Text>
    </View>
  );
};

export default Tab;

import { Text, TouchableOpacity } from "react-native";
import React from "react";

interface TabProps {
  title?: string;
  isActive?: boolean;
  onPress?: () => void;
}

const Tab = ({ title, isActive, onPress }: TabProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className={`py-[2px] px-4 rounded-2xl border border-gray-200 w-fit h-fit flex justify-center items-center ${isActive ? "bg-primary" : "bg-transparent"}`}
    >
      <Text
        className={`text-base font-plexSansBold ${isActive ? "text-white" : "text-gray-500"}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Tab;

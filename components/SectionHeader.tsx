import { Text } from "react-native";
import React from "react";
import { ThemedView } from "./ThemedView";

interface SectionHeaderProps {
  title: string;
  isIcon?: boolean;
  icon?: React.ReactNode;
}

const SectionHeader = ({ title, isIcon, icon }: SectionHeaderProps) => {
  return (
    <ThemedView className="flex-row items-center gap-2  px-4 my-6">
      {isIcon && icon}
      <Text className="text-black font-plexSansBold text-lg">{title}</Text>
      {isIcon && icon}
    </ThemedView>
  );
};

export default SectionHeader;

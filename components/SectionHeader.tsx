import { Text, View } from "react-native";
import { memo } from "react";

interface SectionHeaderProps {
  title: string;
  isIcon?: boolean;
}

const SectionHeader = ({ title, isIcon }: SectionHeaderProps) => {
  return (
    <View className="flex-row items-center gap-2  bg-light-background2   px-4 my-6">
      <Text className="text-black dark:text-black font-plexSansBold text-lg">
        {title}
      </Text>
    </View>
  );
};

export default memo(SectionHeader);

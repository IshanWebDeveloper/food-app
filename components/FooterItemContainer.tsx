import { View, Text } from "react-native";
import React from "react";

interface FooterItemContainerProps {
  item: {
    title: string;
    links: {
      label: string;
      href: string;
    }[];
  };
}
const FooterItemContainer = ({ item }: FooterItemContainerProps) => {
  return (
    <View className="w-full h-fit bg-light-footerInnerColor p-6">
      <Text className="text-white dark:text-white text-lg font-plexSansBold mb-2">
        {item.title}
      </Text>
      <View className="flex flex-col gap-2">
        {item.links.map((link, index) => (
          <Text key={index} className="text-white dark:text-white">
            {link.label}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default FooterItemContainer;

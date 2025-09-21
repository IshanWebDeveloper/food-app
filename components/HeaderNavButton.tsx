import { TouchableOpacity } from "react-native";
import React from "react";
import { LinkProps, useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
interface HeaderNavButtonProps {
  link: LinkProps["href"];
  icon: React.ReactNode;
}

const HeaderNavButton = ({ link, icon }: HeaderNavButtonProps) => {
  return (
    <TouchableOpacity
      className="w-[51px]  h-[40px] rounded items-center justify-center  border border-gray-300 "
      onPress={() => DrawerActions.toggleDrawer()}
    >
      {icon}
    </TouchableOpacity>
  );
};

export default HeaderNavButton;

import { TouchableOpacity } from "react-native";
import React from "react";
import { Link, LinkProps } from "expo-router";

interface HeaderNavButtonProps {
  link: LinkProps["href"];
  icon: React.ReactNode;
}

const HeaderNavButton = ({ link, icon }: HeaderNavButtonProps) => {
  return (
    <Link href={link} asChild>
      <TouchableOpacity className="w-[51px]  h-[40px] rounded items-center justify-center  border border-gray-300 ">
        {icon}
      </TouchableOpacity>
    </Link>
  );
};

export default HeaderNavButton;

import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link, LinkProps } from "expo-router";
import { ThemedView } from "./ThemedView";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors";

interface DetailsCardNavProps {
  link: LinkProps["href"];
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  isItChanged?: boolean;
}

const DetailsCardNav = ({
  link,
  icon,
  title,
  subtitle,
  isItChanged,
}: DetailsCardNavProps) => {
  return (
    <Link href={link} asChild>
      <TouchableOpacity
        disabled={isItChanged}
        className="w-full p-3  h-fit flex flex-row rounded items-center justify-start bg-white  "
      >
        {icon}
        <ThemedView className="ml-3">
          <Text className="text-base font-plexSans ">{title}</Text>
          {subtitle && (
            <Text className="text-base font-plexSans">{subtitle}</Text>
          )}
        </ThemedView>
        {isItChanged ? (
          <TouchableOpacity className=" ml-auto rounded-full">
            <Text className=" text-base font-plexSans text-center text-primary">
              Change
            </Text>
          </TouchableOpacity>
        ) : (
          <AntDesign
            name="right"
            size={18}
            color={Colors.light.primary}
            className="ml-auto"
          />
        )}
      </TouchableOpacity>
    </Link>
  );
};

export default DetailsCardNav;

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";

const BackButton = () => {
  const router = useRouter();
  return (
    <TouchableOpacity
      className="p-2 ml-4 rounded-full"
      onPress={() => router.back()}
    >
      <AntDesign name="arrowleft" size={24} color="white" />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({});

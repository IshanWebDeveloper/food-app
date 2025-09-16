import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { int } from "zod";
import AntDesign from "@expo/vector-icons/AntDesign";

interface IncrementDecrementProps {
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
}

const IncrementDecrement = ({
  initialValue = 1,
  min = 1,
  max = 100,
  step = 1,
  onChange,
}: IncrementDecrementProps) => {
  return (
    <View className="flex flex-row items-center justify-between w-fit h-fit p-2 border-gray-300 rounded-lg gap-3 ">
      <TouchableOpacity
        className="p-2 bg-[#EF2A39] rounded-xl"
        onPress={() => onChange?.(Math.max(min, initialValue - step))}
      >
        <AntDesign name="minus" size={16} color="white" />
      </TouchableOpacity>
      <Text className="text-black font-JakartaExtraBold">{initialValue}</Text>
      <TouchableOpacity
        className="p-2 bg-[#EF2A39] rounded-xl"
        onPress={() => onChange?.(Math.min(max, initialValue + step))}
      >
        <AntDesign name="plus" size={16} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default IncrementDecrement;

const styles = StyleSheet.create({});

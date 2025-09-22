import { Text, TouchableOpacity, View } from "react-native";
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
    <View className="flex flex-row items-center  justify-between w-fit h-fit p-2 border-gray-300 rounded-lg gap-3 ">
      <TouchableOpacity
        className="w-6 h-6 flex flex-col items-center justify-center border-[0.25px] rounded-full"
        onPress={() => onChange?.(Math.max(min, initialValue - step))}
      >
        <AntDesign name="minus" size={16} color="black" />
      </TouchableOpacity>
      <Text className="text-black mx-6 font-plexSansBold text-2xl">
        {initialValue}
      </Text>
      <TouchableOpacity
        className="w-6 h-6 flex flex-col items-center justify-center border-[0.25px] rounded-full"
        onPress={() => onChange?.(Math.min(max, initialValue + step))}
      >
        <AntDesign name="plus" size={16} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default IncrementDecrement;

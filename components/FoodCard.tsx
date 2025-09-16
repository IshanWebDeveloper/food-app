import { FoodItem } from "@/types/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface FoodCardProps {
  data: FoodItem;
}

const FoodCard = ({ data }: FoodCardProps) => {
  return (
    <Link
      href={{ pathname: "/(protected)/food/[id]", params: { id: data.id } }}
      asChild
    >
      <TouchableOpacity className="flex flex-1 flex-col m-4 p-4 bg-white rounded-lg shadow-lg shadow-black/25">
        <Image
          source={require("../assets/images/foods/cheeseburger_wendy_burger.png")}
          className="h-32 w-full rounded-lg"
          resizeMode="contain"
        />
        <Text className="text-black font-JakartaBold text-base mt-2">
          {data?.name || "Unknown Food Item"}
        </Text>
        <View className="flex flex-row items-center justify-start mt-1 gap-2">
          <AntDesign name="star" size={16} color="#FF9633" />
          <Text className="text-[#808080] text-base">{data?.rating}</Text>
          <TouchableOpacity onPress={() => {}} className="ml-auto">
            <AntDesign name="hearto" size={16} color="#EF2A39" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default FoodCard;

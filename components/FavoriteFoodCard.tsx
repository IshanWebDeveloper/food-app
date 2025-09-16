import { Image, Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import { FoodItem } from "@/types/types";
import AntDesign from "@expo/vector-icons/AntDesign";

interface FoodCardProps {
  data: FoodItem;
  handleRemoveFavorite: (data: FoodItem) => void;
}
const FavoriteFoodCard = ({ data, handleRemoveFavorite }: FoodCardProps) => {
  return (
    <Link
      href={{ pathname: "/(protected)/food/[id]", params: { id: data.id } }}
      asChild
    >
      <TouchableOpacity
        className={`h-[186px] px-4 py-5 w-full rounded-[20px] flex flex-row items-center justify-start  shadow-md shadow-black/70 bg-slate-100 `}
      >
        <View className="flex flex-col flex-1 h-full justify-between">
          <Image
            source={require("../assets/images/foods/cheeseburger_wendy_burger.png")}
            className="rounded-lg h-full aspect-[1/1] "
            resizeMode="contain"
          />
        </View>
        <View className="flex flex-1 h-full flex-col  ">
          <Text className="font-JakartaBold text-lg">{data.name}</Text>
          <Text
            className="text-[#808080] font-JakartaRegular flex-1 text-sm mt-1"
            numberOfLines={4}
            ellipsizeMode="tail"
          >
            {data.description}
          </Text>
          <View className="flex flex-row w-full items-center  justify-between mt-auto">
            <Text className="font-JakartaBold text-lg">${data.price}</Text>
            <TouchableOpacity
              onPress={() => handleRemoveFavorite(data)}
              className="mt-1"
            >
              <AntDesign name="heart" size={20} color="#EF2A39" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default FavoriteFoodCard;

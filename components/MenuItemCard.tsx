import { FoodItem } from "@/types/types";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface MenuItemCardProps {
  data: FoodItem;
}

const MenuItemCard = ({ data }: MenuItemCardProps) => {
  return (
    <Link
      href={{ pathname: "/(protected)/food/[id]", params: { id: data.id } }}
      asChild
    >
      <TouchableOpacity className="flex w-full h-fit flex-row m-4 p-4 justify-start bg-white rounded-lg shadow-lg shadow-black/25">
        <View className="flex-1 flex-col justify-start">
          <Text className="text-black font-plexSansSemiBold text-sm mt-2">
            {data?.name || "Unknown Food Item"}
          </Text>
          {data?.description ? (
            <Text
              className=" font-plexSans text-base leading-[19px] text-gray-500 mt-1"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {data.description}
            </Text>
          ) : null}
          {data?.calories ? (
            <Text className=" font-plexSans text-sm text-gray-500 mt-1">
              {data.calories} kcal
            </Text>
          ) : null}
          <Text className=" font-plexSans text-base mt-2">
            £{data?.price || "Unknown Food Item"}
          </Text>
        </View>
        <View className="w-[154px] h-[154px] p-4 ml-auto">
          <Image
            source={{
              uri: "https://rs-menus-api.roocdn.com/images/f8ea63d0-6652-46fc-8dce-1f12a6b972db/image.jpeg?width=436.0000064969063&height=246.00000366568565&auto=webp&format=jpg&fit=crop",
            }}
            className=" aspect-square w-full h-full "
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MenuItemCard;

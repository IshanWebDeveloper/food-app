import { MenuItem } from "@/types/types";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { memo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface MenuItemCardProps {
  sectionTitle?: string;
  data: MenuItem;
}

const MenuItemCard = ({ data, sectionTitle }: MenuItemCardProps) => {
  return (
    <Link
      href={{ pathname: "/(protected)/food/[id]", params: { id: data.id } }}
      asChild
    >
      <TouchableOpacity className="flex w-full h-fit flex-row border-b-[0.5px] border-gray-400 p-4  justify-start bg-white rounded-lg shadow-lg shadow-black/25 relative">
        <View className="flex-1 flex-col justify-start">
          <Text className="text-black font-plexSansSemiBold text-sm mt-2">
            {data?.name || "Unknown Food Item"}
          </Text>
          {data?.description && sectionTitle !== "⭐ Meal deals ⭐" ? (
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
        <View className="w-[100px] h-[100px]  ml-auto">
          <Image
            source={{
              uri: "https://rs-menus-api.roocdn.com/images/f8ea63d0-6652-46fc-8dce-1f12a6b972db/image.jpeg?width=436.0000064969063&height=246.00000366568565&auto=webp&format=jpg&fit=crop",
            }}
            className=" w-fit h-[100px] rounded-md"
            resizeMode="cover"
          />
        </View>
        <View
          className="absolute bottom-5 right-2 bg-white w-11 h-11 rounded-full items-center justify-center shadow-lg shadow-black/25"
          style={{ elevation: 5 }}
        >
          <AntDesign name="plus" size={24} color="#e8ebeb" />
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default memo(MenuItemCard);

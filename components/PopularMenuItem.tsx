import { Image, Text, TouchableOpacity, View } from "react-native";
import { TopSellingDishReponse } from "@/hooks/api/reports/useGetTopSellingDishes";
import { memo } from "react";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

interface PopularMenuItemProps {
  item: TopSellingDishReponse | null;
}

const PopularMenuItem = ({ item }: PopularMenuItemProps) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/food/[id]",
          params: { id: item?.id || "unknown" },
        })
      }
      className="w-[124px] h-fit flex flex-col mt-6 bg-white rounded-[4px] shadow-lg shadow-black/25 relative"
    >
      <View className="w-full h-fit  relative">
        <Image
          source={{
            uri: "https://rs-menus-api.roocdn.com/images/14496d3a-4a23-4926-87d9-21cd872d79ad/image.jpeg?width=196.0000029206276&height=196.0000029206276&auto=webp&format=jpg&fit=crop",
          }}
          className="w-full h-[124px] aspect-square"
          resizeMode="cover"
        />
      </View>
      <View className="flex-1 p-2 flex flex-col  items-start gap-1 ">
        <View>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            className=" font-plexSansSemiBold text-sm text-black "
          >
            {item?.name}
          </Text>
        </View>

        <View className="flex-1 flex flex-col justify-end items-start ">
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            className=" font-plexSans text-xs  text-gray-500 "
          >
            {item?.calories} kcal
          </Text>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            className=" font-plexSans text-xs leading-[19px] text-gray-500 "
          >
            {item?.price?.toLocaleString("en-GB", {
              style: "currency",
              currency: "GBP",
            })}
          </Text>
        </View>
      </View>
      <View
        className="absolute top-[90px] right-1 bg-white w-11 h-11 rounded-full items-center justify-center shadow-lg shadow-black/25"
        style={{ elevation: 5 }}
      >
        <AntDesign name="plus" size={24} color="#e8ebeb" />
      </View>
    </TouchableOpacity>
  );
};

export default memo(PopularMenuItem);

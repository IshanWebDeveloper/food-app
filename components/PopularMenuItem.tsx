import { Image, Text, View } from "react-native";
import { TopSellingDishReponse } from "@/hooks/api/reports/useGetTopSellingDishes";
import { ThemedView } from "./ThemedView";

interface PopularMenuItemProps {
  item: TopSellingDishReponse | null;
}

const PopularMenuItem = ({ item }: PopularMenuItemProps) => {
  return (
    <ThemedView className="w-[124px] h-fit flex flex-col mt-6 bg-general-200 rounded-[4px] shadow-lg shadow-black/25">
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
            217 kcal
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
    </ThemedView>
  );
};

export default PopularMenuItem;

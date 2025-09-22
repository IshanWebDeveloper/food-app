import { View, Text, FlatList } from "react-native";
import { TopSellingDishReponse } from "@/hooks/api/reports/useGetTopSellingDishes";
import PopularMenuItem from "./PopularMenuItem";

interface PopularMenuProps {
  dishes: TopSellingDishReponse[] | undefined;
}

const PopularMenu = ({ dishes }: PopularMenuProps) => {
  if (!dishes || dishes.length === 0) {
    return null; // Don't render anything if there are no dishes
  }
  return (
    <View className="w-full h-fit flex flex-col my-6  ">
      <Text className="text-lg font-plexSansBold ">
        Popular with Other People
      </Text>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="space-x-4 py-2"
        ItemSeparatorComponent={() => <View className="w-4" />}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        data={dishes}
        renderItem={({ item }) => <PopularMenuItem item={item} />}
      />
    </View>
  );
};

export default PopularMenu;

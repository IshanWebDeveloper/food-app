import { View, Text, FlatList } from "react-native";
import React from "react";
import { useGetTopSellingDishes } from "@/hooks/api/reports/useGetTopSellingDishes";
import { OrderStatus } from "@/types/common";
import PopularMenuItem from "./PopularMenuItem";

const PopularMenu = () => {
  const { topSellingDishes, isPending } = useGetTopSellingDishes({
    limit: 5,
    status: OrderStatus.DELIVERED,
    metric: "quantity",
    startDate: "2025-09-22",
    endDate: "2025-09-23",
  });

  return (
    <View className="w-full h-fit flex flex-col my-6  ">
      <Text className="text-lg font-plexSansBold">
        Popular with Other People
      </Text>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="space-x-4 py-2"
        ItemSeparatorComponent={() => <View className="w-4" />}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        data={topSellingDishes?.data}
        renderItem={({ item }) => <PopularMenuItem item={item} />}
      />
    </View>
  );
};

export default PopularMenu;

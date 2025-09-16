import AppLogoName from "@/components/AppLogoName";
import FilterSelectItem from "@/components/FilterSelectItem";
import FoodCard from "@/components/FoodCard";
import TextInputWithIcon from "@/components/TextInputWithIcon";
import UserAvatar from "@/components/UserAvatar";
import { useGetAllCategories } from "@/hooks/api/categories/useGetAllCategories";
import { useGetAllFoods } from "@/hooks/api/food/useGetAllFood";
import { useGetUserFavoriteFoods } from "@/hooks/api/user/useGetUserFavoriteFood";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const filterItems = [
  {
    name: "All",
    selected: true,
  },
  {
    name: "Combos",
    selected: false,
  },
  {
    name: "Sliders",
    selected: false,
  },
  {
    name: "Classics",
    selected: false,
  },
];

const Home = () => {
  const { categories } = useGetAllCategories();
  const { foods, refetch } = useGetAllFoods();
  const { userFavoriteFoods } = useGetUserFavoriteFoods();
  const [filters, setFilters] =
    useState<{ name: string; selected: boolean }[]>(filterItems);

  useFocusEffect(
    useCallback(() => {
      // This code runs when the screen is focused
      refetch();

      // Optional: Return a cleanup function
      return () => {
        refetch();
      };
    }, [refetch]), // Empty dependency array means it runs once on focus and cleans up on blur/unmount
  );

  useEffect(() => {
    if (categories) {
      const categoryFilters = categories.map((category, index) => ({
        name: category.name,
        selected: index === 0,
      }));
      setFilters(categoryFilters);
    }
  }, [categories]);

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="flex-1 p-5">
        {/* header */}
        <View className="w-full flex-row justify-between">
          {/* Logo container */}
          <View className=" items-start justify-start rounded-full bg-general-300">
            <AppLogoName hideTagline textStyle="text-black" />
            <Text>
              <Text className="font-normal text-[18px] text-[#6A6A6A]">
                Order your favourite food!
              </Text>
            </Text>
            {/* Avatar */}
          </View>
          <UserAvatar size={73} hideBorder />
        </View>
        {/* form container */}
        <TextInputWithIcon
          iconImage={require("../../../assets/search.png")}
          placeholder="Search for food"
        />
        {/* filter container */}
        {/* Add a FlatList for horizontal scrolling of filter items */}
        <View className="mt-4">
          <FlatList
            data={filters}
            renderItem={({ item, index }) => (
              <FilterSelectItem
                filter={item}
                key={index}
                handleFilterSelect={(filterName: string) => {
                  const updatedFilters = filters.map((filter) =>
                    filter.name === filterName
                      ? { ...filter, selected: true }
                      : { ...filter, selected: false },
                  );
                  setFilters(updatedFilters);
                }}
              />
            )}
            keyExtractor={(item) => item.name}
            className="gap-5"
            horizontal
            ItemSeparatorComponent={() => <View style={{ width: 9 }} />} // 16px gap
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* food cards container */}

        <View className="flex-1 mt-4">
          <FlatList
            data={foods}
            extraData={userFavoriteFoods}
            horizontal={false}
            numColumns={2}
            columnWrapperClassName="gap-4 mb-4"
            renderItem={({ item }) => (
              <FoodCard
                data={item}
                userFavoriteFoods={userFavoriteFoods?.data}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            ListFooterComponent={<View className="h-20" />}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

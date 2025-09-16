import FavoriteFoodCard from "@/components/FavoriteFoodCard";
import { useGetUserFavoriteFoods } from "@/hooks/api/user/useGetUserFavoriteFood";
import { useRemoveFromFavorites } from "@/hooks/api/user/useRemoveFavorite";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Favorites = () => {
  const { userFavoriteFoods, refetch } = useGetUserFavoriteFoods();

  const { removeFromFavorites } = useRemoveFromFavorites();

  const handleRemoveFavorite = async (data: any) => {
    try {
      await removeFromFavorites(data.id);
      refetch();
    } catch (error) {
      console.error("Failed to remove from favorites:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      // This code runs when the screen is focused
      refetch();
      // Optional: Return a cleanup function
      return () => {
        // Cleanup code if needed
      };
    }, [refetch]), // Empty dependency array means it runs once on focus and cleans up on blur/unmount
  );

  return (
    <SafeAreaView className="flex-1 flex-col bg-white">
      <View className="flex-1 mt-2">
        <Text className="font-JakartaBold text-2xl ml-4">
          My Favorite Foods
        </Text>
        {/* header */}
        <View className="flex flex-col mt-20 px-4 pb-20 justify-start">
          <FlatList
            data={userFavoriteFoods?.data || []}
            extraData={userFavoriteFoods?.data}
            keyExtractor={(item) => item.id.toString()}
            contentContainerClassName="gap-[30px] pb-4"
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<View className="h-20" />}
            renderItem={({ item }) => (
              <FavoriteFoodCard
                data={item}
                handleRemoveFavorite={handleRemoveFavorite}
              />
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Favorites;

import { Image, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useGetFoodById } from "@/hooks/api/food/useGetFoodById";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Button from "@/components/Button";
import { useState } from "react";
import IncrementDecrement from "@/components/IncrementDecrement";

const FoodDetail = () => {
  const { id } = useLocalSearchParams();
  const { food, isPending } = useGetFoodById(id as string);
  const [portion, setPortion] = useState(1);
  const router = useRouter();
  const handleOrderNowPress = () => {
    router.push("/(protected)/order");
  };

  if (isPending) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <SafeAreaView className="flex-1 flex-col  bg-white ">
      {/* Image container */}
      <View className="flex-1 flex-col gap-[90px] relative">
        <View className="w-full h-64 mt-20 items-center justify-center bg-general-300">
          <Image
            source={require(`../../../assets/images/foods/cheeseburger_wendy_burger.png`)}
            className="aspect-w-1 h-[400px] rounded-lg"
            resizeMode="contain"
          />
        </View>
        <View className="p-5">
          <Text className="text-2xl font-bold mb-2">
            {food?.name || "Unknown Food Item"}
          </Text>
          <Text className=" flex flex-row items-center">
            <AntDesign name="star" size={16} color="gold" />
            <Text className="text-[#808080]"> {food?.rating || "N/A"} --</Text>
            <Text className="text-[#808080]">
              {" "}
              {food?.preparation_time || "N/A"} mins
            </Text>
          </Text>
          <Text className="text-medium leading-[27px] text-[#6A6A6A] mb-4">
            {food?.description || "No description available."}
          </Text>
          <View className="px-5 w-[150px] self-end">
            <Text className="text-lg font-bold ">Quantity</Text>
            <IncrementDecrement initialValue={portion} onChange={setPortion} />
          </View>
        </View>
        {/* Portion size select */}
        {/* Price  & Order container */}
        <View className="flex flex-row items-center justify-between px-5 gap-12 absolute bottom-5 w-full pb-5 bg-white">
          <View className="p-5 bg-[#EF2A39]  elevation shadow-black/25 rounded-[20px] w-[120px]">
            <Text className="text-[22px] font-bold text-center text-white font-JakartaMedium">
              ${((food?.price || 0) * portion).toFixed(2)}
            </Text>
          </View>
          <Button
            className="flex-1 "
            style={{ backgroundColor: "black" }}
            onPress={handleOrderNowPress}
          >
            <Text className="text-white text-[18px] font-JakartaMedium">
              Order Now
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FoodDetail;

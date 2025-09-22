import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useGetDishById } from "@/hooks/api/dishes/useGetDishById";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Button from "@/components/Button";
import { useState } from "react";
import IncrementDecrement from "@/components/IncrementDecrement";
import { Colors } from "@/constants/Colors";

const FoodDetail = () => {
  const { id } = useLocalSearchParams();
  const { dish, isPending } = useGetDishById(id as string);
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
    <SafeAreaView className="flex-1 flex-col  bg-white relative ">
      {/* Image container */}
      <ScrollView className="flex-1 flex-col  relative">
        <View className="w-full h-[283px]  items-center justify-center bg-general-300 relative">
          <Image
            source={{
              uri: "https://rs-menus-api.roocdn.com/images/a19b0302-e9c1-409c-a206-c786f64e825c/image.jpeg?width=852.0000126957893&height=568.0000084638596&auto=webp&format=jpg&fit=crop",
            }}
            className="w-full h-full"
            resizeMode="cover"
            resizeMethod="resize"
          />
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-2 right-3 bg-white w-12 h-12 rounded-full items-center justify-center shadow-lg shadow-black/25"
            style={{ elevation: 5 }}
          >
            <AntDesign name="close" size={24} color={Colors.light.primary} />
          </TouchableOpacity>
        </View>
        <View className="p-5">
          <Text className="text-xl font-plexSansBold mb-2">
            {dish?.name || "Unknown Food Item"}
          </Text>
          <Text className=" flex flex-row items-center">
            <AntDesign name="star" size={16} color="#4d7c1b" />
            <Text className="text-[#808080]">
              {" "}
              {dish?.rating_description || "N/A"} --
            </Text>
            <Text className="text-[#808080]">
              {" "}
              {dish?.preparation_time || "N/A"} mins
            </Text>
          </Text>
          <Text className="text-medium leading-[27px] text-[#6A6A6A] mb-4">
            {dish?.description || "No description available."}
          </Text>
        </View>
        <View className="p-4 border-[0.25px] m-4 rounded-md flex flex-col items-start   flex-wrap">
          <View className="flex flex-row items-center  gap-2">
            <Text className="text-sm font-plexSans">Contains</Text>
            <Text className="text-sm mr-2 font-plexSansBold ">
              {dish?.ingredients.split(" ").join(", ") || "N/A"}
            </Text>
          </View>
          <Text className="w-full  flex flex-row    flex-wrap">
            <Text className="text-sm font-plexSans pr-1 ">
              Questions about allergens, ingredients or cooking methods?
            </Text>

            <Text className="text-sm pl-1 font-plexSans color-primary underline ">
              {" "}
              Please contact the restaurant directly.
            </Text>
          </Text>
        </View>
      </ScrollView>
      {/* Sticky footer */}
      <View className="w-full p-4 flex flex-col items-center justify-center bg-white border-t-[0.5px] border-t-gray-300 ">
        <IncrementDecrement
          initialValue={portion}
          max={10}
          min={1}
          onChange={setPortion}
        />
        <Button
          style={{
            height: 50,
            backgroundColor: Colors.light.primary,
            borderRadius: 8,
          }}
          onPress={handleOrderNowPress}
          className="w-full mt-4"
        >
          <Text className="text-white font-plexSansBold text-lg">
            Add for{" "}
            {((dish?.price || 0) * portion).toLocaleString("en-GB", {
              style: "currency",
              currency: "GBP",
            })}
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default FoodDetail;

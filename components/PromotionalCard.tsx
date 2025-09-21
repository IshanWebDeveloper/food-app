import { Image, Text, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const PromotionalCard = () => {
  return (
    <ThemedView className="w-[218px] h-fit flex flex-col my-6 bg-general-200 rounded-[4px] shadow-lg shadow-black/25">
      <View className="w-full h-fit border-b-4 border-[#cc3a2f] relative">
        <Image
          source={{
            uri: "https://rs-menus-api.roocdn.com/images/f8ea63d0-6652-46fc-8dce-1f12a6b972db/image.jpeg?width=436.0000064969063&height=246.00000366568565&auto=webp&format=jpg&fit=crop",
          }}
          className="w-full h-[121px]"
          resizeMode="cover"
        />
        <View className="absolute top-2  left-2 bg-red-600 rounded-md w-fit h-8 flex items-center justify-center px-[4px] py-[2px]">
          <Text className=" text-white dark:text-white font-plexSansSemiBold text-sm">
            40% off
          </Text>
        </View>
      </View>
      <ThemedView className="w-full h-fit p-4">
        <ThemedText className="text-black font-plexSansSemiBold text-base ">
          Super Avocado Caesar
        </ThemedText>
        <ThemedText
          numberOfLines={2}
          ellipsizeMode="tail"
          className=" font-plexSans text-sm leading-[19px] text-gray-500 "
        >
          Super Avocado Caesarwith avocado, piri piri dressing, pickled veg and
          rainbow slaw
        </ThemedText>
        <ThemedText
          numberOfLines={2}
          ellipsizeMode="tail"
          className=" font-plexSans text-sm leading-[19px] text-gray-500 "
        >
          217 kcal
        </ThemedText>
        <ThemedText
          numberOfLines={2}
          ellipsizeMode="tail"
          className=" font-plexSans text-sm leading-[19px] text-gray-500 "
        >
          £9.89 • Vegetarian
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

export default PromotionalCard;

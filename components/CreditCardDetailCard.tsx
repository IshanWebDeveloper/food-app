import { Image, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";

export type CreditCardType = "Visa" | "MasterCard" | "Amex";
interface CreditCardDetailCardProps {
  cardType?: CreditCardType;
  selected?: boolean;
  handleSelect?: () => void;
}

const CreditCardDetailCard = ({
  cardType,
  handleSelect,
  selected,
}: CreditCardDetailCardProps) => {
  return (
    <View
      className={`h-20 px-4 py-5 w-full rounded-[20px] flex flex-row items-center justify-start  shadow-md shadow-black/10`}
      style={{
        backgroundColor: cardType === "Visa" ? "#F3F4F6" : "#3C2F2F",
      }}
    >
      <Image
        source={require("../assets/images/master_card_logo.png")}
        className="w-[70px] h-[40px] mr-4"
        resizeMode="contain"
      />
      <View className="flex flex-col gap-2">
        <Text
          className="font-JakartaMedium text-sm"
          style={{ color: cardType === "Visa" ? "black" : "white" }}
        >
          Credit Card
        </Text>
        <Text className="text-[#808080] font-JakartaRegular text-sm">
          5678 1234 **** 5678
        </Text>
      </View>
      <View className="flex-1 flex items-end justify-center">
        <RadioButton
          value={cardType ?? "MasterCard"}
          status={selected ? "checked" : "unchecked"}
          color={cardType === "Visa" ? "black" : "white"}
          uncheckedColor="gray"
          onPress={handleSelect}
        />
      </View>
    </View>
  );
};

export default CreditCardDetailCard;

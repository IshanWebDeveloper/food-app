import CreditCardDetailCard, {
  CreditCardType,
} from "@/components/CreditCardDetailCard";
import { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import Button from "@/components/Button";
const TAX_RATE = parseFloat(process.env.EXPO_PUBLIC_TAX_RATE || "0.07");
const DELIVERY_FEE = parseFloat(process.env.EXPO_PUBLIC_DELIVERY_FEE || "5.00");
const Order = () => {
  const [paymentmethod1, setPaymentMethod1] = useState<{
    cardType: CreditCardType;
    selected: boolean;
  }>({ cardType: "MasterCard", selected: true });
  const [paymentmethod2, setPaymentMethod2] = useState<{
    cardType: CreditCardType;
    selected: boolean;
  }>({ cardType: "Visa", selected: false });

  const handleSelectPaymentMethod = (method: 1 | 2) => {
    if (method === 1) {
      setPaymentMethod1({ ...paymentmethod1, selected: true });
      setPaymentMethod2({ ...paymentmethod2, selected: false });
    } else {
      setPaymentMethod1({ ...paymentmethod1, selected: false });
      setPaymentMethod2({ ...paymentmethod2, selected: true });
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white ">
      <View className="flex-1 mt-20 px-5 py-6 relative">
        <Text className="font-JakartaBold text-xl">Order Summary</Text>
        {/*Summary details  */}
        <View className="flex flex-col pt-9 px-9 justify-between gap-4 ">
          <View className="flex flex-row justify-between ">
            <Text className=" text-[#6A6A6A]">Order</Text>
            <Text className=" text-[#6A6A6A]">$12.99</Text>
          </View>
          <View className="flex flex-row justify-between ">
            <Text className=" text-[#6A6A6A]">Taxes</Text>
            <Text className=" text-[#6A6A6A]">
              ${(12.99 * TAX_RATE).toFixed(2)}
            </Text>
          </View>
          <View className="flex flex-row justify-between ">
            <Text className=" text-[#6A6A6A]">Delivery Fee</Text>
            <Text className=" text-[#6A6A6A]">${DELIVERY_FEE.toFixed(2)}</Text>
          </View>
          <View className="border-b border-gray-300 "></View>
        </View>
        {/* Total  */}
        <View className=" mt-6 flex px-9 flex-col gap-4 ">
          <View className=" flex flex-row justify-between ">
            <Text className=" font-JakartaBold text-lg">Total</Text>
            <Text className=" font-JakartaBold text-lg">
              ${(12.99 + 12.99 * TAX_RATE + DELIVERY_FEE).toFixed(2)}
            </Text>
          </View>
          <View className=" flex flex-row justify-between ">
            <Text>Estimated delivery time:</Text>
            <Text>30 minutes</Text>
          </View>
        </View>
        {/* Payment methods */}
        <View className=" flex flex-col gap-6 ">
          <Text className=" mt-10 font-JakartaBold text-lg">
            Payment Method
          </Text>
          <CreditCardDetailCard
            cardType="MasterCard"
            selected={paymentmethod1.selected}
            handleSelect={handleSelectPaymentMethod.bind(null, 1)}
          />
          <CreditCardDetailCard
            cardType="Visa"
            selected={paymentmethod2.selected}
            handleSelect={handleSelectPaymentMethod.bind(null, 2)}
          />
        </View>
        {/* Actions */}
        <View className=" absolute bottom-0 left-0 right-0 mb-6 ">
          <View className="flex flex-row items-center justify-between px-5 gap-12 absolute bottom-5 w-full pb-5 bg-white">
            <View className="p-5 bg-[#EF2A39]  elevation shadow-black/25 rounded-[20px] w-[120px]">
              <Text className="text-[22px] font-bold text-center text-white font-JakartaMedium">
                ${(12.49).toFixed(2)}
              </Text>
            </View>
            <Button
              className="flex-1 "
              style={{ backgroundColor: "black" }}
              onPress={() => {}}
            >
              <Text className="text-white text-[18px] font-JakartaMedium">
                Pay Now
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Order;

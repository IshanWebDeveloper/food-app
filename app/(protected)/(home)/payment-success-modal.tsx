import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";

const PaymentSuccessModal = () => {
  const router = useRouter();
  return (
    <TouchableOpacity
      className="flex-1 justify-center items-center bg-black/50"
      style={styles.overlay}
      activeOpacity={1}
      onPress={() => {
        router.back();
      }}
    >
      <View className="bg-white p-8 rounded-2xl shadow-lg w-4/5">
        <AntDesign
          name="checkcircleo"
          size={50}
          color="green"
          className="self-center mb-4"
        />
        <Text className="text-2xl font-bold mb-4 text-center">
          Payment Successful!
        </Text>
        <Text className="text-center text-sm mb-6 font-JakartaMedium w-[200px] self-center ">
          Your payment was successful. A receipt for this purchase has been sent
          to your email.
        </Text>
        <TouchableOpacity
          className="bg-green-600 p-4 rounded-lg flex-row justify-center items-center gap-4 "
          onPress={() => {
            router.back();
          }}
        >
          <Text className="text-white mb-[2px] text-center text-sm font-JakartaMedium">
            Done
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default PaymentSuccessModal;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

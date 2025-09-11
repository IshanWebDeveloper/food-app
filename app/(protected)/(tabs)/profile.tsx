import InputField from "@/components/InputField";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="px-5"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Text className="my-5 font-JakartaBold text-2xl">My profile</Text>

        <View className="my-5 flex items-center justify-center"></View>

        <View className="flex flex-col items-start justify-center rounded-lg bg-white px-5 py-3 shadow-sm shadow-neutral-300">
          <View className="flex w-full flex-col items-start justify-start">
            <InputField
              label="First name"
              placeholder={"Ishan Hettiarachchi"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label="Last name"
              placeholder={"Hettiarachchi"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label="Email"
              placeholder={"ishan.hettiarachchi@example.com"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

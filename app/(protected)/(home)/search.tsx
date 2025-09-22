import { View, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import TextInput from "@/components/TextInput";
import { useRouter } from "expo-router";

const Search = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 items-start justify-start bg-white">
      <KeyboardAvoidingView className="w-full px-4 flex flex-row items-center bg-white border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <AntDesign name="arrowleft" size={24} color={Colors.light.primary} />
        </TouchableOpacity>
        <TextInput
          placeholder="Search Restaurant"
          customViewStyle={{
            borderWidth: 0,
            paddingLeft: 0,
            flex: 1,
            marginHorizontal: 0,
          }}
          customInputStyle={{
            width: "100%",
            height: 40,
            padding: 0,
            color: Colors.light.textSecondary,
            backgroundColor: "transparent",
            fontSize: 16,
            fontFamily: "IBMPlexSans_400Regular",
          }}
          placeholderTextColor={Colors.light.textSecondary}
          autoFocus
          outlineStyle={{
            borderWidth: 0,
            borderColor: Colors.light.borderColor,
            borderRadius: 8,
          }}
          inputMode="search"
          keyboardAppearance="default"
          keyboardType="default"
          returnKeyType="search"
        />
      </KeyboardAvoidingView>
      <View className="flex-1 w-full px-4 py-6">
        {/* Render search results here */}
      </View>
    </SafeAreaView>
  );
};

export default Search;

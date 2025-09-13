import AppLogoName from "@/components/AppLogoName";
import AuthLinearGradientWrapper from "@/components/AuthLinearGradientWrapper";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { AuthContext } from "@/context/authContext";
import { Link } from "expo-router";
import { useCallback, useContext, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";

const SignIn = () => {
  const { handleSignIn, isSigningIn } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = useCallback(async () => {
    try {
      if (!form.email || !form.password) {
        Alert.alert("Error", "Please fill in all fields.");
        return;
      }
      await handleSignIn({
        email: form.email,
        password: form.password,
      });
    } catch (error) {
      console.error("Error signing in:", error);
      Alert.alert("Error", "Log in failed. Please try again.");
    }
  }, [form]);

  return (
    <AuthLinearGradientWrapper>
      <ScrollView className="flex-1 bg-transparent">
        <View className="flex-1">
          <View className="relative h-[250px] w-full">
            <AppLogoName />
            <Text className="absolute bottom-5 left-5 font-JakartaSemiBold text-2xl text-white">
              Welcome 👋
            </Text>
          </View>

          <View className="p-5">
            <InputField
              label="Email"
              placeholder="Enter email"
              textContentType="emailAddress"
              value={form.email}
              onChangeText={(value) => setForm({ ...form, email: value })}
            />

            <InputField
              label="Password"
              placeholder="Enter password"
              secureTextEntry={true}
              textContentType="password"
              value={form.password}
              onChangeText={(value) => setForm({ ...form, password: value })}
            />

            <CustomButton
              title={isSigningIn ? "Signing In..." : "Sign In"}
              textVariant="primary"
              onPress={onSignInPress}
              className="p-6 my-3 text-black  bg-blue-400"
            />

            <Link
              href="/sign-up"
              className="mt-10 text-center text-lg text-general-200"
            >
              Don't have an account?{" "}
              <Text className="text-primary-500">Sign Up</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </AuthLinearGradientWrapper>
  );
};

export default SignIn;

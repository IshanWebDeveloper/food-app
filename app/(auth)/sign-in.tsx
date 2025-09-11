import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { useUserSignIn } from "@/hooks/api/auth/useSignIn";
import { Link, router } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";

const SignIn = () => {
  const { signIn, isLoaded } = useUserSignIn();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const res = await signIn({
        email: form.email,
        password: form.password,
      });

      if (res.status === 200) {
        router.replace("/(auth)/welcome");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling for more info on error handling
        console.log(JSON.stringify(res, null, 2));
        Alert.alert("Error", "Log in failed. Please try again.");
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  }, [isLoaded, form]);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative h-[250px] w-full">
          <Text className="absolute bottom-5 left-5 font-JakartaSemiBold text-2xl text-black">
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
            title="Sign In"
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
  );
};

export default SignIn;

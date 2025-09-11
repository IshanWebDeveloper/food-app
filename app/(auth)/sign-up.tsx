import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { useUserSignUp } from "@/hooks/api/auth/useSignup";
import { Link } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, TextInput, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";
import AuthLinearGradientWrapper from "@/components/AuthLinearGradientWrapper";
import { SafeAreaView } from "react-native-safe-area-context";
import AppLogoName from "@/components/AppLogoName";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
// signup schema

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const SignUp = () => {
  const { isLoaded, signUp } = useUserSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Initialize the form with React Hook Form and Zod schema resolver
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    defaultValues: { name: "", email: "", password: "" },
    resolver: zodResolver(signUpSchema),
  });
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const onSignUpPress = async (data: z.infer<typeof signUpSchema>) => {
    Alert.alert("Signing up...");
    try {
      await signUp({
        email: data.email,
        password: data.password,
        name: data.name,
      });
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  return (
    <AuthLinearGradientWrapper>
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1">
          <View className="h-fit w-full bg-white rounded">
            <AppLogoName />
            <Text className="font-JakartaBold text-2xl text-white mt-5 text-center">
              Create Your Account
            </Text>
          </View>
          <View className="p-5 ">
            <View className="my-4 space-y-1">
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputField
                    label="Name"
                    labelStyle="text-white"
                    containerStyle="text-white"
                    placeholder="Enter name"
                    placeholderTextColor={"white"}
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.name && (
                <Text className="text-white text-sm font-semibold">
                  {errors.name.message}
                </Text>
              )}
            </View>

            <View className="my-4 space-y-1">
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputField
                    label="Email"
                    labelStyle="text-white"
                    containerStyle="text-white"
                    placeholder="Enter email"
                    placeholderTextColor={"white"}
                    textContentType="emailAddress"
                    onBlur={onBlur}
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.email && (
                <Text className="text-white text-sm font-normal">
                  {errors.email.message}
                </Text>
              )}
            </View>
            <View className="my-4 space-y-1">
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputField
                    label="Password"
                    labelStyle="text-white"
                    containerStyle="text-white"
                    placeholderTextColor={"white"}
                    placeholder="Enter password"
                    secureTextEntry={true}
                    textContentType="password"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.password && (
                <Text className="text-white text-sm font-normal ">
                  {errors.password.message}
                </Text>
              )}
            </View>
            <CustomButton
              title="Sign Up"
              onPress={handleSubmit(onSignUpPress)}
              className="mt-6"
            />
            <Link
              href="/sign-in"
              className="mt-10 text-center text-lg text-general-200 text-white"
            >
              Already have an account?{" "}
              <Text className="text-primary-500 underline underline-offset-2">
                Log In
              </Text>
            </Link>
          </View>
          <ReactNativeModal
            isVisible={verification.state === "pending"}
            onBackdropPress={() =>
              setVerification({ ...verification, state: "default" })
            }
            onModalHide={() => {
              if (verification.state === "success") {
                setShowSuccessModal(true);
              }
            }}
          >
            <View className="min-h-[300px] rounded-2xl bg-white px-7 py-9">
              <Text className="mb-2 font-JakartaExtraBold text-2xl">
                Verification
              </Text>
              <Text className="mb-5 font-Jakarta">
                We've sent a verification code to {form.email}.
              </Text>
              <InputField
                label={"Code"}
                placeholder={"12345"}
                value={verification.code}
                keyboardType="numeric"
                onChangeText={(code) =>
                  setVerification({ ...verification, code })
                }
              />
              {verification.error && (
                <Text className="mt-1 text-sm text-red-500">
                  {verification.error}
                </Text>
              )}
            </View>
          </ReactNativeModal>
          <ReactNativeModal isVisible={showSuccessModal}>
            <View className="min-h-[300px] rounded-2xl bg-white px-7 py-9">
              {/* <Image
              source={images.check}
              className="mx-auto my-5 h-[110px] w-[110px]"
            /> */}
              <Text className="text-center font-JakartaBold text-3xl">
                Verified
              </Text>
              <Text className="mt-2 text-center font-Jakarta text-base text-gray-400">
                You have successfully verified your account.
              </Text>
              <CustomButton
                title="Browse Home"
                onPress={() => {}}
                className="mt-5"
              />
            </View>
          </ReactNativeModal>
        </ScrollView>
      </SafeAreaView>
    </AuthLinearGradientWrapper>
  );
};
export default SignUp;

import AppLogoName from "@/components/AppLogoName";
import AuthLinearGradientWrapper from "@/components/AuthLinearGradientWrapper";
import Button from "@/components/Button";
import GoogleSignInUpButton from "@/components/GoogleSignInUp";
import TextInput from "@/components/TextInput";
import { Colors } from "@/constants/Colors";
import { AuthContext } from "@/context/authContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { useCallback, useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import z from "zod";

const signInSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const SignIn = () => {
  const { handleSignIn, isSigningIn } = useContext(AuthContext);
  const defaultValues: z.infer<typeof signInSchema> = {
    email: "",
    password: "",
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signInSchema>>({
    defaultValues: defaultValues,
    resolver: zodResolver(signInSchema),
    mode: "all",
    reValidateMode: "onChange",
    resetOptions: { keepDirtyValues: true },
  });

  const onSignInPress = useCallback(
    async (data: z.infer<typeof signInSchema>) => {
      try {
        if (!data.email || !data.password) {
          Alert.alert("Error", "Please fill in all fields.");
          return;
        }
        await handleSignIn({
          email: data.email,
          password: data.password,
        });
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Sign In Failed",
          text2: (error as Error).message,
        });
      }
    },
    [handleSignIn],
  );

  return (
    <AuthLinearGradientWrapper customeStyles="pt-4 px-0 pb-0">
      <AppLogoName />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View
          className="flex flex-col rounded-t-[35px] mt-20 bg-white  p-5 shadow-sm"
          style={{ height: Dimensions.get("window").height }}
        >
          <Controller
            control={control}
            name={"email"}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                labelText={"Email"}
                returnKeyType="next"
                value={value}
                onChangeText={(value) => onChange(value)}
                error={!!errors.email}
                errorText={errors.email?.message}
                onBlur={onBlur}
                autoCapitalize="none"
                textContentType="emailAddress"
                keyboardType="default"
              />
            )}
          />

          <Controller
            control={control}
            name={"password"}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                labelText={"Password"}
                returnKeyType="done"
                value={value}
                onChangeText={(value) => onChange(value)}
                error={!!errors.password}
                errorText={errors.password?.message}
                onBlur={onBlur}
                autoCapitalize="none"
                textContentType="password"
                secureTextEntry
              />
            )}
          />

          <Button
            mode="contained"
            style={{
              backgroundColor: Colors.light.primary,
              height: 60,
            }}
            labelStyle={{ color: "white", fontSize: 18, marginRight: 10 }}
            onPress={handleSubmit(onSignInPress)}
          >
            {isSigningIn ? "Signing In..." : "Sign In"}
          </Button>
          {/* Google Sign In */}
          <GoogleSignInUpButton label="Sign in with Google" />
          <Link
            href="/sign-up"
            className="mt-10 text-center text-lg text-general-200"
          >
            Don't have an account?{" "}
            <Text className="text-primary-500 underline">Sign Up</Text>
          </Link>
        </View>
      </KeyboardAvoidingView>
    </AuthLinearGradientWrapper>
  );
};

export default SignIn;

import { useUserSignUp } from "@/hooks/api/auth/useSignup";
import { Link, useRouter } from "expo-router";
import { useContext } from "react";
import { Alert, Dimensions, ScrollView, Text, View } from "react-native";
import AuthLinearGradientWrapper from "@/components/AuthLinearGradientWrapper";
import AppLogoName from "@/components/AppLogoName";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import Button from "@/components/Button";
import { Colors } from "@/constants/Colors";
import TextInput from "@/components/TextInput";
import { AuthContext } from "@/context/authContext";
// signup schema

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.email("Invalid email address"),
  deliveryAddress: z
    .string({ error: "Delivery address is required" })
    .min(8, "Delivery address must be at least 8 characters long"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters long")
    .regex(/^[0-9]+$/, "Phone number must contain only digits"),
  password: z
    .string({ error: "Password is required" })
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character",
    ),
});

const SignUp = () => {
  const { signUp, isPending } = useUserSignUp();
  const { handleSignIn } = useContext(AuthContext);
  const router = useRouter();
  const defaultValues: z.infer<typeof signUpSchema> = {
    name: "",
    email: "",
    deliveryAddress: "",
    phoneNumber: "",
    password: "",
  };

  // Initialize the form with React Hook Form and Zod schema resolver
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    defaultValues,
    resolver: zodResolver(signUpSchema),
  });

  const onSignUpPress = async (data: z.infer<typeof signUpSchema>) => {
    try {
      const response = await signUp({
        email: data.email,
        password: data.password,
        name: data.name,
        phone_number: data.phoneNumber,
        delivery_address: data.deliveryAddress,
      });
      if (response.status === 201) {
        Alert.alert("Success", "Account created successfully!");
      }
      await handleSignIn({ email: data.email, password: data.password });
      router.replace("/(protected)/(tabs)/home");
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  return (
    <AuthLinearGradientWrapper customeStyles="pt-4 px-0 pb-0">
      <AppLogoName />
      <View>
        <Text className="mt-10 px-5 text-3xl font-bold text-white text-center">
          Create Account
        </Text>
      </View>
      <ScrollView className="flex-1 " showsVerticalScrollIndicator={false}>
        <View
          className="flex flex-col rounded-t-[35px] mt-4 bg-white  p-5 shadow-sm"
          style={{ height: Dimensions.get("screen").height }}
        >
          <Controller
            control={control}
            name={"name"}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                labelText={"Name"}
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
            name={"email"}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                labelText={"email"}
                returnKeyType="done"
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
            name={"deliveryAddress"}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                labelText={"Delivery Address"}
                returnKeyType="done"
                value={value}
                onChangeText={(value) => onChange(value)}
                error={!!errors.deliveryAddress}
                errorText={errors.deliveryAddress?.message}
                onBlur={onBlur}
                autoCapitalize="none"
                textContentType="streetAddressLine1"
                keyboardType="default"
              />
            )}
          />
          <Controller
            control={control}
            name={"phoneNumber"}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                labelText={"Phone Number"}
                returnKeyType="done"
                value={value}
                onChangeText={(value) => onChange(value)}
                error={!!errors.phoneNumber}
                errorText={errors.phoneNumber?.message}
                onBlur={onBlur}
                autoCapitalize="none"
                textContentType="telephoneNumber"
                keyboardType="phone-pad"
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
                keyboardType="default"
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
            onPress={handleSubmit(onSignUpPress)}
          >
            {isPending ? "Creating Account..." : "Sign Up"}
          </Button>

          <Link
            href="/sign-in"
            className="mt-10 text-center text-lg text-general-200"
          >
            Already have an account?{" "}
            <Text className="text-primary-500 underline">Sign In</Text>
          </Link>
        </View>
      </ScrollView>
    </AuthLinearGradientWrapper>
  );
};
export default SignUp;

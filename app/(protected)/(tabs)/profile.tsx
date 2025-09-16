import AuthLinearGradientWrapper from "@/components/AuthLinearGradientWrapper";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { Colors } from "@/constants/Colors";
import { AuthContext } from "@/context/authContext";
import { useEditUserProfile } from "@/hooks/api/user/useEditUserProfile";
import { useAuthStore } from "@/hooks/useAuthStore";
import AntDesign from "@expo/vector-icons/AntDesign";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFocusEffect } from "expo-router";
import { useCallback, useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, View, Image, Alert } from "react-native";
import z from "zod";

const editProfileSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.email({ message: "Email is required" }),
  delivery_address: z
    .string()
    .min(1, { message: "Delivery address is required" }),
  phone_number: z.string().min(1, { message: "Phone number is required" }),
});

const Profile = () => {
  const { handleSignOut } = useContext(AuthContext);
  const {
    authState: { user },
    setAuthState,
  } = useAuthStore();
  const { editProfile } = useEditUserProfile(user?.id || "");

  const defaultValues = {
    name: user?.name || "",
    email: user?.email || "",
    delivery_address: user?.delivery_address || "",
    phone_number: user?.phone_number || "",
  };
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(editProfileSchema),
    mode: "all",
    reValidateMode: "onChange",
    resetOptions: { keepDirtyValues: true },
  });

  useFocusEffect(
    useCallback(() => {
      // Reset form when screen is focused
      reset(defaultValues);
    }, [reset])
  );
  const onEditProfile = useCallback(
    async (data: z.infer<typeof editProfileSchema>) => {
      try {
        await editProfile({
          email: data.email,
          name: data.name, // Placeholder, replace with actual password handling
          delivery_address: data.delivery_address,
          phone_number: data.phone_number,
        });
        Alert.alert("Success", "Profile updated successfully.");
        setAuthState({
          user: {
            id: user?.id || "",
            username: user?.username || "",
            email: data.email,
            name: data.name,
            delivery_address: data.delivery_address,
            phone_number: data.phone_number,
          },
        });
      } catch (error) {
        console.error("Error editing profile:", error);
      }
    },
    [editProfile]
  );
  return (
    <AuthLinearGradientWrapper customeStyles="pt-4 px-0 pb-0">
      <ScrollView>
        {/* Profile image  */}
        <View className="flex items-center justify-center mt-10">
          <View
            className={` aspect-square h-52 rounded-lg  border-4 overflow-hidden`}
            style={{ borderColor: Colors.light.borderColor }}
          >
            {/* Replace with your image component */}
            <Image
              source={require("../../../assets/images/profile_image.jpg")}
              width={96}
              height={96}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
        </View>
        {/* form field container */}
        <View className="flex flex-col  rounded-t-[35px] mt-20  bg-white w-full h-full p-5 shadow-sm shadow-neutral-300">
          <Controller
            control={control}
            name={"name"}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                labelText={"Name"}
                returnKeyType="next"
                value={value}
                onChangeText={(value) => onChange(value)}
                error={!!errors.name}
                errorText={errors.name?.message}
                onBlur={onBlur}
                autoCapitalize="none"
                textContentType="name"
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
            name={"delivery_address"}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                labelText={"Delivery Address"}
                returnKeyType="next"
                value={value}
                onChangeText={(value) => onChange(value)}
                error={!!errors.delivery_address}
                errorText={errors.delivery_address?.message}
                outlineColor={
                  errors.delivery_address?.message
                    ? Colors.light.borderColor2
                    : "#E2E8F0"
                }
                onBlur={onBlur}
                autoCapitalize="none"
                textContentType="addressCity"
                keyboardType="default"
              />
            )}
          />
          <Controller
            control={control}
            name={"phone_number"}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                labelText={"Phone Number"}
                returnKeyType="next"
                value={value}
                onChangeText={(value) => onChange(value)}
                error={!!errors.phone_number}
                errorText={errors.phone_number?.message}
                outlineColor={
                  errors.phone_number?.message
                    ? Colors.light.borderColor2
                    : "#E2E8F0"
                }
                onBlur={onBlur}
                autoCapitalize="none"
                textContentType="telephoneNumber"
                keyboardType="phone-pad"
              />
            )}
          />

          <View className="flex  w-full h-fit flex-row justify-between gap-4 mt-6 ">
            <Button
              mode="outlined"
              style={{ flex: 1, backgroundColor: Colors.light.buttonSecondary }}
              onPress={handleSubmit(onEditProfile)}
            >
              Edit Profile
              <AntDesign name="edit" size={16} color="white" className="ml-2" />
            </Button>
            <Button
              mode="outlined"
              className="flex flex-1 "
              style={{ backgroundColor: "transparent", borderColor: "red" }}
              labelStyle={{
                color: Colors.light.error,
                fontFamily: "JakartaBold",
                fontSize: 18,
                lineHeight: 26,
              }}
              onPress={() => {
                handleSignOut();
              }}
            >
              Log out <AntDesign name="logout" size={18} color="red" />
            </Button>
          </View>
        </View>
      </ScrollView>
    </AuthLinearGradientWrapper>
  );
};

export default Profile;

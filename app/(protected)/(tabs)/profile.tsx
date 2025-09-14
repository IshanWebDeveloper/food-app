import AuthLinearGradientWrapper from "@/components/AuthLinearGradientWrapper";
import TextInput from "@/components/TextInput";
import { Colors } from "@/constants/Colors";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import z from "zod";

const editProfileSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.email({ message: "Email is required" }),
  deliveryAddress: z
    .string()
    .min(1, { message: "Delivery address is required" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const defaultValues = {
  name: "",
  email: "",
  deliveryAddress: "",
  phoneNumber: "",
  password: "",
};

const Profile = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(editProfileSchema),
    mode: "all",
  });

  const onSaveEditProfile = (data: typeof defaultValues) => {
    console.log(data);
  };
  return (
    <AuthLinearGradientWrapper customeStyles="pt-20 px-0 pb-0">
      <ScrollView className="flex-1 ">
        {/* form field container */}
        <View className="flex flex-col  rounded-t-[35px] mt-24  bg-white w-full p-5 shadow-sm shadow-neutral-300 h-screen">
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
        </View>
      </ScrollView>
    </AuthLinearGradientWrapper>
  );
};

export default Profile;

import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Image, TouchableOpacity } from "react-native";

interface UserAvatarProps {
  size?: number;
  hideBorder?: boolean;
}

const UserAvatar = ({ size, hideBorder }: UserAvatarProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push("/profile")}
      className={` aspect-square h-52  border-4 overflow-hidden`}
      style={{
        borderColor: Colors.light.borderColor,
        height: size || 96,
        borderRadius: 6,
      }}
    >
      {/* Replace with your image component */}
      <Image
        source={require("../assets/images/profile_image.jpg")}
        width={size || 96}
        height={size || 96}
        className="w-full h-full"
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

export default UserAvatar;

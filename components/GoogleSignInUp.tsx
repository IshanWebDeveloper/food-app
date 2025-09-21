import useGoogleSignIn from "@/hooks/use-google-signin";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

interface GoogleSignInUpProps {
  label: string;
}

const GoogleSignInUpButton = ({ label }: GoogleSignInUpProps) => {
  const { handleGoogleSignIn } = useGoogleSignIn();
  return (
    <TouchableOpacity
      onPress={handleGoogleSignIn}
      className="mt-6 flex-row items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-md dark:bg-gray-200 w-[90%] self-center p-6 gap-2"
    >
      <Image
        source={require("../assets/images/Google_logo.svg.webp")}
        resizeMode="center"
        style={styles.icon}
      />
      <Text className="font-plexSansMedium text-base dark:text-black text-center">
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default GoogleSignInUpButton;

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
});

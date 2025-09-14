import { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
interface AuthGradientWrapperProps {
  children: ReactNode;
  customeStyles?: string;
}
const AuthLinearGradientWrapper = ({
  children,
  customeStyles,
}: AuthGradientWrapperProps) => {
  return (
    <LinearGradient
      colors={["#FF939B", "#EF2A39"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      className={`flex-1 rounded-[35px] p-4 ${customeStyles}`}
    >
      <SafeAreaView className="flex-1">{children}</SafeAreaView>
    </LinearGradient>
  );
};

export default AuthLinearGradientWrapper;

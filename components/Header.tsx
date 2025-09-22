import { TouchableOpacity, View } from "react-native";
import AppLogoName from "./AppLogoName";
import AntDesign from "@expo/vector-icons/AntDesign";
import HeaderNavButton from "./HeaderNavButton";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";

interface HeaderProps {
  showOnlyCloseButton?: boolean;
}

const Header = ({ showOnlyCloseButton }: HeaderProps) => {
  return (
    <View className="bg-white pt-10 pb-3 pr-4  border-b border-gray-200 w-full h-fit">
      <View className="flex flex-row items-center justify-start pt-2">
        <AppLogoName />
        {!showOnlyCloseButton ? (
          <View className="flex flex-row items-center justify-end flex-1 space-x-6 gap-2">
            <View className="mr-6">
              <HeaderNavButton
                link="/(protected)/(home)/search"
                icon={
                  <AntDesign
                    name="search1"
                    size={18}
                    color={Colors.light.primary}
                  />
                }
              />
            </View>
            <HeaderNavButton
              link="/(protected)/(home)"
              icon={
                <AntDesign name="home" size={18} color={Colors.light.primary} />
              }
            />
            <HeaderNavButton
              link="/(protected)/(home)/profile"
              icon={
                <AntDesign name="user" size={18} color={Colors.light.primary} />
              }
            />
          </View>
        ) : (
          <View className="flex flex-row items-center justify-end flex-1 space-x-6 gap-2">
            <Link href="/(protected)/(home)" asChild>
              <TouchableOpacity hitSlop={20} className="p-2">
                <AntDesign
                  name="close"
                  size={24}
                  color={Colors.light.primary}
                />
              </TouchableOpacity>
            </Link>
          </View>
        )}
      </View>
    </View>
  );
};

export default Header;

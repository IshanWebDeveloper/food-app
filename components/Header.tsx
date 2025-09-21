import { View } from "react-native";
import AppLogoName from "./AppLogoName";
import AntDesign from "@expo/vector-icons/AntDesign";
import HeaderNavButton from "./HeaderNavButton";
import { Colors } from "@/constants/Colors";

const Header = () => {
  return (
    <View className="bg-white pt-10 pb-3 pr-4  border-b border-gray-200 w-full h-fit">
      <View className="flex flex-row items-center justify-start pt-2">
        <AppLogoName />
        <View className="flex flex-row items-center justify-end flex-1 space-x-6 gap-2">
          <View className="mr-6">
            <HeaderNavButton
              link="/(protected)/(home)"
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
            link="/(protected)/(home)"
            icon={
              <AntDesign name="user" size={18} color={Colors.light.primary} />
            }
          />
        </View>
      </View>
    </View>
  );
};

export default Header;

import DetailsCardNav from "@/components/DetailsCardNav";
import FooterItemContainer from "@/components/FooterItemContainer";
import FoodCard from "@/components/MenuItemCard";
import SectionHeader from "@/components/SectionHeader";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useGetAllFoods } from "@/hooks/api/food/useGetAllFood";
import { footerLinks, mockSectionFoodData } from "@/lib/mockData/data";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, useFocusEffect } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
  Animated,
  Image,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import TabHeader from "@/components/TabHeader";
// Note: Filter items and categories-related state removed as they were unused
const Home = () => {
  const { refetch } = useGetAllFoods();

  useFocusEffect(
    useCallback(() => {
      // This code runs when the screen is focused
      refetch();

      // Optional: Return a cleanup function
      return () => {
        refetch();
      };
    }, [refetch]), // Empty dependency array means it runs once on focus and cleans up on blur/unmount
  );
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = useHeaderHeight(); // height of the layout header
  const [inlineBarY, setInlineBarY] = useState(0);
  const [focused, setFocused] = useState<{
    item: any | null;
    sectionTitle?: string;
  } | null>(null);
  const threshold = 500;
  // Show pinned when scroll surpasses threshold
  const pinnedOpacity = scrollY.interpolate({
    inputRange: [threshold - 1, threshold, threshold + 1],
    outputRange: [0, 1, 1],
    extrapolate: "clamp",
  });
  // Hide inline when pinned is visible
  const inlineOpacity = scrollY.interpolate({
    inputRange: [threshold - 1, threshold, threshold + 1],
    outputRange: [1, 0, 0],
    extrapolate: "clamp",
  });

  // Choose when an item counts as "focused" (e.g., 100% visible)
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 35,
  }).current;

  // Stable ref for the callback
  console.log("Focused item:", focused?.sectionTitle);

  const onViewableItemsChanged = useRef(
    (info: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      const candidates = info.viewableItems.filter(
        (v) => v.isViewable && v.item,
      );
      if (candidates.length) {
        // Pick the top-most visible item (handle null index)
        const top = candidates.sort(
          (a, b) => ((a.index ?? 0) as number) - ((b.index ?? 0) as number),
        )[0];
        setFocused({
          item: top.item,
          sectionTitle: (top.section as any)?.title,
        });
      }
    },
  ).current;

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="flex-1">
        {/* Pinned sticky bar under the layout header (appears after it scrolls into view) */}
        <Animated.View
          pointerEvents="box-none"
          style={{
            position: "absolute",
            top: 50,
            left: 0,
            right: 0,
            zIndex: 20,
            opacity: pinnedOpacity,
          }}
          className={"bg-white pt-2 pb-1 border-b border-gray-200"}
        >
          <TabHeader focusSection={focused?.sectionTitle} />
        </Animated.View>

        <Animated.SectionList
          sections={mockSectionFoodData.filter(
            (s) => s.title !== "introduction",
          )}
          keyExtractor={(item, index) => item.id + index}
          stickySectionHeadersEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 0,
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true },
          )}
          viewabilityConfig={viewabilityConfig}
          onViewableItemsChanged={onViewableItemsChanged}
          // Higher value for smoother tracking, at cost of some performance
          scrollEventThrottle={16}
          ListHeaderComponent={
            <>
              {/* Restaurant cover image */}
              <ThemedView className="w-full h-[270px] mb-4 relative">
                <Image
                  source={{
                    uri: "https://rs-menus-api.roocdn.com/images/dd4dceb1-a8c3-45ac-8560-3d9c7cbbad22/image.jpeg?width=812.0000120997429&height=456.0000067949295&auto=webp&format=jpg&fit=crop",
                  }}
                  className="w-full h-full "
                  resizeMode="cover"
                />
                {/* Start group order button */}
                <Link href="/(protected)/(tabs)/home" asChild>
                  <TouchableOpacity className="absolute bottom-4 right-0 px-4 py-2 rounded-full w-[180px] h-fit flex-row items-center space-x-2">
                    <ThemedView className="bg-white flex-1 flex-row items-center p-2 gap-2">
                      <AntDesign
                        name="addusergroup"
                        size={16}
                        color={Colors.light.primary}
                      />
                      <Text className="text-black text-base font-plexSans text-center">
                        Start Group Order
                      </Text>
                    </ThemedView>
                  </TouchableOpacity>
                </Link>
              </ThemedView>

              {/* Details Container */}
              <View className="flex-col ">
                {/* Title and rating */}
                <View className="px-4">
                  <Text className="text-[28px] font-plexSansBold text-black">
                    Tossed - St Martin's Lane
                  </Text>
                  <ThemedView className="flex-col gap-1  mt-1">
                    <Text className="text-base font-plexSans text-black">
                      10 - 20 min • Halal • Salads • Healthy
                    </Text>
                    <Text className="text-base font-plexSans max-w-[80%] text-black">
                      0.20 miles away • Closes at 21:00 • E8.00 minimum •
                      <Text> EO.49 delivery</Text>
                    </Text>
                  </ThemedView>
                  <ThemedView className="flex-col gap-1 mt-2">
                    <DetailsCardNav
                      link="/(protected)/(tabs)/home"
                      title="Info"
                      subtitle="Map, allergens and hygiene rating"
                      icon={
                        <AntDesign
                          name="infocirlceo"
                          size={24}
                          color={Colors.light.tabIconDefault}
                        />
                      }
                    />
                    <DetailsCardNav
                      link="/(protected)/(tabs)/home"
                      title="4.8 Excellent"
                      subtitle="See all 500 reviews"
                      icon={
                        <AntDesign
                          name="star"
                          size={20}
                          color={Colors.light.green}
                        />
                      }
                    />
                    <DetailsCardNav
                      link="/(protected)/(tabs)/home"
                      title="Deliver in 10 - 20 min"
                      isItChanged
                      icon={
                        <Image
                          source={require("../../../assets/images/delivery_rider.png")}
                          className="w-6 h-6"
                        />
                      }
                    />
                  </ThemedView>
                </View>
                {/* Inline sticky bar; measured and hidden once pinned */}
                <Animated.View
                  onLayout={({ nativeEvent: { layout } }) => {
                    setInlineBarY(layout.y);
                  }}
                  style={{ opacity: inlineOpacity }}
                >
                  <TabHeader />
                </Animated.View>
              </View>
            </>
          }
          renderItem={({ item }) => <FoodCard data={item} />}
          renderSectionHeader={({ section }) => {
            const title = section.title;
            if (!title) return null;
            return (
              <SectionHeader
                title={title}
                icon={section.icon}
                isIcon={!!section.icon}
              />
            );
          }}
          // Ensures the section header doesn't overlap content
          // when using sticky headers

          ListFooterComponent={
            <>
              <View className="w-full h-fit bg-light-footerOuterColor dark:bg-dark-footerOuterColor p-4 flex-col gap-4">
                {footerLinks.map((item, index) => (
                  <FooterItemContainer key={index} item={item} />
                ))}
              </View>
              {/* paddingBottom: 100, --- IGNORE --- */}
            </>
          }
        />
      </View>
    </SafeAreaView>
  );
};
export default Home;

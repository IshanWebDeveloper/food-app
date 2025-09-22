import DetailsCardNav from "@/components/DetailsCardNav";
import FooterItemContainer from "@/components/FooterItemContainer";
import SectionHeader from "@/components/SectionHeader";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { footerLinks } from "@/lib/mockData/data";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link } from "expo-router";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  Animated,
  Image,
  SectionList,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { useHeaderHeight } from "@react-navigation/elements";
import TabHeader from "@/components/TabHeader";
import PromotionalCard from "@/components/PromotionalCard";
import MenuItemCard from "@/components/MenuItemCard";
import { useGetAllDishesByCategories } from "@/hooks/api/dishes/useGetDishesByCategories";
import { ThemedText } from "@/components/ThemedText";
import PopularMenu from "@/components/PopularMenu";
import { OrderStatus } from "@/types/common";
import { useGetTopSellingDishes } from "@/hooks/api/reports/useGetTopSellingDishes";

// Note: Filter items and categories-related state removed as they were unused
const Home = () => {
  const { dishesByCategories, isPending } = useGetAllDishesByCategories();

  const { topSellingDishes } = useGetTopSellingDishes({
    limit: 5,
    status: OrderStatus.DELIVERED,
    metric: "quantity",
    startDate: new Date().toISOString().split("T")[0], // Today's date in YYYY-MM-DD format
    endDate: new Date("2025-09-23").toISOString().split("T")[0], // Today's date in YYYY-MM-DD format
  });
  const sectionListRef = useRef<SectionList>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  // const [clickedTabIdx, setClickedTabIdx] = useState<number | null>(null);
  // const headerHeight = useHeaderHeight(); // height of the layout header (unused)
  // const [inlineBarY, setInlineBarY] = useState(0); // measured but not used currently
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
    itemVisiblePercentThreshold: 90,
    minimumViewTime: 250,
    waitForInteraction: true,
  }).current;

  // stable styles and callbacks to avoid re-renders
  const contentContainerStyle = useMemo(
    () => ({
      backgroundColor: Colors.light.background2,
      paddingTop: 0,
    }),
    [],
  );
  const keyExtractor = useCallback(
    (item: { id?: string | number }, index: number) =>
      String(item?.id ?? `idx-${index}`),
    [],
  );

  const onViewableItemsChanged = useRef(
    (info: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      const candidates = info.viewableItems.filter(
        (v) => v.isViewable && v.item,
      );
      if (candidates?.length) {
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

  const handleOnClickTabIdx = (idx: number | null) => {
    console.log("Tab clicked, idx:", idx);
  };
  const sanitizedSections = useMemo(() => {
    if (!dishesByCategories) return [];
    const arr = Array.isArray(dishesByCategories) ? dishesByCategories : [];
    return arr
      .filter((s) => s?.title !== "introduction")
      .map((s) => ({
        ...s,
        data: Array.isArray((s as any).data) ? (s as any).data : [],
        title: s?.title ?? "",
      }));
  }, [dishesByCategories]);

  if (isPending) {
    return null;
  }

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
          <TabHeader
            focusSection={focused?.sectionTitle}
            handleTabPress={handleOnClickTabIdx}
          />
        </Animated.View>

        <Animated.SectionList
          ref={sectionListRef}
          sections={sanitizedSections}
          keyExtractor={(item, number) => keyExtractor(item, number)}
          stickySectionHeadersEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={contentContainerStyle}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true },
          )}
          //perf tuning
          removeClippedSubviews={true}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
          onScrollToIndexFailed={(info) => {
            // info has { index, highestMeasuredFrameIndex, averageItemLength }
            console.warn("Scroll failed:", info);

            // Retry after a short delay with an estimated offset
            setTimeout(() => {
              sectionListRef.current?.scrollToLocation({
                sectionIndex: info.index, // may need mapping
                itemIndex: info.index,
                viewOffset: 600,
              });
            }, 500);
          }}
          updateCellsBatchingPeriod={50}
          viewabilityConfig={viewabilityConfig}
          onViewableItemsChanged={onViewableItemsChanged}
          // Higher value for smoother tracking, at cost of some performance
          scrollEventThrottle={16}
          ListHeaderComponent={
            <>
              {/* Restaurant cover image */}
              <ThemedView className="w-full h-[270px] mb-4 relative dark:bg-white">
                <Image
                  source={{
                    uri: "https://rs-menus-api.roocdn.com/images/dd4dceb1-a8c3-45ac-8560-3d9c7cbbad22/image.jpeg?width=812.0000120997429&height=456.0000067949295&auto=webp&format=jpg&fit=crop",
                  }}
                  className="w-full h-full "
                  resizeMode="cover"
                />
                {/* Start group order button */}
                <Link href="/(protected)/(home)" asChild>
                  <TouchableOpacity className="absolute bottom-4 right-0 px-4 py-2 rounded-full w-[200px] h-fit flex-row items-center space-x-2">
                    <ThemedView className="  flex-1 flex-row items-center p-2 gap-2">
                      <AntDesign
                        name="addusergroup"
                        size={16}
                        color={Colors.light.primary}
                      />
                      <ThemedText className=" text-base font-plexSans text-center">
                        Start Group Order
                      </ThemedText>
                    </ThemedView>
                  </TouchableOpacity>
                </Link>
              </ThemedView>

              {/* Details Container */}
              <ThemedView className="flex-col ">
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
                      link="/(protected)/(home)"
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
                      link="/(protected)/(home)"
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
                      link="/(protected)/(home)"
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
                  className={"bg-white pt-2 pb-1 border-b border-gray-200"}
                  style={{ opacity: inlineOpacity }}
                >
                  <TabHeader
                    focusSection={focused?.sectionTitle}
                    handleTabPress={handleOnClickTabIdx}
                  />
                </Animated.View>
                <View className="flex-col px-4 py-4 bg-light-background2 ">
                  <Text className="text-black text-sm font-plexSans">
                    Adults need around 2000 kcal a day
                  </Text>
                  <Text className="text-black text-lg font-plexSansBold mt-6">
                    40% off selected items
                  </Text>
                  <Text className="text-black text-base font-plexSans mt-1 w-[90%]">
                    Spend £10.00, get 40% off selected items – T&Cs apply. New
                    customers only.
                  </Text>
                  <PromotionalCard />
                  {topSellingDishes && (
                    <PopularMenu dishes={topSellingDishes} />
                  )}
                </View>
              </ThemedView>
            </>
          }
          renderItem={({ item, section }) => (
            <MenuItemCard data={item} sectionTitle={section.title} />
          )}
          renderSectionHeader={({ section }) => {
            const title = section.title;
            if (!title) return null;
            return <SectionHeader title={title} isIcon={!!section.icon} />;
          }}
          // Ensures the section header doesn't overlap content
          // when using sticky headers

          ListFooterComponent={
            <>
              <View className="w-full h-full bg-light-footerOuterColor dark:bg-dark-footerOuterColor p-4 flex-col gap-4">
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

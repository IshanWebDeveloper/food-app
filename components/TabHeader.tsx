import { FlatList, View } from "react-native";
import { useEffect, useRef } from "react";
import Tab from "./Tab";
import {
  GetAllCategoryResponse,
  useGetAllCategories,
} from "@/hooks/api/categories/useGetAllCategories";

interface TabHeaderProps {
  focusSection?: string;
  handleTabPress: (idx: number) => void; // Optional callback to notify parent of section index to scroll to
}

const TabHeader = ({ focusSection, handleTabPress }: TabHeaderProps) => {
  const scrollRef = useRef<FlatList<any>>(null);
  const { categories: data } = useGetAllCategories();

  // Filtered data used by the FlatList; compute index from THIS array to avoid mismatches

  useEffect(() => {
    if (!focusSection || !scrollRef.current) return;
    if (!data || data?.length === 0) return;
    const index = data?.findIndex((s) => s.name === focusSection);
    if (index < 0) return; // not found, nothing to scroll to

    try {
      scrollRef.current.scrollToIndex({
        index,
        animated: true,
        // Center the active tab when possible
        viewPosition: 0.5,
      });
    } catch (err) {
      // In case the list hasn't measured yet, retry in the next tick
      void err; // satisfy unused var rules
      setTimeout(() => {
        scrollRef.current?.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0.5,
        });
      }, 0);
    }
  }, [focusSection, data]);

  if (!data || data?.length === 0) return null;

  return (
    <FlatList
      ref={scrollRef}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        height: 72,
        borderBottomWidth: 1,
        borderBottomColor: "gray",
      }}
      horizontal
      data={data}
      renderItem={({
        item: section,
        index,
      }: {
        item: GetAllCategoryResponse;
        index: number;
      }) => (
        <View className="mr-3">
          <Tab title={section.name} isActive={focusSection === section.name} />
        </View>
      )}
      getItemLayout={(data, index) => ({
        length: 80, // Approximate width of each tab including margin
        offset: 150 * index,
        index,
      })}
      onScrollToIndexFailed={(info) => {
        // Fallback: scroll by approximate offset, then retry
        const offset = Math.max(
          0,
          (info.averageItemLength || 100) * info.index,
        );
        scrollRef.current?.scrollToOffset({ offset, animated: true });
        setTimeout(() => {
          scrollRef.current?.scrollToIndex({
            index: info.index,
            animated: true,
            viewPosition: 0.5,
          });
        }, 100);
      }}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default TabHeader;

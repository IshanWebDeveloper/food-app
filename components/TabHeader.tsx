import { View, FlatList } from "react-native";
import React, { useEffect, useMemo, useRef } from "react";
import Tab from "./Tab";
import { mockSectionFoodData } from "@/lib/mockData/data";

interface TabHeaderProps {
  focusSection?: string;
}

const TabHeader = ({ focusSection }: TabHeaderProps) => {
  const scrollRef = useRef<FlatList<any>>(null);

  // Filtered data used by the FlatList; compute index from THIS array to avoid mismatches
  const data = useMemo(
    () => mockSectionFoodData.filter((s) => s.title !== "introduction"),
    [],
  );

  useEffect(() => {
    if (!focusSection || !scrollRef.current) return;

    const index = data.findIndex((s) => s.title === focusSection);
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
      renderItem={({ item: section }) => (
        <View key={section.title} className="mr-3">
          <Tab
            title={section.title}
            isActive={focusSection === section.title}
          />
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
      keyExtractor={(item) => item.title}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default TabHeader;

import React, { useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";
import SectionList from "react-native-tabs-section-list";
type MenuItem = {
  title: string;
  description: string;
  price: string;
};

type MenuSection = {
  title: string;
  data: MenuItem[];
};

const makeItems = (count: number, prefix: string): MenuItem[] =>
  Array.from({ length: count }).map((_, i) => ({
    title: `${prefix} Item ${i + 1}`,
    description:
      "A delicious option made with fresh ingredients and lots of flavor.",
    price: (Math.random() * 20 + 5).toFixed(2),
  }));

const SectionListItemsContainer: React.FC = () => {
  const sections: MenuSection[] = useMemo(
    () => [
      { title: "Burgers", data: makeItems(5, "Burger") },
      { title: "Pizza", data: makeItems(5, "Pizza") },
      { title: "Sushi and rolls", data: makeItems(10, "Sushi") },
      { title: "Salads", data: makeItems(10, "Salad") },
      { title: "Dessert", data: makeItems(10, "Dessert") },
    ],
    [],
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.title}
        stickySectionHeadersEnabled={false}
        scrollToLocationOffset={50}
        tabBarStyle={styles.tabBar}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderTab={({ title, isActive }) => (
          <View
            style={[
              styles.tabContainer,
              { borderBottomWidth: isActive ? 1 : 0 },
            ]}
          >
            <Text
              style={[
                styles.tabText,
                { color: isActive ? "#090909" : "#9e9e9e" },
              ]}
            >
              {title}
            </Text>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <View>
            <View style={styles.sectionHeaderContainer} />
            <Text style={styles.sectionHeaderText}>{section.title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.itemRow}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
            <Text style={styles.itemDescription}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  tabBar: {
    backgroundColor: "#fff",
    borderBottomColor: "#f4f4f4",
    borderBottomWidth: 1,
  },
  tabContainer: {
    borderBottomColor: "#090909",
  },
  tabText: {
    padding: 15,
    color: "#9e9e9e",
    fontSize: 18,
    fontWeight: "500",
  },
  separator: {
    height: 0.5,
    width: "96%",
    alignSelf: "flex-end",
    backgroundColor: "#eaeaea",
  },
  sectionHeaderContainer: {
    height: 10,
    backgroundColor: "#f6f6f6",
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
    borderBottomColor: "#f4f4f4",
    borderBottomWidth: 1,
  },
  sectionHeaderText: {
    color: "#010101",
    backgroundColor: "#fff",
    fontSize: 23,
    fontWeight: "bold",
    paddingTop: 25,
    paddingBottom: 5,
    paddingHorizontal: 15,
  },
  itemContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  itemTitle: {
    flex: 1,
    fontSize: 20,
    color: "#131313",
  },
  itemPrice: {
    fontSize: 18,
    color: "#131313",
  },
  itemDescription: {
    marginTop: 10,
    color: "#b6b6b6",
    fontSize: 16,
  },
  itemRow: {
    flexDirection: "row",
  },
});

export default SectionListItemsContainer;

import { mockSectionFoodData } from "@/lib/mockData/data";
import { AntDesign } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
export interface TabModel {
  name: string;
  anchor: number;
}
interface ContentProps {
  y: SharedValue<number>;
  onMeasurement: (index: number, tab: TabModel) => void;
}
export const MIN_HEADER_HEIGHT = 45;
export const HEADER_IMAGE_HEIGHT = 200;

export const defaultTabs = mockSectionFoodData.map(({ title }) => ({
  name: title,
  anchor: 0,
}));
const Content = ({ y, onMeasurement }: ContentProps) => {
  // Map mock sections into a simple menu shape used below
  const menu = mockSectionFoodData.map((section) => ({
    name: section.title,
    items: section.data.map((item) => ({
      title: item.name,
      description: item.description,
      price: `£${Number(item.price).toFixed(2)}`,
    })),
  }));

  const headerOpacityStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      y.value,
      [
        HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT - 100,
        HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT,
      ],
      [1, 0],
      Extrapolation.CLAMP,
    );
    return { opacity };
  });
  return (
    <>
      <View style={styles.placeholder} />
      <Animated.View style={[styles.section, headerOpacityStyle]}>
        <Text style={styles.text}>$$ • Asiatisch • Koreanisch • Japanisch</Text>
        <View style={styles.info}>
          <Text style={styles.text}>Opens at 11:30 AM</Text>
          <View style={styles.ratings}>
            <AntDesign
              name="star"
              color="#f4c945"
              size={24}
              style={styles.icon}
            />
            <Text style={styles.text}>(186)</Text>
          </View>
        </View>
      </Animated.View>
      <View style={styles.divider} />
      <View style={styles.section}>
        <Text style={styles.title2}>Restaurant info</Text>
        <View style={styles.info}>
          <Text style={styles.text}>Europaallee 48, Zürich, Zürich 8004</Text>
          <Text style={styles.link}>More info</Text>
        </View>
      </View>
      <View style={styles.divider} />
      {menu.map(({ name, items: menuItems }, index) => (
        <View
          style={styles.section}
          key={index}
          onLayout={({
            nativeEvent: {
              layout: { y: anchor },
            },
          }) => onMeasurement(index, { name, anchor: anchor - 142 })}
        >
          <Text style={styles.title1}>{name}</Text>
          {menuItems.map(({ title, description, price }, j) => (
            <View style={styles.item} key={j}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.description} numberOfLines={2}>
                {description}
              </Text>
              <Text style={styles.price}>{price}</Text>
            </View>
          ))}
        </View>
      ))}
      <View style={{ height: MIN_HEADER_HEIGHT }} />
    </>
  );
};

export default Content;

const styles = StyleSheet.create({
  section: {
    padding: 16,
  },
  placeholder: {
    height: HEADER_IMAGE_HEIGHT,
    marginBottom: MIN_HEADER_HEIGHT,
  },
  text: {
    fontFamily: "UberMoveRegular",
    fontSize: 14,
  },
  title1: {
    fontFamily: "UberMoveMedium",
    fontSize: 24,
  },
  title2: {
    fontFamily: "UberMoveMedium",
    fontSize: 16,
  },
  divider: {
    height: 2,
    backgroundColor: "#e2e3e4",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  ratings: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  link: {
    color: "#247A00",
  },
  item: {
    borderBottomColor: "#e2e3e4",
    borderBottomWidth: 1,
    marginTop: 16,
  },
  title: {
    fontFamily: "UberMoveMedium",
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    marginBottom: 8,
  },
  price: {
    fontFamily: "UberMoveMedium",
    marginBottom: 16,
  },
});

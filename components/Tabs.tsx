import { View, Text } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
interface TabProps {
  color: string;
  name: string;
  onMeasurement?: (measurement: number) => void;
  onPress?: () => void;
}
const Tabs = ({ color, name, onMeasurement, onPress }: TabProps) => {
  return (
    <TouchableWithoutFeedback {...{ onPress }}>
      <View
        onLayout={
          onMeasurement
            ? ({
                nativeEvent: {
                  layout: { width },
                },
              }) => onMeasurement(width)
            : undefined
        }
        className="h-[45px] px-2 justify-center items-center ml-2"
      >
        <Text className={`text-sm font-plexSans`} style={{ color }}>
          {name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Tabs;

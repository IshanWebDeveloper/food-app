import { Colors } from "@/constants/Colors";
import React, { memo } from "react";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  Image,
} from "react-native";
import { TextInput as Input, Text } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

type Props = React.ComponentProps<typeof Input> & {
  labelText?: string;
  errorText?: string;
  textColor?: string;
  customViewStyle?: StyleProp<ViewStyle>;
  customLabelTextStyle?: StyleProp<TextStyle>;
  customInputStyle?: StyleProp<TextStyle>;
  outlineStyle?: StyleProp<ViewStyle>;
  iconImage: IconSource;
};
const TextInputWithIcon = ({
  labelText,
  errorText,
  textColor,
  customViewStyle,
  customLabelTextStyle,
  customInputStyle,
  outlineStyle,
  iconImage,
  ...props
}: Props) => {
  return (
    <View style={[styles.container, customViewStyle]}>
      <Text
        style={[
          {
            color: textColor ? textColor : Colors.light.primary,
            fontFamily: "Poppins-Regular",
            fontSize: 16,
          },
          customLabelTextStyle,
        ]}
      >
        {labelText}
      </Text>
      <View>
        <Input
          style={[styles.input, customInputStyle]}
          textContentType="name"
          selectionColor={Colors.light.primary}
          contentStyle={{
            color: Colors.light.inputText,
            maxHeight: 40,
          }}
          placeholderTextColor={Colors.light.inputText}
          underlineColor="transparent"
          mode="outlined"
          right={
            <Input.Icon
              centered={true}
              size={15}
              icon={iconImage}
              underlayColor={Colors.light.background}
              style={{
                marginBottom: 20,
              }}
            />
          }
          outlineStyle={[
            {
              borderRadius: 20,
              borderColor: Colors.light.borderColor,
            },
            outlineStyle,
          ]}
          {...props}
        />
      </View>
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
};

export default memo(TextInputWithIcon);

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 12,
  },
  input: {
    backgroundColor: Colors.light.background,
    color: Colors.light.inputText,
    fontSize: 15,
    fontFamily: "Poppins-Regular",
    paddingHorizontal: 22,
    paddingVertical: 0,
    flexDirection: "row",
    maxHeight: 40,
  },
  error: {
    fontSize: 14,
    color: Colors.light.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

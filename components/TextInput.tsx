import { Colors } from "@/constants/Colors";
import React, { forwardRef, memo } from "react";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInput as TextInputRefType,
} from "react-native";

import { TextInput as Input, Text } from "react-native-paper";

type Props = React.ComponentProps<typeof Input> & {
  labelText?: string;
  errorText?: string;
  textColor?: string;
  inputTextColor?: string;
  customViewStyle?: StyleProp<ViewStyle>;
  customLabelTextStyle?: StyleProp<TextStyle>;
  customInputStyle?: StyleProp<TextStyle>;
  outlineStyle?: StyleProp<ViewStyle>;
};

const TextInput = forwardRef<TextInputRefType, Props>(
  (
    {
      labelText,
      errorText,
      textColor,
      inputTextColor,
      customViewStyle,
      customLabelTextStyle,
      customInputStyle,
      outlineStyle,
      ...props
    }: Props,
    ref
  ) => (
    <View style={[styles.container, customViewStyle]}>
      {labelText && (
        <Text
          className="text-lg"
          style={[
            {
              fontFamily: "JakartaExtraBold",
              color: textColor ? textColor : Colors.light.label,
            },
            customLabelTextStyle,
          ]}
        >
          {labelText}
        </Text>
      )}
      <Input
        ref={ref}
        style={[styles.input, customInputStyle]}
        contentStyle={{
          fontFamily: "Poppins-Medium",
          color: Colors.light.inputText,
          height: "auto",
        }}
        textContentType="name"
        textColor={inputTextColor}
        selectionColor={Colors.light.primary}
        underlineColor="transparent"
        mode="outlined"
        outlineStyle={[
          {
            borderRadius: 20,
            borderColor: Colors.light.borderColor2,
            // elevation: 5,
          },
          outlineStyle,
        ]}
        {...props}
      />
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  )
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 12,
  },
  input: {
    marginTop: 5,
    backgroundColor: Colors.light.background,
    paddingHorizontal: 6.25,
    height: 50,
  },
  error: {
    fontSize: 14,
    color: Colors.light.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default memo(TextInput);

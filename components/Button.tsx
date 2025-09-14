import { Colors } from "@/constants/Colors";
import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";

type Props = React.ComponentProps<typeof PaperButton>;

const Button = ({ mode = "elevated", style, children, ...props }: Props) => (
  <PaperButton
    style={[styles.button, { backgroundColor: Colors.light.button }, style]}
    contentStyle={{ height: 60 }}
    labelStyle={[styles.text, props.labelStyle]}
    mode={mode}
    {...props}
  >
    {children}
  </PaperButton>
);

const styles = StyleSheet.create({
  button: {
    marginVertical: 16,
    alignSelf: "center",
    width: "90%",
    height: 60,
    justifyContent: "center",
  },
  text: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    lineHeight: 26,
    color: "white",
  },
});

export default memo(Button);

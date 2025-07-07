import React from "react";
import { Text } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

export const GradientText = ({
  text,
  style,
  colors = ["#7C4DFF", "#448AFF"],
}) => {
  return (
    <MaskedView
      maskElement={<Text style={[{ fontWeight: "800" }, style]}>{text}</Text>}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ flex: 1 }}
      >
        <Text style={[style, { opacity: 0 }]}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

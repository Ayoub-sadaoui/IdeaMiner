import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { colors } from "../../constants/colors";

const { width, height } = Dimensions.get("window");
const DOT_SIZE = 4;
const SPACING = 24;

export const BackgroundPattern = () => {
  const numColumns = Math.ceil(width / SPACING);
  const numRows = Math.ceil(height / SPACING);
  const totalDots = numColumns * numRows;

  const dots = Array(totalDots)
    .fill(0)
    .map((_, index) => {
      const row = Math.floor(index / numColumns);
      const col = index % numColumns;

      return (
        <View
          key={index}
          style={[
            styles.dot,
            {
              left: col * SPACING,
              top: row * SPACING,
            },
          ]}
        />
      );
    });

  return (
    <View style={styles.container}>
      <View style={styles.patternContainer}>{dots}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  patternContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  dot: {
    position: "absolute",
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: colors.primary,
    opacity: 0.15,
  },
});

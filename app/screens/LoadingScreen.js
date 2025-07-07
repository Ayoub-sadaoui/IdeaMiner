import React from "react";
import { StyleSheet, View } from "react-native";
import LottieAnimation from "../components/common/LottieAnimation";
import { colors } from "../constants/colors";

export const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <LottieAnimation
        source={require("../assets/animations/loading.json")}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  animation: {
    width: 200,
    height: 200,
  },
});

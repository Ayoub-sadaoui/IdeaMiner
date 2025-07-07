import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../constants/colors";
import { layout } from "../../constants/layout";

export const GradientButton = ({
  onPress,
  label,
  style,
  loading = false,
  disabled = false,
}) => {
  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <Button
          mode="contained"
          onPress={onPress}
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
          loading={loading}
          disabled={disabled}
        >
          {label}
        </Button>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    overflow: "hidden",
  },
  gradient: {
    borderRadius: 100,
  },
  button: {
    backgroundColor: "transparent",
    elevation: 0,
    borderRadius: 100,
  },
  buttonContent: {
    height: 48,
    paddingHorizontal: layout.spacing.xl,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.surface,
  },
});

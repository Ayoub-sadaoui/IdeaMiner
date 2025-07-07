import React, { useRef, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Animated } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../constants/colors";
import { layout } from "../constants/layout";

// Array of background colors to randomly choose from
const backgroundColors = [
  "rgba(124, 77, 255, 0.1)", // Purple
  "rgba(76, 175, 80, 0.1)", // Green
  "rgba(255, 167, 38, 0.1)", // Orange
  "rgba(33, 150, 243, 0.1)", // Blue
  "rgba(233, 30, 99, 0.1)", // Pink
];

export default function IdeaCard({ idea, onPress, onSave, isSaved }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [backgroundColor, setBackgroundColor] = useState(colors.surface);

  const handlePressIn = () => {
    // Set a random background color
    setBackgroundColor(
      backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
    );

    // Animate the scale
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      friction: 8,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    // Reset background color
    setBackgroundColor(colors.surface);

    // Animate scale back
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 8,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
    >
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ scale: scaleAnim }],
            backgroundColor,
          },
        ]}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.tags}>
              <View
                style={[
                  styles.tag,
                  { backgroundColor: "rgba(124, 77, 255, 0.1)" },
                ]}
              >
                <Text style={[styles.tagText, { color: "#7C4DFF" }]}>
                  {idea.category}
                </Text>
              </View>
              <View
                style={[
                  styles.tag,
                  { backgroundColor: "rgba(255, 69, 0, 0.1)" },
                ]}
              >
                <MaterialCommunityIcons
                  name="reddit"
                  size={14}
                  color="#FF4500"
                  style={styles.tagIcon}
                />
                <Text style={[styles.tagText, { color: "#FF4500" }]}>
                  r/{idea.subreddit}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={onSave} style={styles.saveButton}>
              <MaterialCommunityIcons
                name={isSaved ? "bookmark" : "bookmark-outline"}
                size={24}
                color={isSaved ? colors.primary : colors.textSecondary}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.title} numberOfLines={2}>
            {idea.title}
          </Text>
          <Text style={styles.description} numberOfLines={3}>
            {idea.userQuestion}
          </Text>

          <View style={styles.metrics}>
            <View
              style={[
                styles.metric,
                { backgroundColor: "rgba(76, 175, 80, 0.1)" },
              ]}
            >
              <MaterialCommunityIcons
                name="chart-line"
                size={16}
                color="#4CAF50"
              />
              <Text style={[styles.metricText, { color: "#4CAF50" }]}>
                {idea.marketPotential}
              </Text>
            </View>
            <View
              style={[
                styles.metric,
                {
                  backgroundColor:
                    idea.difficulty === "Beginner"
                      ? "rgba(76, 175, 80, 0.1)"
                      : idea.difficulty === "Intermediate"
                      ? "rgba(255, 167, 38, 0.1)"
                      : "rgba(244, 67, 54, 0.1)",
                },
              ]}
            >
              <MaterialCommunityIcons
                name="speedometer"
                size={16}
                color={
                  idea.difficulty === "Beginner"
                    ? "#4CAF50"
                    : idea.difficulty === "Intermediate"
                    ? "#FFA726"
                    : "#F44336"
                }
              />
              <Text
                style={[
                  styles.metricText,
                  {
                    color:
                      idea.difficulty === "Beginner"
                        ? "#4CAF50"
                        : idea.difficulty === "Intermediate"
                        ? "#FFA726"
                        : "#F44336",
                  },
                ]}
              >
                {idea.difficulty}
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 2,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom: layout.spacing.lg,
    transform: [{ scale: 1 }],
  },
  content: {
    padding: layout.spacing.lg,
    gap: layout.spacing.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tags: {
    flexDirection: "row",
    gap: 8,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: layout.spacing.sm,
    paddingVertical: 4,
    borderRadius: 100,
  },
  tagIcon: {
    marginRight: 4,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "500",
  },
  saveButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  metrics: {
    flexDirection: "row",
    gap: layout.spacing.lg,
  },
  metric: {
    flexDirection: "row",
    alignItems: "center",
    gap: layout.spacing.xs,
    paddingHorizontal: layout.spacing.sm,
    paddingVertical: 4,
    borderRadius: 100,
  },
  metricText: {
    fontSize: 13,
    fontWeight: "600",
  },
});

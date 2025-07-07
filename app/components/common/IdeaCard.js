import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Platform,
  Pressable,
} from "react-native";
import { Surface, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import { layout } from "../../constants/layout";

const getRandomColor = () => {
  const colors = [
    "rgba(255, 99, 132, 0.15)",
    "rgba(54, 162, 235, 0.15)",
    "rgba(255, 206, 86, 0.15)",
    "rgba(75, 192, 192, 0.15)",
    "rgba(153, 102, 255, 0.15)",
    "rgba(255, 159, 64, 0.15)",
    "rgba(46, 204, 113, 0.15)",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const IdeaCard = ({
  title,
  userQuestion,
  category,
  difficulty,
  marketPotential,
  subreddit,
  onPress,
  onSave,
  isSaved = false,
}) => {
  const [backgroundColor] = useState(new Animated.Value(0));
  const [currentBgColor] = useState(getRandomColor());

  const handlePress = () => {
    // Call onPress directly
    onPress && onPress();
  };

  const handlePressIn = () => {
    if (Platform.OS !== "web") {
      Animated.timing(backgroundColor, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (Platform.OS !== "web") {
      Animated.timing(backgroundColor, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleHoverIn = () => {
    if (Platform.OS === "web") {
      Animated.timing(backgroundColor, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleHoverOut = () => {
    if (Platform.OS === "web") {
      Animated.timing(backgroundColor, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const animatedStyle = {
    backgroundColor: backgroundColor.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.surface, currentBgColor],
    }),
    transform: [
      {
        scale: backgroundColor.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.98],
        }),
      },
    ],
  };

  const getDifficultyColor = (level) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "#4CAF50";
      case "intermediate":
        return "#FF9800";
      case "advanced":
        return "#F44336";
      default:
        return colors.textSecondary;
    }
  };

  const getMarketPotentialColor = (potential) => {
    if (potential.includes("100K")) return "#90A4AE"; // Low potential
    if (potential.includes("500K")) return "#66BB6A"; // Medium potential
    if (potential.includes("1M")) return "#FFA726"; // High potential
    if (potential.includes("5M")) return "#EC407A"; // Very high potential
    return colors.textSecondary;
  };

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onHoverIn={Platform.OS === "web" ? handleHoverIn : undefined}
      onHoverOut={Platform.OS === "web" ? handleHoverOut : undefined}
      style={Platform.OS === "web" ? { cursor: "pointer" } : undefined}
    >
      <Animated.View style={[styles.card, animatedStyle]}>
        <View style={styles.header}>
          <View style={styles.tags}>
            <View
              style={[
                styles.tag,
                { backgroundColor: "rgba(124, 77, 255, 0.1)" },
              ]}
            >
              <Text
                style={[styles.tagText, { color: "#7C4DFF" }]}
                numberOfLines={1}
              >
                {category}
              </Text>
            </View>
            <View
              style={[
                styles.tag,
                { backgroundColor: "rgba(233, 30, 99, 0.1)" },
              ]}
            >
              <Text style={[styles.tagText, { color: "#E91E63" }]}>B2B</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity
              onPress={onSave}
              style={styles.saveButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <MaterialCommunityIcons
                name={isSaved ? "bookmark" : "bookmark-outline"}
                size={24}
                color={isSaved ? colors.primary : colors.textSecondary}
              />
            </TouchableOpacity>
            <MaterialCommunityIcons
              name="arrow-top-right"
              size={20}
              color={colors.textSecondary}
            />
          </View>
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        <Text style={styles.userQuestion} numberOfLines={2}>
          {userQuestion}
        </Text>

        <View style={styles.attributes}>
          <View style={styles.attributeItem}>
            <View
              style={[
                styles.attributeBadge,
                {
                  backgroundColor: `${getMarketPotentialColor(
                    marketPotential
                  )}15`,
                },
              ]}
            >
              <MaterialCommunityIcons
                name="chart-line"
                size={14}
                color={getMarketPotentialColor(marketPotential)}
                style={styles.attributeIcon}
              />
              <Text
                style={[
                  styles.attributeValue,
                  { color: getMarketPotentialColor(marketPotential) },
                ]}
              >
                {marketPotential}
              </Text>
            </View>
          </View>
          <View style={styles.attributeItem}>
            <View
              style={[
                styles.attributeBadge,
                { backgroundColor: `${getDifficultyColor(difficulty)}15` },
              ]}
            >
              <MaterialCommunityIcons
                name="speedometer"
                size={14}
                color={getDifficultyColor(difficulty)}
                style={styles.attributeIcon}
              />
              <Text
                style={[
                  styles.attributeValue,
                  { color: getDifficultyColor(difficulty) },
                ]}
                numberOfLines={1}
              >
                {difficulty}
              </Text>
            </View>
          </View>
          <View style={styles.subredditBadge}>
            <MaterialCommunityIcons name="reddit" size={14} color="#FF4500" />
            <Text style={styles.subredditText} numberOfLines={1}>
              r/{subreddit}
            </Text>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: layout.spacing.sm,
    marginBottom: layout.spacing.md,
    padding: layout.spacing.lg,
    borderRadius: 16,
    backgroundColor: colors.surface,
    elevation: 2,
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    width: Platform.OS === "web" ? "auto" : "98%",
    maxWidth: Platform.OS === "web" ? 1200 : "98%",
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: layout.spacing.md,
    width: "100%",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: layout.spacing.sm,
  },
  saveButton: {
    padding: 4,
  },
  tags: {
    flexDirection: "row",
    gap: 8,
    flex: 1,
    flexWrap: "wrap",
    marginRight: layout.spacing.md,
  },
  tag: {
    paddingHorizontal: layout.spacing.sm,
    paddingVertical: layout.spacing.xs,
    borderRadius: layout.borderRadius.sm,
    maxWidth: 150,
  },
  tagText: {
    fontSize: 11,
    fontWeight: "500",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: layout.spacing.sm,
    width: "100%",
  },
  userQuestion: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: layout.spacing.lg,
    width: "100%",
  },
  attributes: {
    flexDirection: "row",
    alignItems: "center",
    gap: layout.spacing.xs,
    width: "100%",
  },
  attributeItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  attributeBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: layout.spacing.xs,
    paddingVertical: 4,
    borderRadius: layout.borderRadius.sm,
    gap: 2,
    minWidth: 50,
    justifyContent: "center",
  },
  attributeIcon: {
    marginRight: 2,
  },
  attributeValue: {
    fontSize: 10,
    fontWeight: "500",
  },
  subredditBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    backgroundColor: "rgba(255, 69, 0, 0.1)",
    paddingHorizontal: layout.spacing.xs,
    paddingVertical: 4,
    borderRadius: layout.borderRadius.sm,
  },
  subredditText: {
    fontSize: 10,
    color: "#FF4500",
    fontWeight: "500",
  },
});

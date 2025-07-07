import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
  Linking,
} from "react-native";
import { Text, IconButton } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../constants/colors";
import { layout } from "../constants/layout";
import { useSavedIdeas } from "../context/SavedIdeasContext";

const MetricBar = ({ label, value, color, progress, icon }) => (
  <View style={styles.metricContainer}>
    <View style={styles.metricHeader}>
      <View style={styles.metricLabelContainer}>
        <MaterialCommunityIcons
          name={icon}
          size={18}
          color={color}
          style={styles.metricIcon}
        />
        <Text style={[styles.metricLabel, { color }]}>{label}</Text>
      </View>
      <Text style={[styles.metricValue, { color }]}>{value}</Text>
    </View>
    <View style={styles.progressBackground}>
      <View
        style={[
          styles.progressFill,
          { width: `${progress}%`, backgroundColor: color },
        ]}
      />
    </View>
  </View>
);

export default function IdeaDetails({ route, navigation }) {
  const { idea } = route.params;
  const { isIdeaSaved, saveIdea, unsaveIdea } = useSavedIdeas();
  const isSaved = isIdeaSaved(idea);

  useEffect(() => {
    console.log(
      "IdeaDetails mounted with idea:",
      JSON.stringify(idea, null, 2)
    );
    checkIfIdeaIsSaved();
  }, []);

  const checkIfIdeaIsSaved = async () => {
    try {
      console.log("Checking idea:", idea);
      const savedIdeas = await AsyncStorage.getItem("savedIdeas");
      console.log("Raw saved ideas from storage:", savedIdeas);

      if (savedIdeas !== null) {
        const savedIdeasArray = JSON.parse(savedIdeas);
        console.log("Parsed saved ideas:", savedIdeasArray);

        const isCurrentIdeaSaved = savedIdeasArray.some(
          (savedIdea) => savedIdea.title === idea.title
        );
        console.log("Current idea title:", idea.title);
        console.log("Is idea saved?", isCurrentIdeaSaved);
      } else {
        console.log("No saved ideas found in storage");
        // Initialize with empty array if no saved ideas exist
        await AsyncStorage.setItem("savedIdeas", JSON.stringify([]));
      }
    } catch (error) {
      console.error("Error checking saved status:", error);
    }
  };

  const handleSavePress = async () => {
    if (isSaved) {
      await unsaveIdea(idea);
    } else {
      await saveIdea(idea);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleRedditPress = () => {
    const redditUrl = `https://reddit.com${idea.subredditUrl}`;
    Linking.openURL(redditUrl);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <IconButton
                icon="arrow-left"
                size={24}
                onPress={handleBackPress}
                style={styles.backButton}
              />
            </View>
            <View style={styles.headerRight}>
              <IconButton
                icon="reddit"
                iconColor="#FF4500"
                size={24}
                onPress={handleRedditPress}
                style={styles.actionButton}
              />
              <IconButton
                icon={isSaved ? "bookmark" : "bookmark-outline"}
                iconColor={isSaved ? colors.primary : colors.textSecondary}
                size={24}
                onPress={handleSavePress}
                style={styles.actionButton}
              />
            </View>
          </View>

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
                { backgroundColor: "rgba(233, 30, 99, 0.1)" },
              ]}
            >
              <Text style={[styles.tagText, { color: "#E91E63" }]}>B2B</Text>
            </View>
            <View
              style={[styles.tag, { backgroundColor: "rgba(255, 69, 0, 0.1)" }]}
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

          <Text style={styles.title}>{idea.title}</Text>

          {/* Market Metrics Section */}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Problem Statement</Text>
            <Text style={styles.sectionText}>{idea.userQuestion}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pain Points</Text>
            <Text style={styles.sectionText}>{idea.fullPainPoints}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Goal</Text>
            <Text style={styles.sectionText}>{idea.goal}</Text>
          </View>

          <View style={styles.metricsSection}>
            <MetricBar
              label="Market Potential"
              value={idea.marketPotential}
              color="#4CAF50"
              progress={85}
              icon="chart-line"
            />
            <MetricBar
              label="Difficulty Level"
              value={idea.difficulty}
              color={
                idea.difficulty === "Beginner"
                  ? "#4CAF50"
                  : idea.difficulty === "Intermediate"
                  ? "#FFA726"
                  : "#F44336"
              }
              progress={
                idea.difficulty === "Beginner"
                  ? 33
                  : idea.difficulty === "Intermediate"
                  ? 66
                  : 100
              }
              icon="speedometer"
            />
            <MetricBar
              label="Growth Rate"
              value="High"
              color="#2196F3"
              progress={80}
              icon="trending-up"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === "android" ? 40 : 20,
  },
  content: {
    flex: 1,
    padding: layout.spacing.lg,
    paddingTop: 10,
    backgroundColor: colors.surface,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: layout.spacing.lg,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  backButton: {
    marginLeft: -8,
    marginRight: layout.spacing.sm,
  },
  tags: {
    flexDirection: "row",
    gap: 8,
    flex: 1,
    flexWrap: "wrap",
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: layout.spacing.sm,
    paddingVertical: 4,
    borderRadius: 100,
    marginRight: layout.spacing.sm,
  },
  tagIcon: {
    marginRight: 4,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "500",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
    marginBottom: layout.spacing.lg,
    lineHeight: 34,
  },
  section: {
    marginBottom: layout.spacing.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text,
    marginBottom: layout.spacing.md,
  },
  sectionText: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  metricsSection: {
    marginBottom: layout.spacing.xl,
    backgroundColor: colors.surface,
    padding: layout.spacing.lg,
    borderRadius: 16,
    gap: layout.spacing.lg,
    elevation: 2,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  metricContainer: {
    gap: layout.spacing.sm,
  },
  metricHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metricLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  metricIcon: {
    marginRight: layout.spacing.xs,
  },
  metricLabel: {
    fontSize: 15,
    fontWeight: "600",
  },
  metricValue: {
    fontSize: 15,
    fontWeight: "700",
  },
  progressBackground: {
    height: 8,
    backgroundColor: colors.divider,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  actionButton: {
    marginLeft: layout.spacing.xs,
  },
});

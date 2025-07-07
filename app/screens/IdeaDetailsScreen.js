import React from "react";
import { StyleSheet, View, ScrollView, Linking, Platform } from "react-native";
import { Surface, Text, Button, IconButton } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../constants/colors";
import { layout } from "../constants/layout";

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

export const IdeaDetailsScreen = ({ idea, onBack, onSaveIdea, isSaved }) => {
  const handleShare = () => {
    // TODO: Implement share functionality
    console.log("Share pressed");
  };

  const handleRedditPress = async () => {
    if (idea.reddit_url) {
      await Linking.openURL(idea.reddit_url);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Surface style={styles.content}>
          {/* Header with back button and tags */}
          <View style={styles.header}>
            <IconButton
              icon="arrow-left"
              size={24}
              onPress={onBack}
              style={styles.backButton}
            />
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
          </View>

          {/* Title */}
          <Text style={styles.title}>{idea.title}</Text>

          {/* Market Metrics Section */}
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

          {/* Problem Statement */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>User Question</Text>
            <Text style={styles.sectionContent}>{idea.userQuestion}</Text>
          </View>

          {/* Pain Points */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pain Points</Text>
            <Text style={styles.sectionContent}>{idea.fullPainPoints}</Text>
          </View>

          {/* Solution Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Goals</Text>
            <Text style={styles.sectionContent}>{idea.goal}</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <Button
              mode="contained"
              icon={isSaved ? "bookmark" : "bookmark-outline"}
              onPress={() => onSaveIdea(idea)}
              style={[styles.actionButton, styles.saveButton]}
              contentStyle={styles.actionButtonContent}
            >
              {isSaved ? "Saved" : "Save Idea"}
            </Button>
            <Button
              mode="outlined"
              icon="share-variant"
              onPress={handleShare}
              style={[styles.actionButton, styles.shareButton]}
              contentStyle={styles.actionButtonContent}
            >
              Share
            </Button>
          </View>

          {/* Reddit Link */}
          <Button
            mode="text"
            icon="reddit"
            onPress={handleRedditPress}
            style={styles.redditButton}
          >
            View Original Reddit Post
          </Button>
        </Surface>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === "android" ? 40 : 20,
  },
  content: {
    flex: 1,
    padding: layout.spacing.lg,
    paddingTop: Platform.OS === "android" ? 80 : 60,
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: layout.spacing.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: layout.spacing.lg,
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
  sectionContent: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  metricsSection: {
    marginVertical: layout.spacing.xl,
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
  actions: {
    flexDirection: "row",
    gap: layout.spacing.md,
    marginTop: layout.spacing.xl,
  },
  actionButton: {
    flex: 1,
    borderRadius: 100,
  },
  actionButtonContent: {
    height: 48,
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  shareButton: {
    borderColor: colors.primary,
  },
  redditButton: {
    marginTop: layout.spacing.md,
  },
});

import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  Platform,
} from "react-native";
import { Text } from "react-native-paper";
import { useSavedIdeas } from "../context/SavedIdeasContext";
import { colors } from "../constants/colors";
import { layout } from "../constants/layout";
import IdeaCard from "../components/IdeaCard";

export default function SavedIdeasScreen({ navigation }) {
  const { savedIdeas, saveIdea, unsaveIdea } = useSavedIdeas();

  const handleIdeaPress = (idea) => {
    navigation.navigate("IdeaDetails", { idea });
  };

  const handleSavePress = (idea) => {
    unsaveIdea(idea);
  };

  const renderItem = ({ item }) => (
    <IdeaCard
      idea={item}
      onPress={() => handleIdeaPress(item)}
      onSave={() => handleSavePress(item)}
      isSaved={true}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Saved Ideas</Text>
      </View>
      {savedIdeas.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No saved ideas yet</Text>
          <Text style={styles.emptyStateSubtext}>
            Tap the bookmark icon on any idea to save it for later
          </Text>
        </View>
      ) : (
        <FlatList
          data={savedIdeas}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === "android" ? 80 : 60,
  },
  header: {
    padding: layout.spacing.lg,
    marginBottom: layout.spacing.md,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
  },
  list: {
    padding: layout.spacing.lg,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: layout.spacing.xl,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: layout.spacing.sm,
    textAlign: "center",
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
  },
});

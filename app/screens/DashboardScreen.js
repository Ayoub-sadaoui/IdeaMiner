import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Modal,
  Animated,
  Platform,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { Title, Text, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import IdeaCard from "../components/IdeaCard";
import SearchBar from "../components/common/SearchBar";
import FilterButton from "../components/common/FilterButton";
import Toast from "../components/common/Toast";
import { colors } from "../constants/colors";
import { layout } from "../constants/layout";
import { GradientText } from "../components/common/GradientText";
import { BackgroundPattern } from "../components/common/BackgroundPattern";
import { useSavedIdeas } from "../context/SavedIdeasContext";

// Temporary mock data
const mockIdeas = [
  {
    id: "1",
    title: "AI-Powered Content Generator for Social Media",
    userQuestion:
      "How can I help small businesses manage their social media content more efficiently?",
    fullPainPoints:
      "Small businesses struggle with consistent social media presence and content creation",
    goal: "Create an AI tool that generates and schedules social media content",
    marketPotential: "$500K-1M",
    difficulty: "Intermediate",
    category: "AI/ML",
    subredditScore: 156,
    subredditUrl: "https://reddit.com/r/SaaS/post1",
    subreddit: "SaaS",
  },
  {
    id: "2",
    title: "Remote Team Collaboration Platform",
    userQuestion:
      "What's the best way to improve remote team productivity and communication?",
    fullPainPoints:
      "Remote teams face challenges with coordination, communication, and project tracking",
    goal: "Build a unified platform for team collaboration and project management",
    marketPotential: "$1M-5M",
    difficulty: "Advanced",
    category: "Productivity",
    subredditScore: 234,
    subredditUrl: "https://reddit.com/r/SaaS/post2",
    subreddit: "SaaS",
  },
  {
    id: "3",
    title: "Personal Finance Management Tool",
    userQuestion:
      "How can I help people better manage their personal finances and investments?",
    fullPainPoints:
      "People struggle with budgeting, expense tracking, and investment decisions",
    goal: "Create an all-in-one personal finance management platform",
    marketPotential: "$1M-5M",
    difficulty: "Beginner",
    category: "FinTech",
    subredditScore: 189,
    subredditUrl: "https://reddit.com/r/SaaS/post3",
    subreddit: "SaaS",
  },
  {
    id: "4",
    title: "Online Learning Platform for Kids Coding",
    userQuestion:
      "How can we make coding education more engaging and accessible for children?",
    fullPainPoints:
      "Traditional coding education is often too complex and boring for kids",
    goal: "Create an interactive platform that teaches coding through games and fun projects",
    marketPotential: "$1M-5M",
    difficulty: "Intermediate",
    category: "EdTech",
    subredditScore: 312,
    subredditUrl: "https://reddit.com/r/SaaS/post4",
    subreddit: "SaaS",
  },
  {
    id: "5",
    title: "AI Health Symptom Checker",
    userQuestion:
      "Can AI help people understand their health symptoms before visiting a doctor?",
    fullPainPoints:
      "People often worry about symptoms but don't know if they need medical attention",
    goal: "Develop an AI-powered system that helps assess symptoms and provides initial guidance",
    marketPotential: "$5M+",
    difficulty: "Advanced",
    category: "HealthTech",
    subredditScore: 423,
    subredditUrl: "https://reddit.com/r/SaaS/post5",
    subreddit: "SaaS",
  },
  {
    id: "6",
    title: "Smart Inventory Management for Small Retailers",
    userQuestion:
      "How can small retailers better manage their inventory and reduce waste?",
    fullPainPoints:
      "Small businesses struggle with inventory tracking, ordering, and waste management",
    goal: "Create an AI-powered inventory management system with predictive ordering",
    marketPotential: "$500K-1M",
    difficulty: "Intermediate",
    category: "E-commerce",
    subredditScore: 167,
    subredditUrl: "https://reddit.com/r/SaaS/post6",
    subreddit: "SaaS",
  },
  {
    id: "7",
    title: "Mental Health Support Platform",
    userQuestion:
      "How can technology help people manage their mental health and well-being?",
    fullPainPoints:
      "Access to mental health resources is limited and often expensive",
    goal: "Build a platform offering AI-guided meditation, mood tracking, and therapist matching",
    marketPotential: "$1M-5M",
    difficulty: "Advanced",
    category: "HealthTech",
    subredditScore: 378,
    subredditUrl: "https://reddit.com/r/SaaS/post7",
    subreddit: "SaaS",
  },
  {
    id: "8",
    title: "Smart Recipe and Meal Planning App",
    userQuestion:
      "Can AI help people plan healthy meals based on their preferences and dietary restrictions?",
    fullPainPoints:
      "People struggle with meal planning, grocery shopping, and maintaining healthy diets",
    goal: "Create an AI-powered meal planning app with smart grocery lists and recipe suggestions",
    marketPotential: "$100K-500K",
    difficulty: "Beginner",
    category: "HealthTech",
    subredditScore: 245,
    subredditUrl: "https://reddit.com/r/SaaS/post8",
    subreddit: "SaaS",
  },
  {
    id: "9",
    title: "Automated Legal Document Generator",
    userQuestion:
      "How can we make legal services more accessible to small businesses?",
    fullPainPoints:
      "Legal services are expensive and inaccessible for many small businesses",
    goal: "Build an AI-powered platform that generates and reviews basic legal documents",
    marketPotential: "$1M-5M",
    difficulty: "Advanced",
    category: "AI/ML",
    subredditScore: 289,
    subredditUrl: "https://reddit.com/r/SaaS/post9",
    subreddit: "SaaS",
  },
  {
    id: "10",
    title: "Freelancer Project Management Tool",
    userQuestion:
      "What tools do freelancers need to manage their projects and clients effectively?",
    fullPainPoints:
      "Freelancers struggle with project tracking, time management, and client communication",
    goal: "Create an all-in-one platform for freelancers to manage projects, time, and clients",
    marketPotential: "$500K-1M",
    difficulty: "Intermediate",
    category: "Productivity",
    subredditScore: 198,
    subredditUrl: "https://reddit.com/r/SaaS/post10",
    subreddit: "SaaS",
  },
  {
    id: "11",
    title: "E-commerce Analytics Platform",
    userQuestion:
      "How can small e-commerce businesses better understand their customers?",
    fullPainPoints:
      "Small online retailers lack access to advanced analytics and customer insights",
    goal: "Build an affordable analytics platform with AI-powered customer behavior insights",
    marketPotential: "$1M-5M",
    difficulty: "Advanced",
    category: "E-commerce",
    subredditScore: 267,
    subredditUrl: "https://reddit.com/r/SaaS/post11",
    subreddit: "SaaS",
  },
  {
    id: "12",
    title: "Language Learning Game Platform",
    userQuestion:
      "How can we make language learning more engaging and effective?",
    fullPainPoints:
      "Traditional language learning methods are often boring and ineffective",
    goal: "Create a gamified language learning platform with AI-powered personalization",
    marketPotential: "$5M+",
    difficulty: "Intermediate",
    category: "EdTech",
    subredditScore: 345,
    subredditUrl: "https://reddit.com/r/SaaS/post12",
    subreddit: "SaaS",
  },
];

const trendingOptions = ["Latest", "Most Popular", "Best Match"];
const difficultyLevels = ["All", "Beginner", "Intermediate", "Advanced"];
const industries = [
  "All",
  "AI/ML",
  "FinTech",
  "EdTech",
  "Productivity",
  "HealthTech",
  "E-commerce",
];

export default function DashboardScreen({ navigation }) {
  const { savedIdeas, saveIdea } = useSavedIdeas();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrending, setSelectedTrending] = useState("Latest");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [modalType, setModalType] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const animatedValue = useRef(new Animated.Value(0)).current;

  const handleRandomPress = () => {
    // Get all categories except "All"
    const availableCategories = industries.filter(
      (category) => category !== "All"
    );

    // Select a random category
    const randomCategory =
      availableCategories[
        Math.floor(Math.random() * availableCategories.length)
      ];

    // Update the search query
    setSearchQuery(randomCategory);

    // Reset filters
    setSelectedIndustry("All");
    setSelectedDifficulty("All");

    // Show toast message
    setToastMessage(`Discovering ideas in ${randomCategory}! 🚀`);
    setTimeout(() => setToastMessage(""), 2000);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    // Reset filters when searching
    if (text && text.length > 0) {
      setSelectedIndustry("All");
      setSelectedDifficulty("All");
    }
  };

  const handleFilterPress = (type) => {
    setModalType(type);
  };

  const handleOptionSelect = (option) => {
    switch (modalType) {
      case "trending":
        setSelectedTrending(option);
        break;
      case "industry":
        setSelectedIndustry(option);
        break;
      case "difficulty":
        setSelectedDifficulty(option);
        break;
    }
    setModalType(null);
  };

  const handleIdeaPress = (idea) => {
    navigation.navigate("IdeaDetails", {
      idea: {
        ...idea,
        subreddit: idea.subreddit || "SaaS",
        subredditUrl: idea.subredditUrl,
        fullPainPoints: idea.fullPainPoints,
        goal: idea.goal,
      },
    });
  };

  const filteredIdeas = mockIdeas.filter((idea) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      idea.title.toLowerCase().includes(searchLower) ||
      idea.userQuestion.toLowerCase().includes(searchLower) ||
      idea.fullPainPoints.toLowerCase().includes(searchLower) ||
      idea.category.toLowerCase().includes(searchLower) ||
      idea.difficulty.toLowerCase().includes(searchLower);

    const matchesIndustry =
      selectedIndustry === "All" || idea.category === selectedIndustry;
    const matchesDifficulty =
      selectedDifficulty === "All" || idea.difficulty === selectedDifficulty;

    return matchesSearch && matchesIndustry && matchesDifficulty;
  });

  const sortedIdeas = [...filteredIdeas].sort((a, b) => {
    switch (selectedTrending) {
      case "Most Popular":
        return b.subredditScore - a.subredditScore;
      case "Best Match":
        // Implement a relevance score based on search query
        if (searchQuery) {
          const aRelevance = calculateRelevanceScore(a, searchQuery);
          const bRelevance = calculateRelevanceScore(b, searchQuery);
          return bRelevance - aRelevance;
        }
        return b.subredditScore - a.subredditScore;
      default: // Latest
        return mockIdeas.indexOf(a) - mockIdeas.indexOf(b);
    }
  });

  const calculateRelevanceScore = (idea, query) => {
    const queryLower = query.toLowerCase();
    let score = 0;

    // Title match (highest weight)
    if (idea.title.toLowerCase().includes(queryLower)) score += 5;

    // Question match
    if (idea.userQuestion.toLowerCase().includes(queryLower)) score += 3;

    // Pain points match
    if (idea.fullPainPoints.toLowerCase().includes(queryLower)) score += 2;

    // Category exact match
    if (idea.category.toLowerCase() === queryLower) score += 4;

    // Difficulty exact match
    if (idea.difficulty.toLowerCase() === queryLower) score += 1;

    // Reddit score influence (normalized)
    score += idea.subredditScore / 1000;

    return score;
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundPattern />
      <Toast message={toastMessage} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Discover Your</Text>
          <View style={styles.highlightedContainer}>
            <GradientText
              text="Million Dollar SaaS"
              style={styles.highlightedText}
              colors={["#7C4DFF", "#448AFF"]}
            />
          </View>
          <Text style={styles.title}> Idea</Text>
          <Text style={styles.description}>
            AI-powered platform helping entrepreneurs find their next successful
            venture
          </Text>
        </View>

        <SearchBar
          value={searchQuery}
          onChangeText={handleSearch}
          onRandomPress={handleRandomPress}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          <FilterButton
            label={selectedTrending}
            icon="trending-up"
            isActive={true}
            onPress={() => handleFilterPress("trending")}
            style={styles.filterButton}
          />
          <FilterButton
            label={selectedIndustry}
            icon="briefcase-outline"
            isActive={selectedIndustry !== "All"}
            onPress={() => handleFilterPress("industry")}
            style={styles.filterButton}
          />
          <FilterButton
            label={selectedDifficulty}
            icon="chart-bar"
            isActive={selectedDifficulty !== "All"}
            onPress={() => handleFilterPress("difficulty")}
          />
        </ScrollView>

        <View style={styles.trustBadge}>
          <Text style={styles.trustText}>Trusted by 60+ founders</Text>
        </View>

        <View style={styles.ideasContainer}>
          {sortedIdeas.map((idea) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              onPress={() => handleIdeaPress(idea)}
              onSave={() => saveIdea(idea)}
              isSaved={savedIdeas.some((savedIdea) => savedIdea.id === idea.id)}
            />
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={modalType !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setModalType(null)}
      >
        <TouchableWithoutFeedback onPress={() => setModalType(null)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Title style={styles.modalTitle}>
                  {modalType === "trending"
                    ? "Sort By"
                    : modalType === "industry"
                    ? "Select Industry"
                    : "Select Difficulty"}
                </Title>
                {(modalType === "trending"
                  ? trendingOptions
                  : modalType === "industry"
                  ? industries
                  : difficultyLevels
                ).map((option) => (
                  <Button
                    key={option}
                    mode="text"
                    onPress={() => handleOptionSelect(option)}
                    style={styles.modalButton}
                    textColor={colors.text}
                  >
                    {option}
                  </Button>
                ))}
                <Button
                  mode="contained"
                  onPress={() => setModalType(null)}
                  style={styles.closeButton}
                >
                  Close
                </Button>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    padding: layout.spacing.lg,
    paddingTop: Platform.OS === "android" ? 80 : 60,
    marginBottom: layout.spacing.md,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.text,
  },
  highlightedContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: layout.spacing.xs,
  },
  highlightedText: {
    fontSize: 32,
    fontWeight: "900",
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: layout.spacing.md,
    textAlign: "center",
  },
  filtersContainer: {
    marginBottom: layout.spacing.lg,
  },
  filtersContent: {
    paddingHorizontal: layout.spacing.lg,
    gap: layout.spacing.sm,
  },
  filterButton: {
    marginRight: layout.spacing.md,
  },
  trustBadge: {
    alignItems: "center",
    marginBottom: layout.spacing.xl,
  },
  trustText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  ideasContainer: {
    paddingHorizontal: layout.spacing.lg,
    paddingBottom: layout.spacing.xl,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: layout.spacing.lg,
    width: "80%",
    maxWidth: 400,
    elevation: 5,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    textAlign: "center",
    marginBottom: layout.spacing.lg,
  },
  modalButton: {
    marginVertical: layout.spacing.xs,
  },
  closeButton: {
    marginTop: layout.spacing.lg,
  },
});

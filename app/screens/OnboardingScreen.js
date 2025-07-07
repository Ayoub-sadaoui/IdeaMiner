import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  useWindowDimensions,
  Animated,
} from "react-native";
import { Text, Button } from "react-native-paper";
import LottieAnimation from "../components/common/LottieAnimation";
import { colors } from "../constants/colors";
import { layout } from "../constants/layout";

const OnboardingSlide = ({ item, width }) => {
  return (
    <View style={[styles.slide, { width }]}>
      <View style={styles.animationContainer}>
        <LottieAnimation
          source={item.animation}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
};

const onboardingData = [
  {
    id: "1",
    title: "Discover SaaS Ideas",
    description:
      "Find your next million-dollar SaaS idea with our AI-powered platform",
    animation: require("../assets/animations/Discover.json"),
  },
  {
    id: "2",
    title: "Analyze Market Potential",
    description: "Get detailed market analysis and validation for your ideas",
    animation: require("../assets/animations/Analysis.json"),
  },
  {
    id: "3",
    title: "Track Your Progress",
    description:
      "Save and track your favorite ideas as you build your SaaS empire",
    animation: require("../assets/animations/Progress.json"),
  },
];

export const OnboardingScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems[0]) {
      console.log("Current slide changed to:", viewableItems[0].index);
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
    minimumViewTime: 300,
  }).current;

  const scrollTo = () => {
    if (currentIndex < onboardingData.length - 1) {
      console.log("Scrolling to next slide:", currentIndex + 1);
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({
          offset: width * (currentIndex + 1),
          animated: true,
        });
      }
    } else {
      console.log("Navigating to Login screen");
      navigation.replace("Login");
    }
  };

  const handleSkip = () => {
    navigation.replace("Login");
  };

  const renderItem = ({ item }) => (
    <OnboardingSlide item={item} width={width} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.flatListContainer}>
        <FlatList
          ref={flatListRef}
          data={onboardingData}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          scrollEventThrottle={16}
        />
      </View>

      <View style={styles.pagination}>
        {onboardingData.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 20, 10],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              style={[styles.dot, { width: dotWidth, opacity }]}
              key={index}
            />
          );
        })}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={scrollTo}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          {currentIndex === onboardingData.length - 1 ? "Get Started" : "Next"}
        </Button>
        {currentIndex < onboardingData.length - 1 && (
          <Button mode="text" onPress={handleSkip} style={styles.skipButton}>
            Skip
          </Button>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flatListContainer: {
    flex: 1,
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: layout.spacing.xl,
  },
  animationContainer: {
    width: "100%",
    height: 300,
    marginBottom: layout.spacing.xl,
  },
  animation: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
    marginBottom: layout.spacing.md,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
    paddingHorizontal: layout.spacing.lg,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: layout.spacing.xl,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    marginHorizontal: 4,
  },
  buttonContainer: {
    padding: layout.spacing.lg,
  },
  button: {
    borderRadius: 100,
  },
  buttonContent: {
    height: 48,
  },
  skipButton: {
    marginTop: layout.spacing.sm,
  },
});

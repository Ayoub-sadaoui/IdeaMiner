import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Platform,
  SafeAreaView,
  Animated,
  Easing,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import { layout } from "../../constants/layout";

export const TopNavBar = ({ state, descriptors, navigation }) => {
  // Create animated values for each tab
  const tabAnimations = useRef(
    state.routes.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    // Animate all tabs when focus changes
    Animated.parallel(
      tabAnimations.map((anim, index) =>
        Animated.timing(anim, {
          toValue: state.index === index ? 1 : 0,
          duration: 300,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
          useNativeDriver: false,
        })
      )
    ).start();
  }, [state.index]);

  const getIcon = (routeName, isActive) => {
    switch (routeName) {
      case "Dashboard":
        return isActive ? "lightbulb" : "lightbulb-outline";
      case "Saved":
        return isActive ? "bookmark" : "bookmark-outline";
      case "Account":
        return isActive ? "account" : "account-outline";
      default:
        return "circle";
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel || options.title || route.name;
            const isFocused = state.index === index;

            // Animated flex value
            const flexValue = tabAnimations[index].interpolate({
              inputRange: [0, 1],
              outputRange: [1, 2],
            });

            // Animated opacity for smooth text fade
            const labelOpacity = tabAnimations[index].interpolate({
              inputRange: [0, 1],
              outputRange: [0.8, 1],
            });

            return (
              <Animated.View
                key={route.key}
                style={[
                  styles.tab,
                  {
                    flex: flexValue,
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate(route.name)}
                  style={styles.touchable}
                >
                  <Animated.View style={styles.tabContent}>
                    {isFocused ? (
                      <Animated.View
                        style={[
                          styles.activeTabContainer,
                          { opacity: labelOpacity },
                        ]}
                      >
                        <MaterialCommunityIcons
                          name={getIcon(route.name, true)}
                          size={24}
                          color={colors.surface}
                        />
                        <Animated.Text
                          style={[
                            styles.activeLabel,
                            { opacity: labelOpacity },
                          ]}
                        >
                          {label}
                        </Animated.Text>
                      </Animated.View>
                    ) : (
                      <>
                        <MaterialCommunityIcons
                          name={getIcon(route.name, false)}
                          size={24}
                          color={colors.primary}
                        />
                        <Text style={styles.label}>{label}</Text>
                      </>
                    )}
                  </Animated.View>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.primary,
  },
  container: {
    width: "100%",
    alignItems: "center",
    paddingTop:
      Platform.OS === "android" ? layout.spacing.md : layout.spacing.sm,
    paddingBottom: layout.spacing.md,
    paddingHorizontal: layout.spacing.md,
    backgroundColor: colors.background,
  },
  content: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: 32,
    paddingVertical: layout.spacing.sm,
    paddingHorizontal: layout.spacing.lg,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
    width: "100%",
    maxWidth: 500,
    justifyContent: "space-between",
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },
  touchable: {
    width: "100%",
    alignItems: "center",
  },
  tabContent: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  activeTabContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 2,
  },
  label: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  activeLabel: {
    fontSize: 11,
    color: colors.surface,
    fontWeight: "800",
  },
});

export default TopNavBar;

import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Platform,
  SafeAreaView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import { layout } from "../../constants/layout";

export const TopNavBar = ({ state, descriptors, navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel || options.title || route.name;
            const isFocused = state.index === index;

            const getIcon = () => {
              switch (route.name) {
                case "Home":
                  return "home-variant";
                case "Search":
                  return "magnify";
                case "Analytics":
                  return "chart-pie";
                case "History":
                  return "clock-outline";
                case "Profile":
                  return "account-outline";
                default:
                  return "circle";
              }
            };

            return (
              <TouchableOpacity
                key={route.key}
                onPress={() => navigation.navigate(route.name)}
                style={[styles.tab]}
              >
                <View style={styles.tabContent}>
                  {isFocused ? (
                    <View style={styles.activeTabContainer}>
                      <MaterialCommunityIcons
                        name={getIcon()}
                        size={22}
                        color={colors.surface}
                      />
                      <Text style={styles.activeLabel}>{label}</Text>
                    </View>
                  ) : (
                    <>
                      <MaterialCommunityIcons
                        name={getIcon()}
                        size={22}
                        color={colors.textSecondary}
                      />
                      <Text style={styles.label}>{label}</Text>
                    </>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
  },
  container: {
    width: "100%",
    alignItems: "center",
    paddingTop:
      Platform.OS === "android" ? layout.spacing.xl : layout.spacing.md,
    paddingBottom: layout.spacing.md,
    paddingHorizontal: layout.spacing.lg,
  },
  content: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: 32,
    paddingVertical: layout.spacing.md,
    paddingHorizontal: layout.spacing.lg,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
    width: "100%",
    maxWidth: 500,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 2,
  },
  tabContent: {
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  activeTabContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: layout.spacing.md,
    paddingVertical: layout.spacing.sm,
    borderRadius: 20,
    gap: 4,
  },
  label: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  activeLabel: {
    fontSize: 13,
    color: colors.surface,
    fontWeight: "600",
  },
});

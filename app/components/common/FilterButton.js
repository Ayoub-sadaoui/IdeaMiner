import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import { layout } from "../../constants/layout";

export default function FilterButton({
  label,
  icon,
  isActive,
  onPress,
  showDropdownIcon = true,
}) {
  return (
    <TouchableOpacity
      style={[styles.container, isActive && styles.activeContainer]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={18}
            color={isActive ? colors.primary : colors.textSecondary}
            style={styles.icon}
          />
        )}
        <Text style={[styles.label, isActive && styles.activeLabel]}>
          {label}
        </Text>
        {showDropdownIcon && (
          <MaterialCommunityIcons
            name="chevron-down"
            size={18}
            color={isActive ? colors.primary : colors.textSecondary}
            style={styles.dropdownIcon}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    paddingHorizontal: layout.spacing.md,
    paddingVertical: layout.spacing.sm,
    borderRadius: 100,
    gap: layout.spacing.xs,
    elevation: 2,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  activeContainer: {
    backgroundColor: colors.primary + "10",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: layout.spacing.xs,
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  activeLabel: {
    color: colors.primary,
    fontWeight: "600",
  },
  dropdownIcon: {
    marginLeft: layout.spacing.xs,
  },
});

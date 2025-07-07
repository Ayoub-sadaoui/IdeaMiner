import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Text, TextInput, Button, Surface } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../constants/colors";
import { layout } from "../constants/layout";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

export const UserAccountScreen = () => {
  const { session } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleChangePhoto = () => {
    // TODO: Implement photo change functionality
    console.log("Change photo pressed");
  };

  const email = session?.user?.email || "";

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.settingsLabel}>Settings</Text>
        <Text style={styles.title}>Account Settings</Text>
        <Text style={styles.subtitle}>
          Manage your account preferences and profile
        </Text>
      </View>

      <Surface style={styles.content}>
        <Text style={styles.sectionTitle}>Profile Information</Text>

        <View style={styles.photoSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarPlaceholder}>
                {email.charAt(0).toUpperCase()}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={handleChangePhoto}
            >
              <MaterialCommunityIcons
                name="camera"
                size={20}
                color={colors.surface}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.photoLabel}>Profile Photo</Text>
          <Text style={styles.photoSubtitle}>Update your profile picture</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              value={email}
              editable={false}
              mode="outlined"
              style={styles.input}
              outlineColor={colors.divider}
              activeOutlineColor={colors.primary}
            />
          </View>
        </View>
      </Surface>

      <Button
        mode="contained"
        onPress={handleLogout}
        style={styles.logoutButton}
        buttonColor={colors.error}
        textColor={colors.surface}
      >
        Log Out
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: layout.spacing.lg,
    paddingTop: Platform.OS === "android" ? 80 : 60,
    marginBottom: layout.spacing.md,
  },
  settingsLabel: {
    fontSize: 16,
    color: colors.primary,
    marginBottom: layout.spacing.sm,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
    marginBottom: layout.spacing.md,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  content: {
    margin: layout.spacing.lg,
    padding: layout.spacing.lg,
    borderRadius: 16,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.text,
    marginBottom: layout.spacing.xl,
  },
  photoSection: {
    alignItems: "center",
    marginBottom: layout.spacing.xl,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: layout.spacing.sm,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.divider,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarPlaceholder: {
    fontSize: 36,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: colors.surface,
  },
  photoLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: layout.spacing.xs,
  },
  photoSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  form: {
    gap: layout.spacing.lg,
  },
  inputContainer: {
    gap: layout.spacing.xs,
  },
  inputLabel: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 4,
  },
  input: {
    backgroundColor: colors.surface,
  },
  saveButton: {
    marginTop: layout.spacing.md,
    borderRadius: 100,
    backgroundColor: colors.primary,
  },
  saveButtonContent: {
    height: 48,
  },
  logoutButton: {
    margin: layout.spacing.lg,
    borderRadius: 100,
  },
});

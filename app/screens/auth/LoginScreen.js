import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Text,
  Alert,
} from "react-native";
import { Button, Title, Snackbar } from "react-native-paper";
import { AuthInput } from "../../components/auth/AuthInput";
import { SocialButton } from "../../components/auth/SocialButton";
import { GradientButton } from "../../components/common/GradientButton";
import { colors } from "../../constants/colors";
import { layout } from "../../constants/layout";
import { supabase } from "../../lib/supabase";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        Alert.alert("Login Error", error.message);
      }
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Title style={styles.title}>Welcome Back!</Title>
          <Text style={styles.subtitle}>
            Log in to continue discovering great SaaS ideas
          </Text>
        </View>

        <View style={styles.form}>
          <AuthInput
            icon="email-outline"
            placeholder="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setErrors({ ...errors, email: null });
            }}
            keyboardType="email-address"
            error={errors.email}
            disabled={isLoading}
          />

          <AuthInput
            icon="lock-outline"
            placeholder="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setErrors({ ...errors, password: null });
            }}
            secureTextEntry
            error={errors.password}
            disabled={isLoading}
          />

          <GradientButton
            onPress={handleLogin}
            label="Log In"
            loading={isLoading}
            disabled={isLoading}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <Button
            mode="text"
            onPress={() => navigation.navigate("SignUp")}
            textColor={colors.primary}
            style={styles.signUpButton}
            disabled={isLoading}
          >
            Sign Up
          </Button>
        </View>
      </ScrollView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={styles.snackbar}
        action={{
          label: "OK",
          onPress: () => setSnackbarVisible(false),
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: layout.spacing.lg,
  },
  header: {
    alignItems: "center",
    marginVertical: layout.spacing.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: layout.spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
  },
  form: {
    marginBottom: layout.spacing.xl,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: layout.spacing.lg,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: layout.spacing.xl,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.divider,
  },
  dividerText: {
    marginHorizontal: layout.spacing.md,
    color: colors.textSecondary,
  },
  socialButtons: {
    marginBottom: layout.spacing.xl,
  },
  socialButton: {
    marginBottom: layout.spacing.md,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: colors.textSecondary,
  },
  signUpButton: {
    marginLeft: -layout.spacing.sm,
  },
  snackbar: {
    backgroundColor: colors.text,
  },
});

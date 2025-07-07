import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Text, TextInput, Button, HelperText } from "react-native-paper";
import { colors } from "../constants/colors";
import { layout } from "../constants/layout";
import LottieAnimation from "../components/common/LottieAnimation";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        // TODO: Implement actual login API call
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call
        // Handle successful login
      } catch (error) {
        console.error("Login error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.animationContainer}>
          <LottieAnimation
            source={require("../assets/animations/Login.json")}
            autoPlay
            loop={isLoading}
            style={styles.animation}
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Sign in to continue building your SaaS empire
          </Text>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <TextInput
                label="Email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setErrors({ ...errors, email: null });
                }}
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
                error={!!errors.email}
                style={styles.input}
                outlineColor={colors.divider}
                activeOutlineColor={colors.primary}
                disabled={isLoading}
              />
              <HelperText type="error" visible={!!errors.email}>
                {errors.email}
              </HelperText>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                label="Password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setErrors({ ...errors, password: null });
                }}
                mode="outlined"
                secureTextEntry={!showPassword}
                error={!!errors.password}
                style={styles.input}
                outlineColor={colors.divider}
                activeOutlineColor={colors.primary}
                disabled={isLoading}
                right={
                  <TextInput.Icon
                    icon={showPassword ? "eye-off" : "eye"}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
              />
              <HelperText type="error" visible={!!errors.password}>
                {errors.password}
              </HelperText>
            </View>

            <Button
              mode="text"
              onPress={() => {}}
              style={styles.forgotPassword}
              disabled={isLoading}
            >
              Forgot Password?
            </Button>

            <Button
              mode="contained"
              onPress={handleLogin}
              style={styles.loginButton}
              contentStyle={styles.buttonContent}
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Login"}
            </Button>

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account?</Text>
              <Button
                mode="text"
                onPress={() => navigation.navigate("SignUp")}
                style={styles.signupButton}
                disabled={isLoading}
              >
                Sign Up
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  animationContainer: {
    height: 250,
    marginTop: layout.spacing.xl,
  },
  animation: {
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    padding: layout.spacing.xl,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
    marginBottom: layout.spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: layout.spacing.xl,
  },
  form: {
    gap: layout.spacing.md,
  },
  inputContainer: {
    gap: layout.spacing.xs,
  },
  input: {
    backgroundColor: colors.surface,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: -layout.spacing.sm,
  },
  loginButton: {
    marginTop: layout.spacing.lg,
    borderRadius: 100,
  },
  buttonContent: {
    height: 48,
  },
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: layout.spacing.lg,
  },
  signupText: {
    color: colors.textSecondary,
  },
  signupButton: {
    marginLeft: -layout.spacing.sm,
  },
});

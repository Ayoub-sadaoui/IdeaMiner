import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { Button, Text, Title, HelperText } from "react-native-paper";
import { AuthInput } from "../../components/auth/AuthInput";
import { GradientButton } from "../../components/common/GradientButton";
import { colors } from "../../constants/colors";
import { layout } from "../../constants/layout";
import { supabase } from "../../lib/supabase";

export const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!username) {
      newErrors.username = "Username is required";
    }

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

  const handleSignUp = async () => {
    if (validateForm()) {
      setIsLoading(true);
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            username: username,
          },
        },
      });

      if (error) {
        Alert.alert("Sign Up Error", error.message);
      } else {
        Alert.alert(
          "Sign Up Successful",
          "Please check your email for a confirmation link."
        );
        navigation.navigate("Login");
      }
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Title style={styles.title}>Create an Account</Title>
          <Text style={styles.subtitle}>
            Join us and start your journey to the next big idea
          </Text>
        </View>

        <View style={styles.form}>
          <AuthInput
            icon="account-outline"
            placeholder="Username"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              setErrors({ ...errors, username: null });
            }}
            error={errors.username}
            disabled={isLoading}
          />

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
            onPress={handleSignUp}
            label="Sign Up"
            loading={isLoading}
            disabled={isLoading}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Button
            mode="text"
            onPress={() => navigation.navigate("Login")}
            textColor={colors.primary}
            style={styles.loginButton}
            disabled={isLoading}
          >
            Log In
          </Button>
        </View>
      </ScrollView>
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
  animationContainer: {
    height: 200,
    marginTop: layout.spacing.lg,
  },
  animation: {
    width: "100%",
    height: "100%",
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
  loginButton: {
    marginLeft: -layout.spacing.sm,
  },
});

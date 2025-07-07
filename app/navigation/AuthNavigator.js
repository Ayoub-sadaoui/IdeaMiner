import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OnboardingScreen } from "../screens/OnboardingScreen";
import { LoginScreen } from "../screens/auth/LoginScreen";
import { SignUpScreen } from "../screens/auth/SignUpScreen";

const Stack = createNativeStackNavigator();

export const AuthNavigator = ({
  hasCompletedOnboarding,
  onOnboardingComplete,
}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        gestureEnabled: false,
      }}
      initialRouteName={hasCompletedOnboarding ? "Login" : "Onboarding"}
    >
      <Stack.Screen
        name="Onboarding"
        options={{
          gestureEnabled: false,
        }}
      >
        {(props) => (
          <OnboardingScreen {...props} onComplete={onOnboardingComplete} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          gestureEnabled: true,
        }}
      />
    </Stack.Navigator>
  );
};

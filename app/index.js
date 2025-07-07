import React, { useState } from "react";
import { View } from "react-native";
import { BottomNavigation } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DashboardScreen from "./screens/DashboardScreen";
import { IdeaDetailsScreen } from "./screens/IdeaDetailsScreen";
import { SavedIdeasScreen } from "./screens/SavedIdeasScreen";
import { UserAccountScreen } from "./screens/UserAccountScreen";
import { LoginScreen } from "./screens/auth/LoginScreen";
import { SignUpScreen } from "./screens/auth/SignUpScreen";
import { colors } from "./constants/colors";

const renderIcon = ({ route, focused, color }) => {
  let iconName;

  switch (route.key) {
    case "dashboard":
      iconName = focused ? "lightbulb" : "lightbulb-outline";
      break;
    case "saved":
      iconName = focused ? "bookmark" : "bookmark-outline";
      break;
    case "profile":
      iconName = focused ? "account" : "account-outline";
      break;
    default:
      iconName = "circle";
  }

  return <MaterialCommunityIcons name={iconName} size={24} color={color} />;
};

export default function MainNavigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("login");
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [index, setIndex] = useState(0);
  const [savedIdeas, setSavedIdeas] = useState([]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentScreen("dashboard");
  };

  const handleSignUp = () => {
    setIsAuthenticated(true);
    setCurrentScreen("dashboard");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen("login");
    setSavedIdeas([]); // Clear saved ideas on logout
  };

  const handleIdeaPress = (idea) => {
    setSelectedIdea(idea);
    setCurrentScreen("details");
  };

  const handleBackPress = () => {
    setCurrentScreen(routes[index].key);
    setSelectedIdea(null);
  };

  const handleSaveIdea = (idea) => {
    setSavedIdeas((prev) => {
      const isAlreadySaved = prev.some((savedIdea) => savedIdea.id === idea.id);
      if (isAlreadySaved) {
        return prev.filter((savedIdea) => savedIdea.id !== idea.id);
      } else {
        return [...prev, idea];
      }
    });
  };

  const routes = [
    {
      key: "dashboard",
      title: "Discover",
      focusedIcon: "lightbulb",
      unfocusedIcon: "lightbulb-outline",
    },
    {
      key: "saved",
      title: "Saved",
      focusedIcon: "bookmark",
      unfocusedIcon: "bookmark-outline",
    },
    {
      key: "profile",
      title: "Profile",
      focusedIcon: "account",
      unfocusedIcon: "account-outline",
    },
  ];

  const renderScene = BottomNavigation.SceneMap({
    dashboard: () => (
      <DashboardScreen
        onIdeaPress={handleIdeaPress}
        onSaveIdea={handleSaveIdea}
        savedIdeas={savedIdeas}
      />
    ),
    saved: () => (
      <SavedIdeasScreen
        onIdeaPress={handleIdeaPress}
        onSaveIdea={handleSaveIdea}
        savedIdeas={savedIdeas}
      />
    ),
    profile: () => <UserAccountScreen onLogout={handleLogout} />,
  });

  if (!isAuthenticated) {
    if (currentScreen === "signup") {
      return (
        <SignUpScreen
          onSignUp={handleSignUp}
          onLogin={() => setCurrentScreen("login")}
        />
      );
    }
    return (
      <LoginScreen
        onLogin={handleLogin}
        onSignUp={() => setCurrentScreen("signup")}
        onForgotPassword={() => console.log("Forgot password")}
      />
    );
  }

  if (currentScreen === "details" && selectedIdea) {
    return (
      <View style={{ flex: 1 }}>
        <IdeaDetailsScreen
          idea={selectedIdea}
          onBack={handleBackPress}
          onSaveIdea={handleSaveIdea}
          isSaved={savedIdeas.some((idea) => idea.id === selectedIdea.id)}
        />
      </View>
    );
  }

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      renderIcon={renderIcon}
      activeColor={colors.primary}
      inactiveColor={colors.textSecondary}
      barStyle={{
        backgroundColor: colors.surface,
        borderTopWidth: 1,
        borderTopColor: colors.divider,
        height: 64,
        justifyContent: "center",
      }}
      labeled={true}
      shifting={false}
    />
  );
}

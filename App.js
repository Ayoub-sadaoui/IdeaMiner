import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { RootNavigator } from "./app/navigation/RootNavigator";
import { SavedIdeasProvider } from "./app/context/SavedIdeasContext";
import { AuthProvider } from "./app/context/AuthContext";
import { theme } from "./app/constants/theme";

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <SavedIdeasProvider>
          <RootNavigator />
        </SavedIdeasProvider>
      </PaperProvider>
    </AuthProvider>
  );
}

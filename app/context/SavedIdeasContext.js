import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SavedIdeasContext = createContext();

export function SavedIdeasProvider({ children }) {
  const [savedIdeas, setSavedIdeas] = useState([]);

  useEffect(() => {
    loadSavedIdeas();
  }, []);

  const loadSavedIdeas = async () => {
    try {
      const storedIdeas = await AsyncStorage.getItem("savedIdeas");
      if (storedIdeas) {
        setSavedIdeas(JSON.parse(storedIdeas));
      }
    } catch (error) {
      console.error("Error loading saved ideas:", error);
    }
  };

  const saveIdea = async (idea) => {
    try {
      // Check if idea already exists using id
      const ideaExists = savedIdeas.some(
        (savedIdea) => savedIdea.id === idea.id
      );

      if (ideaExists) {
        // If idea exists, remove it (unsave)
        const updatedIdeas = savedIdeas.filter(
          (savedIdea) => savedIdea.id !== idea.id
        );
        await AsyncStorage.setItem("savedIdeas", JSON.stringify(updatedIdeas));
        setSavedIdeas(updatedIdeas);
        return false; // Return false to indicate idea was unsaved
      } else {
        // If idea doesn't exist, add it
        const updatedIdeas = [
          ...savedIdeas,
          { ...idea, savedAt: new Date().toISOString() },
        ];
        await AsyncStorage.setItem("savedIdeas", JSON.stringify(updatedIdeas));
        setSavedIdeas(updatedIdeas);
        return true; // Return true to indicate idea was saved
      }
    } catch (error) {
      console.error("Error saving idea:", error);
      return false;
    }
  };

  const unsaveIdea = async (idea) => {
    try {
      const updatedIdeas = savedIdeas.filter(
        (savedIdea) => savedIdea.id !== idea.id
      );
      await AsyncStorage.setItem("savedIdeas", JSON.stringify(updatedIdeas));
      setSavedIdeas(updatedIdeas);
      return true;
    } catch (error) {
      console.error("Error removing saved idea:", error);
      return false;
    }
  };

  const isIdeaSaved = (idea) => {
    return savedIdeas.some((savedIdea) => savedIdea.id === idea.id);
  };

  return (
    <SavedIdeasContext.Provider
      value={{ savedIdeas, saveIdea, unsaveIdea, isIdeaSaved }}
    >
      {children}
    </SavedIdeasContext.Provider>
  );
}

export function useSavedIdeas() {
  const context = useContext(SavedIdeasContext);
  if (!context) {
    throw new Error("useSavedIdeas must be used within a SavedIdeasProvider");
  }
  return context;
}

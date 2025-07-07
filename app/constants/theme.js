import { DefaultTheme } from "react-native-paper";
import { colors } from "./colors";

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    accent: colors.accent,
    background: colors.background,
    surface: colors.surface,
    error: colors.error,
    text: colors.text,
    onSurface: colors.text,
    disabled: colors.textSecondary,
    placeholder: colors.textSecondary,
    backdrop: colors.backdrop,
    notification: colors.primary,
  },
  roundness: 8,
  animation: {
    scale: 1.0,
  },
};

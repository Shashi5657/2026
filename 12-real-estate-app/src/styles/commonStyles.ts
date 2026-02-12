import { COLORS } from "@/themes/colors";
import { RADIUS } from "@/themes/radius";
import { SPACING } from "@/themes/spacing";
import { TYPOGRAPHY } from "@/themes/typography";
import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    paddingHorizontal: SPACING.lg,
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    // ...SHADOWS.card,
  },

  section: {
    marginTop: SPACING.section,
  },

  // Typography

  h1: {
    fontSize: TYPOGRAPHY.h1,
    color: COLORS.textPrimary,
    fontWeight: "700",
  },

  h2: {
    fontSize: TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
    fontWeight: "700",
  },

  h3: {
    fontSize: TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
    fontWeight: "600",
  },

  title: {
    fontSize: TYPOGRAPHY.title,
    color: COLORS.textPrimary,
    fontWeight: "600",
  },

  body: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },

  caption: {
    fontSize: TYPOGRAPHY.caption,
    color: COLORS.textMuted,
  },

  // Buttons

  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    // ...SHADOWS.button,
  },

  primaryButtonText: {
    color: COLORS.textPrimary,
    fontWeight: "600",
    fontSize: TYPOGRAPHY.body,
  },

  secondaryButton: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  secondaryButtonText: {
    color: COLORS.textPrimary,
    fontWeight: "600",
  },

  outlineButton: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    paddingVertical: 14,
    alignItems: "center",
  },

  // Inputs

  input: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  // Movie Posters

  posterSmall: {
    width: 120,
    height: 180,
    borderRadius: RADIUS.md,
  },

  posterMedium: {
    width: 150,
    height: 225,
    borderRadius: RADIUS.md,
  },

  posterLarge: {
    width: 180,
    height: 270,
    borderRadius: RADIUS.lg,
  },

  // Row Layouts

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

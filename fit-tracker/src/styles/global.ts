import { StyleSheet } from "react-native";

export const colors = {
  background: "#0F172A", // Slate dark
  header: "#111827", // Deep gray
  surface: "#1E293B", // Card background
  primary: "#38BDF8", // Sky blue
  secondary: "#22C55E", // Fitness green
  accent: "#F97316", // Orange accent
  text: "#F8FAFC", // Soft white
  textSecondary: "#94A3B8", // Slate muted
  border: "#334155",
  danger: "#EF4444",
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textSecondary,
    marginTop: 30,
    marginBottom: 16,
  },
  empty: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

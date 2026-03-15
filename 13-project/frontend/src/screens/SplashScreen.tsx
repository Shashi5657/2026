import { Image, Text, View, StyleSheet } from "react-native";
import { useEffect } from "react";
import { router } from "expo-router";
import { colors, spacing, typography } from "@/theme";

const SplashScreen = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/onboarding");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/skillforge_logo.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>SkillForge</Text>

      <Text style={styles.subtitle}>Learn. Build. Grow.</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },

  logo: {
    width: 160,
    height: 160,
    resizeMode: "contain",
  },

  title: {
    ...typography.h1,
    marginTop: spacing.md,
    color: colors.primary,
  },

  subtitle: {
    fontSize: typography.body.fontSize,
    marginTop: spacing.sm,
    color: colors.primary,
  },
});

import PrimaryButton from "@/components/PrimaryButton";
import { colors, commonStyles, radius, spacing, typography } from "@/theme";
import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WelcomeScreen = () => {
  return (
    <SafeAreaView
      style={[commonStyles.flex1, { backgroundColor: colors.background }]}
    >
      <View
        style={[
          commonStyles.flex1,
          {
            paddingHorizontal: spacing.lg,
          },
        ]}
      >
        <View>
          <Image
            source={require("../assets/images/skillforge_logo.png")}
            style={styles.logo}
          />
          <Text
            style={[
              typography.h1,
              {
                color: colors.textPrimary,
                marginTop: spacing.md,
                marginHorizontal: "auto",
              },
            ]}
          >
            SkillForge
          </Text>

          <Text
            style={[
              typography.body,
              {
                color: colors.textSecondary,
                textAlign: "center",
                marginTop: spacing.sm,
              },
            ]}
          >
            Learn. Build. Grow.
          </Text>
        </View>

        {/* Hero Section */}

        <View
          style={{
            marginTop: spacing.xxl,
            gap: spacing.md,
          }}
        >
          <FeatureCard
            emoji="📚"
            title="Learn New Skills"
            description="Track your courses and improve every day."
          />

          <FeatureCard
            emoji="🎯"
            title="Achieve Goals"
            description="Manage tasks and complete milestones."
          />

          <FeatureCard
            emoji="🔥"
            title="Build Streaks"
            description="Stay consistent and maintain momentum."
          />
        </View>

        {/* Bottom Section */}

        <View
          style={{
            marginTop: "auto",
            paddingBottom: spacing.xl,
            gap: spacing.md,
          }}
        >
          <PrimaryButton
            title="Create Account"
            variant="primary"
            onPress={() => router.push("/signup")}
          />

          <PrimaryButton
            title="Login"
            variant="secondary"
            onPress={() => router.push("/login")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

type FeatureCardProps = {
  emoji: string;
  title: string;
  description: string;
};

const FeatureCard = ({ emoji, title, description }: FeatureCardProps) => {
  return (
    <View style={styles.featureCard}>
      <Text style={styles.emoji}>{emoji}</Text>

      <View style={{ flex: 1 }}>
        <Text
          style={[
            typography.bodyLarge,
            {
              color: colors.textPrimary,
              fontWeight: "600",
            },
          ]}
        >
          {title}
        </Text>

        <Text
          style={[
            typography.bodySmall,
            {
              color: colors.textSecondary,
              marginTop: 4,
            },
          ]}
        >
          {description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginHorizontal: "auto",
  },

  featureCard: {
    flexDirection: "row",
    alignItems: "center",

    gap: spacing.md,

    padding: spacing.md,

    backgroundColor: colors.surface,

    borderRadius: radius.lg,

    borderWidth: 1,

    borderColor: colors.border,
  },

  emoji: {
    fontSize: 32,
  },
});

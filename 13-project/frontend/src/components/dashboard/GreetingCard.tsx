import { colors, radius, spacing, typography } from "@/theme";
import { Text, View } from "react-native";

export default function GreetingCard({ name }: { name?: string }) {
  return (
    <View
      style={{
        backgroundColor: colors.primary,
        padding: spacing.lg,
        borderRadius: radius.lg,
      }}
    >
      <Text style={{ ...typography.h2, color: colors.white }}>
        Hello ${name}
      </Text>
      <Text
        style={{
          ...typography.body,
          color: colors.white,
          marginTop: spacing.sm,
        }}
      >
        Ready to learn something today?
      </Text>
    </View>
  );
}

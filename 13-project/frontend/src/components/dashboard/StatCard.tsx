import { colors, radius, spacing, typography } from "@/theme";
import { Text, View } from "react-native";

export default function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <View
      style={{
        backgroundColor: colors.surface,
        flex: 1,
        padding: spacing.md,
        borderRadius: radius.md,
      }}
    >
      <Text style={{ ...typography.bodySmall, color: colors.textSecondary }}>
        {title}
      </Text>
      <Text
        style={{
          ...typography.h3,
          color: colors.textPrimary,
          marginTop: spacing.sm,
        }}
      >
        {value}
      </Text>
    </View>
  );
}

import { colors, radius, spacing } from "@/theme";
import { Text, View } from "react-native";

type Props = {
  total: number;
  completed: number;
  pending: number;
};

export default function TaskStats({ total, completed, pending }: Props) {
  const stats = [
    {
      label: "Total",
      value: total,
      emoji: "📋",
    },
    {
      label: "Pending",
      value: pending,
      emoji: "⏳",
    },
    {
      label: "Completed",
      value: completed,
      emoji: "✅",
    },
  ];

  return (
    <View
      style={{
        flexDirection: "row",
        gap: spacing.md,
        marginBottom: spacing.lg,
      }}
    >
      {stats.map((stat) => (
        <View
          key={stat.label}
          style={{
            flex: 1,
            backgroundColor: colors.surface,
            padding: spacing.md,
            borderRadius: radius.md,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 24,
            }}
          >
            {stat.emoji}
          </Text>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "700",
            }}
          >
            {stat.value}
          </Text>

          <Text>{stat.label}</Text>
        </View>
      ))}
    </View>
  );
}

import { colors, commonStyles, radius, spacing, typography } from "@/theme";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  title: string;
  emoji: string;
  onPress?: () => void;
};

export default function QuickActionCards({ title, emoji, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        commonStyles.flex1,
        {
          alignItems: "center",
          padding: spacing.lg,
          backgroundColor: colors.surface,
          borderRadius: radius.md,
        },
      ]}
    >
      <Text style={{ fontSize: typography.h1.fontSize }}>{emoji}</Text>
      <Text style={{ marginTop: spacing.sm }}>{title}</Text>
    </TouchableOpacity>
  );
}

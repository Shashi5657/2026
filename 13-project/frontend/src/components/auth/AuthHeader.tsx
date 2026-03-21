import { View, Text } from "react-native";

import { typography } from "@/theme/typography";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

type Props = {
  title: string;
  subtitle: string;
};

export default function AuthHeader({ title, subtitle }: Props) {
  return (
    <View
      style={{
        marginBottom: spacing.xxl,
      }}
    >
      <Text
        style={{
          ...typography.h1,
          color: colors.textPrimary,
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          ...typography.body,
          color: colors.textSecondary,
          marginTop: spacing.sm,
        }}
      >
        {subtitle}
      </Text>
    </View>
  );
}

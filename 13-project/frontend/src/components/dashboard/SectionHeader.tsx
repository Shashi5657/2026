import { colors, typography } from "@/theme";
import { Text, View } from "react-native";

export default function SectionHeader({ title }: { title: string }) {
  return (
    <Text style={{ ...typography.h3, color: colors.textPrimary }}>{title}</Text>
  );
}

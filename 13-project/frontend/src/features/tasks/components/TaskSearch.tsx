import { colors, radius, spacing } from "@/theme";
import { TextInput } from "react-native";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function TaskSearch({ value, onChangeText }: Props) {
  return (
    <TextInput
      placeholder="search tasks..."
      value={value}
      onChangeText={onChangeText}
      style={{
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.md,
        padding: spacing.md,
        marginBottom: spacing.md,
      }}
    />
  );
}

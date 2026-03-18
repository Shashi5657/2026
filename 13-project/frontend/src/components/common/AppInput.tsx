import { colors, spacing } from "@/theme";
import { Text, TextInput, View } from "react-native";

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  error: string | undefined;
};

export const AppInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  error,
}: Props) => {
  return (
    <View style={{ marginBottom: spacing.lg }}>
      <Text style={{ marginBottom: spacing.sm, fontWeight: "600" }}>
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={{
          borderWidth: 1,
          borderColor: error ? colors.error : colors.border,
          borderRadius: spacing.md,
          padding: spacing.md,
        }}
      />

      {error && (
        <Text style={{ color: colors.error, marginTop: spacing.xs }}>
          {error}
        </Text>
      )}
    </View>
  );
};

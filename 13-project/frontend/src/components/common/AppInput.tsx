import React, { forwardRef, useState } from "react";

import {
  View,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/theme/colors";
import { radius } from "@/theme/radius";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import { commonStyles } from "@/theme";

interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
}

const AppInput = forwardRef<TextInput, AppInputProps>(
  ({ label, error, leftIcon, secureTextEntry, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const isPasswordField = secureTextEntry;

    return (
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}

        <View style={[styles.inputContainer, error && styles.errorBorder]}>
          {leftIcon && (
            <Ionicons name={leftIcon} size={20} color={colors.gray500} />
          )}

          <TextInput
            ref={ref}
            style={styles.input}
            placeholderTextColor={colors.gray400}
            secureTextEntry={isPasswordField && !isPasswordVisible}
            {...props}
          />

          {isPasswordField && (
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Ionicons
                name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                size={22}
                color={colors.gray500}
              />
            </TouchableOpacity>
          )}
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  },
);

export default AppInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },

  label: {
    marginBottom: spacing.sm,
    color: colors.textPrimary,
    fontWeight: "600",
    ...typography.body,
  },

  inputContainer: {
    ...commonStyles.row,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    minHeight: 56,
    backgroundColor: colors.white,
  },

  input: {
    flex: 1,
    marginLeft: spacing.sm,
    color: colors.textPrimary,
    ...typography.body,
  },

  errorBorder: {
    borderColor: colors.error,
  },

  errorText: {
    color: colors.error,
    marginTop: spacing.xs,
    fontSize: 12,
  },
});

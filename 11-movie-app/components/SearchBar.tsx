import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../theme/colors";
import { SPACING } from "../theme/spacing";
import { RADIUS } from "../theme/radius";
import { TYPOGRAPHY } from "../theme/typography";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  autoFocus?: boolean;
}

const SearchBar = ({
  placeholder = "Search movies, shows...",
  value,
  onChangeText,
  onPress,
  autoFocus = false,
}: SearchBarProps) => {
  if (!onChangeText && onPress) {
    return (
      <Pressable onPress={onPress} style={styles.container}>
        <Ionicons name="search" size={18} color={COLORS.textSecondary} />
        <Text style={styles.placeholderText}>{placeholder}</Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={18} color={COLORS.textSecondary} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={COLORS.textMuted}
        value={value}
        onChangeText={onChangeText}
        autoFocus={autoFocus}
        style={styles.input}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {value ? (
        <TouchableOpacity
          onPress={() => onChangeText?.("")}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name="close-circle"
            size={18}
            color={COLORS.textSecondary}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.round,
    paddingVertical: SPACING.sm + 2,
    paddingHorizontal: SPACING.lg,
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.sm,
  },
  input: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: TYPOGRAPHY.body,
    padding: 0,
  },
  placeholderText: {
    flex: 1,
    color: COLORS.textMuted,
    fontSize: TYPOGRAPHY.body,
  },
});

export default SearchBar;

import { View, Text, Pressable } from "react-native";

import { Task } from "../types/task.types";
import { colors, radius, spacing } from "@/theme";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  task: Task;

  onToggle: () => void;

  onDelete: () => void;
  onEdit: () => void;
};

export default function TaskItem({ task, onToggle, onDelete, onEdit }: Props) {
  return (
    <View
      style={{
        padding: spacing.md,
        borderRadius: radius.md,
        marginBottom: spacing.md,
        borderBottomWidth: 1,
      }}
    >
      <Pressable onPress={onToggle}>
        <Text
          style={{
            fontSize: 18,
            textDecorationLine: task.completed ? "line-through" : "none",

            color: task.completed ? colors.gray400 : colors.textPrimary,
          }}
        >
          {task.completed ? "☑" : "☐"} {task.title}
        </Text>
      </Pressable>

      {!!task.description && (
        <Text
          style={{
            marginTop: 6,

            color: colors.textSecondary,
          }}
        >
          {task.description}
        </Text>
      )}

      {task.dueDate && (
        <Text
          style={{
            marginTop: 6,
            color: "#64748B",
          }}
        >
          📅 {new Date(task.dueDate).toDateString()}
        </Text>
      )}

      {task?.category && (
        <Text
          style={{
            marginTop: 6,
          }}
        >
          🏷 {task.category}
        </Text>
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: 16,
          marginTop: 12,
        }}
      >
        <Pressable onPress={onEdit}>
          <Ionicons name="create-outline" size={22} color={colors.primary} />
        </Pressable>
        <Pressable onPress={onDelete}>
          <Ionicons name="trash-outline" size={22} color={colors.error} />
        </Pressable>
      </View>
    </View>
  );
}

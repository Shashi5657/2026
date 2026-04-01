import { View, Text, Pressable } from "react-native";

import { Task } from "../types/task.types";

type Props = {
  task: Task;

  onToggle: () => void;

  onDelete: () => void;
};

export default function TaskItem({ task, onToggle, onDelete }: Props) {
  return (
    <View
      style={{
        padding: 16,

        borderBottomWidth: 1,
      }}
    >
      <Pressable onPress={onToggle}>
        <Text
          style={{
            fontSize: 18,
          }}
        >
          {task.completed ? "☑" : "☐"} {task.title}
        </Text>
      </Pressable>

      {task.description && <Text>{task.description}</Text>}

      <Pressable onPress={onDelete}>
        <Text
          style={{
            color: "red",
            marginTop: 8,
          }}
        >
          Delete
        </Text>
      </Pressable>
    </View>
  );
}

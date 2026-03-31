import { Pressable, Text, View } from "react-native";
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
      <Pressable>
        <Text>
          {task.completed ? "☑" : "☐"} {task.title}
        </Text>
      </Pressable>
      <Pressable onPress={onDelete}>
        <Text>Delete</Text>
      </Pressable>
    </View>
  );
}

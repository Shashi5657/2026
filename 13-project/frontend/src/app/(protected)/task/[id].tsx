import ScreenContainer from "@/components/common/ScreenContainer";
import { useTask } from "@/features/tasks/hooks/useTask";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function TaskDetailsScreen() {
  const { id } = useLocalSearchParams();

  const { data } = useTask(id as string);

  const task = data?.data;

  if (!task) return null;

  return (
    <ScreenContainer>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "700",
        }}
      >
        {task.title}
      </Text>

      <Text
        style={{
          marginTop: 16,
        }}
      >
        {task.description}
      </Text>
      <Text
        style={{
          marginTop: 16,
        }}
      >
        🏷 {task.category}
      </Text>
      <Text
        style={{
          marginTop: 8,
        }}
      >
        📅{" "}
        {task.dueDate ? new Date(task.dueDate).toDateString() : "No Due Date"}
      </Text>
      <Text
        style={{
          marginTop: 8,
        }}
      >
        🔥 {task.priority}
      </Text>
    </ScreenContainer>
  );
}

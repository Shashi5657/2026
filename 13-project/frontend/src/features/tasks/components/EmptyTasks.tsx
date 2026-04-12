import PrimaryButton from "@/components/PrimaryButton";
import { View, Text } from "react-native";

type Props = {
  onCreateTask?: () => void;
};

export default function EmptyTasks({ onCreateTask }: Props) {
  return (
    <View
      style={{
        alignItems: "center",
        marginTop: 60,
      }}
    >
      <Text
        style={{
          fontSize: 56,
        }}
      >
        📋
      </Text>

      <Text
        style={{
          fontSize: 22,
          fontWeight: "700",
          marginTop: 12,
        }}
      >
        No Tasks Found
      </Text>

      <Text
        style={{
          textAlign: "center",
          marginTop: 8,
          color: "#64748B",
        }}
      >
        Create your first task or adjust your filters.
      </Text>

      <View
        style={{
          width: 180,
          marginTop: 20,
        }}
      >
        <PrimaryButton title="Create Task" onPress={() => onCreateTask?.()} />
      </View>
    </View>
  );
}

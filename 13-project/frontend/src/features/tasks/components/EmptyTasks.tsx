import { Text, View } from "react-native";

export default function EmptyTasks() {
  return (
    <View
      style={{
        padding: 30,
        alignItems: "center",
      }}
    >
      <Text>No tasks yet🚀</Text>
      <Text>Create your first task</Text>
    </View>
  );
}

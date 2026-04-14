import { View, Text } from "react-native";

type Props = {
  completed: number;
  total: number;
};

export default function ProgressCard({ completed, total }: Props) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <View
      style={{
        backgroundColor: "#FFF",
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
      }}
    >
      <Text
        style={{
          fontWeight: "700",
        }}
      >
        Progress
      </Text>

      <Text
        style={{
          marginTop: 8,
        }}
      >
        {completed}/{total} lessons completed
      </Text>

      <Text>{percentage}%</Text>
    </View>
  );
}

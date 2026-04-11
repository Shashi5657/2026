import { View, Text } from "react-native";

type Props = {
  title: string;

  value: number;

  emoji: string;
};

export default function TaskAnalyticsCard({ title, value, emoji }: Props) {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        borderRadius: 12,
        backgroundColor: "#FFF",
      }}
    >
      <Text
        style={{
          fontSize: 24,
        }}
      >
        {emoji}
      </Text>

      <Text
        style={{
          fontSize: 22,
          fontWeight: "700",
        }}
      >
        {value}
      </Text>

      <Text>{title}</Text>
    </View>
  );
}

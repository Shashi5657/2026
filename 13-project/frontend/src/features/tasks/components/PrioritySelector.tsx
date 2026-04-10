import { Pressable, Text, View } from "react-native";

type Props = {
  value?: string;
  onChange: (value: string) => void;
};
const priorities = [
  {
    label: "LOW",
    emoji: "🟢",
  },

  {
    label: "MEDIUM",
    emoji: "🟡",
  },

  {
    label: "HIGH",
    emoji: "🔴",
  },
];
export default function PrioritySelector({ value, onChange }: Props) {
  return (
    <View>
      {priorities.map((priority) => (
        <Pressable
          key={priority.label}
          onPress={() => onChange(priority.label)}
          style={{
            paddingHorizontal: 12,

            paddingVertical: 8,

            borderRadius: 20,

            backgroundColor: value === priority.label ? "#2563EB" : "#E2E8F0",
          }}
        >
          <Text
            style={{
              color: value === priority.label ? "#FFF" : "#000",
            }}
          >
            {priority.emoji} {priority.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

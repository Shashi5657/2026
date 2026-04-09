import { Pressable, Text, View } from "react-native";
import { TASK_CATEGORIES } from "../types/task.types";

type Props = {
  value?: string;

  onChange: (value: string) => void;
};

export default function CategorySelector({ value, onChange }: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 16,
      }}
    >
      {TASK_CATEGORIES.map((category) => (
        <Pressable
          key={category}
          onPress={() => onChange(category)}
          style={{
            paddingHorizontal: 12,

            paddingVertical: 8,

            borderRadius: 20,

            backgroundColor: value === category ? "#2563EB" : "#E2E8F0",
          }}
        >
          <Text
            style={{
              color: value === category ? "#FFF" : "#000",
            }}
          >
            {category}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

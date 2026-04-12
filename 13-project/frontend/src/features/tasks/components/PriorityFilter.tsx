import { View, Pressable, Text, ScrollView } from "react-native";

type Props = {
  value: string;

  onChange: (value: string) => void;
};

const priorities = ["ALL", "HIGH", "MEDIUM", "LOW"];

export default function PriorityFilter({ value, onChange }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View
        style={{
          flexDirection: "row",
          gap: 8,
        }}
      >
        {priorities.map((priority) => (
          <Pressable
            key={priority}
            onPress={() => onChange(priority)}
            style={{
              paddingHorizontal: 12,

              paddingVertical: 8,

              borderRadius: 20,

              backgroundColor: value === priority ? "#2563EB" : "#E2E8F0",
            }}
          >
            <Text
              style={{
                color: value === priority ? "#FFF" : "#000",
              }}
            >
              {priority}
            </Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

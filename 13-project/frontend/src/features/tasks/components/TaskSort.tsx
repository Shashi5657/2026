import { View, Text, Pressable } from "react-native";

type Props = {
  value: string;
  onChange: (value: any) => void;
};

const options = ["newest", "oldest", "dueDate", "completed"];

export default function TaskSort({ value, onChange }: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 8,
        marginBottom: 16,
      }}
    >
      {options.map((option) => (
        <Pressable
          key={option}
          onPress={() => onChange(option)}
          style={{
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 20,

            backgroundColor: value === option ? "#2563EB" : "#E2E8F0",
          }}
        >
          <Text
            style={{
              color: value === option ? "#FFF" : "#000",
            }}
          >
            {option}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

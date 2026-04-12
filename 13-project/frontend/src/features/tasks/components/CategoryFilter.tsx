import { View, Pressable, Text, ScrollView } from "react-native";

type Props = {
  value: string;

  onChange: (value: string) => void;
};

const categories = [
  "All",
  "Development",
  "Learning",
  "Work",
  "Fitness",
  "Personal",
];

export default function CategoryFilter({ value, onChange }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View
        style={{
          flexDirection: "row",
          gap: 8,
        }}
      >
        {categories.map((category) => (
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
    </ScrollView>
  );
}
